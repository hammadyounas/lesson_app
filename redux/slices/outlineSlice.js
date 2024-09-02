import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

// Async Thunks

export const fetchOutlines = createAsyncThunk(
  'outlines/fetchOutlines',
  async (courseId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('course_outlines')
        .select('*')
        .eq('course_id', courseId);
        
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadOutline = createAsyncThunk(
  'outlines/uploadOutline',
  async ({ file, courseId }, { rejectWithValue }) => {
    try {
      // Upload the file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('outlines')
        .upload(`${courseId}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;
      console.log(uploadData)

      const { publicURL, error: urlError } = supabase.storage
        .from('outlines')
        .getPublicUrl(uploadData.path);

      if (urlError) throw urlError;
      console.log(publicURL);
      // Insert the outline record into the database
      const { error: insertError } = await supabase
        .from('course_outlines')
        .insert([{ course_id: courseId, url: publicURL }]);

      if (insertError) throw insertError;

      return { url: publicURL, course_id: courseId }; // Return data to be added to state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice

const outlinesSlice = createSlice({
  name: 'outlines',
  initialState: {
    outlines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutlines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutlines.fulfilled, (state, action) => {
        state.loading = false;
        state.outlines = action.payload;
      })
      .addCase(fetchOutlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadOutline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadOutline.fulfilled, (state, action) => {
        state.loading = false;
        state.outlines.push(action.payload);
      })
      .addCase(uploadOutline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default outlinesSlice.reducer;

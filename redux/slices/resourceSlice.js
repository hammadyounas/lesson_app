// slices/resourcesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    resources: [],
    loading: false,
    error: null,
  },
  reducers: {
    setResources: (state, action) => {
      state.resources = action.payload;
    },
    addResource: (state, action) => {
      state.resources.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setResources, addResource, setLoading, setError } = resourcesSlice.actions;

export const fetchResources = (courseId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data, error } = await supabase
      .from('course_resources')
      .select('*')
      .eq('course_id', courseId)

    if (error) throw error;
    dispatch(setResources(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const uploadResource = (file, courseId, userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data, error: uploadError } = await supabase.storage
      .from('resources')
      .upload(`${courseId}/${file.name}`, file);

    if (uploadError) throw uploadError;

    const { publicURL, error: urlError } = supabase.storage
      .from('resources')
      .getPublicUrl(data.path);

    if (urlError) throw urlError;
    console.log(publicURL)
    const { error: insertError } = await supabase
      .from('course_resources')
      .insert([{ url: publicURL, course_id: courseId, }]);

    if (insertError) throw insertError;

    dispatch(addResource({ url: publicURL, course_id: courseId }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default resourcesSlice.reducer;

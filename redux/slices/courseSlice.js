import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

// Thunks

// Fetch all courses for a user
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (userId) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
});

// Add a new course
export const addCourse = createAsyncThunk('courses/addCourse', async (course) => {
  const { data, error } = await supabase
    .from('courses')
    .insert([course])
    .select();

  if (error) throw error;
  return data[0];
});

// Update an existing course
export const updateCourse = createAsyncThunk('courses/updateCourse', async ({ id, name, code, category, description  }) => {
  const { data, error } = await supabase
    .from('courses')
    .update({ name, code, category, description })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
});

// Delete a course and all related content
export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  try {
    const { data: outlineData, error: outlineError } = await supabase
      .from('course_outlines')
      .select('url')
      .eq('course_id', courseId);

    if (outlineError) throw outlineError;

    const { data: resourceData, error: resourceError } = await supabase
      .from('course_resources')
      .select('url')
      .eq('course_id', courseId);

    if (resourceError) throw resourceError;

    const deleteFiles = async (bucketName, files) => {
      if (files.length > 0) {
        const { error } = await supabase.storage
          .from(bucketName)
          .remove(files.map((file) => file.url));

        if (error) throw error;
      }
    };

    // Delete files from outlines bucket
    await deleteFiles('outlines', outlineData || []);

    // Delete files from resources bucket
    await deleteFiles('resources', resourceData || []);

    const { error: deleteOutlineError } = await supabase
      .from('course_outlines')
      .delete()
      .eq('course_id', courseId);

    if (deleteOutlineError) throw deleteOutlineError;

    const { error: deleteResourceError } = await supabase
      .from('course_resources')
      .delete()
      .eq('course_id', courseId);

    if (deleteResourceError) throw deleteResourceError;

    const { error: deleteCourseError } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (deleteCourseError) throw deleteCourseError;

    return courseId; 
  } catch (error) {
    throw error;
  }
});

// Slice

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Course
      .addCase(addCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;

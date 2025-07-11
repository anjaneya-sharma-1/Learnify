import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchLectures = createAsyncThunk('lectures/fetchLectures', async () => {
  const response = await axios.get('/api/lectures');
  return response.data;
});

export const fetchLectureById = createAsyncThunk('lectures/fetchLectureById', async (lectureId) => {
  const response = await axios.get(`/api/lecture/${lectureId}`);
  return response.data;
});

const initialState = {
    lectures: [],
    currentLecture: null,
    status: 'idle',
    currentLectureStatus: 'idle',
    error: null,
    // Keep existing structure for backward compatibility
    freeLectures: [],
    paidLectures: [],
};

const lecturesData = createSlice({
    name: 'lecturesData',
    initialState: initialState,
    reducers: {
        updateLecturesData: (state, action) => {
            state.freeLectures = action.payload.freeLectures;
            state.paidLectures = action.payload.paidLectures;
        },
        clearCurrentLecture: (state) => {
            state.currentLecture = null;
            state.currentLectureStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLectures.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLectures.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lectures = action.payload;
            })
            .addCase(fetchLectures.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchLectureById.pending, (state) => {
                state.currentLectureStatus = 'loading';
            })
            .addCase(fetchLectureById.fulfilled, (state, action) => {
                state.currentLectureStatus = 'succeeded';
                state.currentLecture = action.payload;
            })
            .addCase(fetchLectureById.rejected, (state, action) => {
                state.currentLectureStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

export const getLecturesData = createSelector(
    (state) => (state.lecturesData),
    (state) => state
);

export const { updateLecturesData, clearCurrentLecture } = lecturesData.actions;

export default lecturesData.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  nextLink: '',
  prevLink: '',
  locations: [],
  status: "idle"
}

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (link) => {
  const response = await axios.get(link)
  return response.data
})


export const filterLocations = createAsyncThunk('character/filterLocations', async (link) => {
  const response = await axios.get(link)
  return response.data
})

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setNextLink: (state, action) => {
      state.nextLink = action.payload;
    },
    setPrevLink: (state, action) => {
      state.prevLink = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.locations = state.locations.concat(action.payload.results)
        if (action.payload.info.next != null) state.nextLink = action.payload.info.next
        if (action.payload.info.prev != null) state.prevLink = action.payload.info.prev
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(filterLocations.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(filterLocations.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.locations = []
        state.locations = state.locations.concat(action.payload.results)
        if (action.payload.info.next != null) state.nextLink = action.payload.info.next
        if (action.payload.info.prev != null) state.prevLink = action.payload.info.prev
      })
      .addCase(filterLocations.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})


export const { setNextLink, setPrevLink } = locationSlice.actions

export default locationSlice.reducer
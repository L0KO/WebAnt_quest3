import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  nextLink: '',
  prevLink: '',
  episodes: [],
  status: "idle"
}

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async (link) => {
  const response = await axios.get(link)
  return response.data

})

export const filterEpisodes = createAsyncThunk('episodes/filterEpisodes', async (link) => {
  const response = await axios.get(link)
  return response.data

})

export const episodeSlice = createSlice({
  name: 'episode',
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
      .addCase(fetchEpisodes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.episodes = state.episodes.concat(action.payload.results)
        if (action.payload.info.next != null) state.nextLink = action.payload.info.next
        if (action.payload.info.prev != null) state.prevLink = action.payload.info.prev
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(filterEpisodes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(filterEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.episodes = []
        state.episodes = state.episodes.concat(action.payload.results)
        if (action.payload.info.next != null) state.nextLink = action.payload.info.next
        if (action.payload.info.prev != null) state.prevLink = action.payload.info.prev
      })
      .addCase(filterEpisodes.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})


export const { setNextLink, setPrevLink } = episodeSlice.actions

export default episodeSlice.reducer
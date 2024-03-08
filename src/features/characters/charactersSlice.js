import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  nextLink: '',
  prevLink: '',
  characters: [],
  status: "idle"
}

export const fetchCharacters = createAsyncThunk('character/fetchCharacters', async (link) => {
  const response = await axios.get(link)
  return response.data
})

export const filterCharacters = createAsyncThunk('character/filterCharacters', async (link) => {
  const response = await axios.get(link)
  return response.data
})

export const characterSlice = createSlice({
  name: 'character',
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
      .addCase(fetchCharacters.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.characters = state.characters.concat(action.payload.results)
        if (action.payload.info.next != null) state.nextLink = action.payload.info.next
        if (action.payload.info.prev != null) state.prevLink = action.payload.info.prev
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(filterCharacters.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(filterCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.characters = []
        state.characters = state.characters.concat(action.payload.results)
        if (action.payload.info.next != null) state.nextLink = action.payload.info.next
        if (action.payload.info.prev != null) state.prevLink = action.payload.info.prev
      })
      .addCase(filterCharacters.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})


export const { setNextLink, setPrevLink } = characterSlice.actions

export default characterSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  prevId: [],
  nextId: [],
  details: {
    id: 1,
    name: "",
    air_date: "",
    episode: "",
    characters: {
      name: "",
      url: ""
    },
    url: "",
    created: ""
  },
  characters: [],
  status: "idle"
}

export const fetchEpisodeDetails = createAsyncThunk('episodeDetails/fetchEpisodeDetails', async (link) => {
  const response = await axios.get(link)
  let characterLink = 'https://rickandmortyapi.com/api/character/'

  response.data.characters.forEach(element => {
    characterLink += element.substring(element.lastIndexOf('/') + 1) + ','
  });

  const responseEpisodes = await axios.get(characterLink)

  const dataToSend = {
    details: response.data,
    characters: responseEpisodes.data
  }
  return dataToSend
})

export const episodeSlice = createSlice({
  name: 'episodeDetails',
  initialState,
  reducers: {
    setNextId: (state, action) => {
      state.nextId = action.payload;
    },
    setPrevId: (state, action) => {
      state.prevId = action.payload;
    },
    toNextPage: (state, action) => {
      state.nextId = [];
      store.details.id = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEpisodeDetails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchEpisodeDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.details = action.payload.details
        state.characters = action.payload.characters
      })
      .addCase(fetchEpisodeDetails.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})


export const { setNextLink, setPrevLink, toNextPage } = episodeSlice.actions

export default episodeSlice.reducer
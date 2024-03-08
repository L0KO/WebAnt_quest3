import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  prevId: [],
  nextId: [],
  details: {
    id: 1,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
      url: ""
    },
    location: {
      name: "",
      url: ""
    },
    image: "",
    episode: [
      "",
      "",
    ],
    url: "",
    created: ""
  },
  episodes: [],
  status: "idle"
}

export const fetchCharacterDetails = createAsyncThunk('characterDetails/fetchCharacterDetails', async (link) => {
  const response = await axios.get(link)
  let episodesLink = 'https://rickandmortyapi.com/api/episode/'

  response.data.episode.forEach(element => {
    episodesLink += element.substring(element.lastIndexOf('/') + 1) + ','
  });

  const responseEpisodes = await axios.get(episodesLink)

  const dataToSend = {
    details: response.data,
    episodes: responseEpisodes.data
  }
  return dataToSend
})

export const characterSlice = createSlice({
  name: 'characterDetails',
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
      .addCase(fetchCharacterDetails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.details = action.payload.details
        state.episodes = action.payload.episodes
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})


export const { setNextLink, setPrevLink, toNextPage } = characterSlice.actions

export default characterSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  prevId: [],
  nextId: [],
  details: {
    id: 1,
    name: "",
    type: "",
    dimension: "",
    residents: {
      name: "",
      url: ""
    },
    url: "",
    created: ""
  },
  characters: [],
  status: "idle"
}

export const fetchLocationDetails = createAsyncThunk('locationDetails/fetchLocationDetails', async (link) => {
  const response = await axios.get(link)
  let characterLink = 'https://rickandmortyapi.com/api/character/'

  response.data.residents.forEach(element => {
    characterLink += element.substring(element.lastIndexOf('/') + 1) + ','
  });

  const responseEpisodes = await axios.get(characterLink)

  const dataToSend = {
    details: response.data,
    characters: responseEpisodes.data
  }
  return dataToSend
})

export const locationSlice = createSlice({
  name: 'locationDetails',
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
      .addCase(fetchLocationDetails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchLocationDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.details = action.payload.details
        state.characters = action.payload.characters
      })
      .addCase(fetchLocationDetails.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})


export const { setNextLink, setPrevLink, toNextPage } = locationSlice.actions

export default locationSlice.reducer
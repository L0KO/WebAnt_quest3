import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from '../features/characters/charactersSlice'
import locationsReducer from '../features/locations/locationsSlice'
import episodesReducer from '../features/episodes/episodesSlice'
import characterDetailsReducer from '../features/characterDetails/characterDetailsSlice'
import locationDetailsReduser from '../features/locationDetails/locationDetailsSlice'
import episodeDetailsReduser from '../features/episodeDetails/episodeDetailsSlice'


export default configureStore({
  reducer: {
    character: charactersReducer,
    location: locationsReducer,
    episode: episodesReducer,
    characterDetail: characterDetailsReducer,
    locationDetail: locationDetailsReduser,
    episodeDetail: episodeDetailsReduser,
  }
})
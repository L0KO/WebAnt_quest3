import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Root from "./routes/root";
import CharactersPage from "./routes/CharactersPage";
import LocationsPage from "./routes/LocationsPage";
import EpisodesPage from "./routes/EpisodesPage";
import CharacterDatails from "./routes/CharacterDatails";
import LocationsDetails from "./routes/LocationsDetails";
import EpisodeDetails from "./routes/EpisodeDetails";
import store from './app/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <CharactersPage />,
      },
      {
        path: "/locationsPage",
        element: <LocationsPage />,
      },
      {
        path: "/episodesPage",
        element: <EpisodesPage />,
      },
      {
        path: "/characterDetails",
        element: <CharacterDatails />,
      },
      {
        path: "/locationDetails",
        element: <LocationsDetails />,
      },
      {
        path: "/episodeDetails",
        element: <EpisodeDetails />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

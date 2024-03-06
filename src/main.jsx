import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import CharactersPage from "./routes/CharactersPage";
import LocationsPage from "./routes/LocationsPage";
import EpisodesPage from "./routes/EpisodesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
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
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

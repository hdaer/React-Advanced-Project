import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Root } from "./components/Root";
import {
  EventPage,
  loader as eventLoader,
  // action as eventAction,
} from "./pages/EventPage";

import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";

import {
  NewEventPage,
  loader as newEventLoader,
  action as newEventAction,
} from "./pages/NewEventPage";

import { TestPage } from "./pages/TestPage";
// import {
//   NewEventForm,
//   loader as newEventLoader2,
//   action as newEventModalAction,
// } from "./components/NewEventForm";
// import { DeleteModal } from "./components/DeleteModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
      },
      {
        path: "/newevent",
        element: <NewEventPage />,
        loader: newEventLoader,
        action: newEventAction,
      },
      {
        path: "/testpage",
        element: <TestPage />,
        // loader: newEventLoader,
        // action: newEventAction,
      },
      // {
      //   path: "/neweventModal",
      //   element: <NewEventForm />,
      //   loader: newEventLoader2,
      //   action: newEventModalAction,
      // },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

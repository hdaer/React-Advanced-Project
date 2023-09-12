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
import { DeleteModal } from "./components/DeleteModal";
// import {
//   NewEventForm,
//   loader as formLoader,
//   action as addEvent,
// } from "./utils/NewEventForm";

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
        // action: eventAction,
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
      {
        path: "/event/:eventId",
        element: <DeleteModal />,
        // loader: formLoader,
        // action: deleteAction,
      },
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

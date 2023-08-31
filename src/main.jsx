import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import {
  NewEventPage,
  loader as newEventLoader,
  action as newEventAction,
} from "./pages/NewEventPage";
// import {
//   NewEventForm,
//   loader as formLoader,
//   action as addEvent,
// } from "./utils/NewEventForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

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
        // loader: postLoader,
        // action: addComment,
      },
      {
        path: "/newevent",
        element: <NewEventPage />,
        loader: newEventLoader,
        action: newEventAction,
      },
      // {
      //   path: "/addEvent",
      //   element: <NewEventForm />,
      //   loader: formLoader,
      //   action: addEvent,
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

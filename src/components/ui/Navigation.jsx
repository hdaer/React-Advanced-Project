import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <li>
          <Link to="/event/1">Event</Link>
        </li>
        <li>
          <Link to="/newevent">New Event</Link>
        </li>
        <li>
          <Link to="/testpage">Test Page</Link>
        </li>
      </ul>
    </nav>
  );
};

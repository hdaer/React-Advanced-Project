import { Link } from "react-router-dom";

export const EventCard = ({ event, categories }) => {
  return (
    <div key={event.id} className="event">
      <Link to={`event/${event.id}`}>
        <p>{event.title}</p>
        <p>{event.description}</p>
        <img src={event.image} alt={event.title} width="500" height="600" />
        <p>
          start: {event.endTime.substring(0, 10)},{" "}
          {event.endTime.substring(11, 16)}
        </p>
        <p>
          end: {event.endTime.substring(0, 10)},{" "}
          {event.endTime.substring(11, 16)}
        </p>
        <p>
          Category:{" "}
          {event.categoryIds.map((categoryId) => {
            return (
              <span key={categoryId}>
                {categories[Number(categoryId) - 1].name}{" "}
              </span>
            );
          })}
        </p>
      </Link>
    </div>
  );
};

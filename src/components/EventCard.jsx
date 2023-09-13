import { Link } from "react-router-dom";

export const EventCard = ({ event, categories }) => {
  return (
    <div key={event.id} className="eventcard">
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
          {categories.map((category) => {
            return event.categoryIds.includes(category.id) ? (
              <span key={category.id}>{category.name} </span>
            ) : null;
          })}
        </p>
      </Link>
    </div>
  );
};

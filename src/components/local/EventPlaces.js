import React from "react";
import dayjs from "dayjs";

function EventPlaces({
  places,
  highlight,
  highlightPlace,
  date,
  zeitgeistsRequest,
}) {
  const placeSelected = (place, index) => {
    highlightPlace(index);
    if (place == null) {
      if (date == null) {
        zeitgeistsRequest(date, date, place);
      } else {
        const startofDay = dayjs(date).startOf("day").format();
        const endofDay = dayjs(date).endOf("day").format();
        zeitgeistsRequest(startofDay, endofDay, place);
      }
    } else {
      if (date == null) {
        zeitgeistsRequest(date, date, place);
      } else {
        const startofDay = dayjs(date).startOf("day").format();
        const endofDay = dayjs(date).endOf("day").format();
        zeitgeistsRequest(startofDay, endofDay, place);
      }
    }
  };
  return (
    <div className="event-places">
      <div
        onClick={() => placeSelected(null, null)}
        className={`${highlight == null ? "highlight" : ""}`}
      >
        <p>All</p>
      </div>
      {places.map((place, index) => (
        <div
          key={index}
          className={`${highlight === index ? "highlight" : ""}`}
          onClick={() => placeSelected(place, index)}
        >
          <p>{place}</p>
        </div>
      ))}
    </div>
  );
}
export default EventPlaces;
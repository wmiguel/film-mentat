function EventPlaces({ placeSelected, placeHighlight, screeningPlaces }) {
  return (
    <div className="event-places">
      <div
        onClick={() => placeSelected(null, null)}
        className={`${placeHighlight == null ? "highlight" : ""}`}
        style={{ cursor: "pointer" }}
      >
        <p>All</p>
      </div>
      {screeningPlaces.map((place, index) => (
        <div
          key={index}
          className={`${placeHighlight === index ? "highlight" : ""}`}
          onClick={() => placeSelected(place, index)}
          style={{ cursor: "pointer" }}
        >
          <p>{place}</p>
        </div>
      ))}
    </div>
  );
}
export default EventPlaces;
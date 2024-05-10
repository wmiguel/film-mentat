function FilmSearchCancel({ toggleOff }) {
  return (
    <>
      <div className="film-search-cancel">
        
        <div className="add-a-film">
          <h2>Add a Film</h2>
        </div>
        <button onClick={toggleOff}>Cancel</button>
      </div>
    </>
  );
}

export default FilmSearchCancel;
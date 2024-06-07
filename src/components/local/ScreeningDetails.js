const ScreeningDetails = ({ eventData }) => {
  return (
    <>
      <div
        className={`container modal-container`}
        style={{
          flex: "1 1 auto",
          padding: "24px 24px 64px",
          backgroundColor: "pink"
        }}
      >
        <div
          className="details"
          style={{
            marginBottom: "64px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            className="film-info film-edit show"
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >

            
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreeningDetails;

import ScreeningDetails from "./ScreeningDetails";

const ScreeningModal = ({ closeModal, eventData }) => {
  return (
    <>
      <div
        className="cancel-button"
        style={{
          marginLeft: "auto",
          marginRight: "0",
        }}
      >
        <button
          className="cancel"
          onClick={() => closeModal()}
          style={{
            border: "none",
            borderRadius: "24px",
            lineHeight: "12px",
            padding: "9px 12px 8px",
            cursor: "pointer",
            transition: "ease-in-out 0.25s",
            width: "84px",
            height: "48px",
            fontSize: "18px",
          }}
        >
          Close
        </button>
      </div>
      <ScreeningDetails eventData={eventData} />
    </>
  );
};

export default ScreeningModal;
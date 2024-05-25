import { ReactComponent as TicketSVG } from "../images/empty-ticket.svg";

const Letterboxd = () => {
  return (
    <section className="film-letterboxd flex">
      <div className="empty-wrap">
        <div className="dash-border">
          <div className="empty-text">
            <div className="empty-ticket">
              <TicketSVG />
            </div>
            <h1>Your Letterboxd Watchlist!</h1>
            <h3>Coming Soon</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Letterboxd;

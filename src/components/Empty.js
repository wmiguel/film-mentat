import React from "react";
import { ReactComponent as TicketSVG } from "../images/empty-ticket.svg";
const Empty = ({ header, body }) => {
  return (
    <div className="empty-wrap flex">
      <div className="dash-border flex">
        <div className="empty-text">
          <div className="empty-ticket">
            <TicketSVG />
          </div>
          <h3>{header}</h3>
          <h4>{body}</h4>
        </div>
      </div>
    </div>
  );
}
export default Empty;
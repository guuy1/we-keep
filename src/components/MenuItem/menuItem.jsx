import React from "react";
import { withRouter } from "react-router-dom";
import "./menuItem.scss";

//home page design
const MenuItem = ({ title, imageUrl, subtitle, history, linkUrl }) => (
  <div className="menu-item" onClick={() => history.push(`${linkUrl}`)}>
    <div
      className="backgroung-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">{subtitle.toUpperCase()}</span>
    </div>
  </div>
);

export default withRouter(MenuItem);

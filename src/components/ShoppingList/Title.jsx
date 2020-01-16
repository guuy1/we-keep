import React, { useState } from "react";
import "./Title.css";
import "font-awesome/css/font-awesome.min.css";

function Title() {
  const getCurrentDate = (separator = "/") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  };

  const [title, setTitle] = useState("רשימת קניות " + getCurrentDate());

  const handleTitle = e => setTitle(e.target.value);

  return (
    <input
      type="text"
      value={title}
      onChange={handleTitle}
      placeholder="Title"
      className="title"
    />
  );
}

export default Title;

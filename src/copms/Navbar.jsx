import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Navbar = () => {
  return (
    <div>
      <button className="btn btn-info m-2">בית</button>
      <button className="btn btn-success m-2">רשימת קניות</button>
      <button className="btn btn-warning m-2">סרוק מוצר</button>
      <button className="btn btn-danger m-2">יציאה</button>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const ShoppingList = () => {
  const [search, setSearch] = useState("");

  function validateForm() {
    return search.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function showImg() {
    var idd = document.getElementById("image");
    idd.remove();
    const url =
      "https://m.pricez.co.il/ProductPictures/200x/" + search + ".jpg";
    var img = document.createElement("img");
    img.src = url;
    img.id = "image";
    var id = document.getElementById("showImage");
    id.appendChild(img);
    setSearch("");
    console.log(img);
  }
  return (
    <div>
      <h1>Shopping-List</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="search" bsSize="large">
          <ControlLabel>Search</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </FormGroup>
        <Button
          onClick={showImg}
          block
          bsSize="large"
          disabled={!validateForm()}
          type="submit"
        >
          Search
        </Button>
        <div id="showImage">
          <div id="image"></div>
        </div>
      </form>
    </div>
  );
};

export default ShoppingList;

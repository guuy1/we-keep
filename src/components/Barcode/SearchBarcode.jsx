import React, { Component } from "react";
import XMLParser from "react-xml-parser";
import xmlData from "./barcodes.xml";

const SearchBarcode = () => {
  // var fs = require("fs");
  // var parser = require("xml2json");

  // const xmlBarcodes = new XMLParser().parseFromString(xmlData);
  console.log(xmlData);
  // console.log(xmlBarcodes.getElementsByTagName("ItemCode"));
  return (
    <div>
      {/* <div>{xmlBarcodes}</div>
      <div>{xmlBarcodes.getElementsByTagName("ItemCode")}</div> */}
      <h1>heloo</h1>
    </div>
  );
};

export default SearchBarcode;

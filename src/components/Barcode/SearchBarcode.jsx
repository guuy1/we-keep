import React, { Component } from "react";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import "bootstrap/dist/css/bootstrap.css";

const SearchBarcode = () => {
  
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <BarcodeList authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

class BarcodeListComp extends Component {

  displayList(){
    
    let xmlContent = '' 
    let tableItems = document.getElementById('items')
    const fetch = require('node-fetch');
    //const fileType = require('file-type');

    fetch('barcodes.xml').then((response)=>{
        response.text().then((xml)=>{
            xmlContent = xml 
            let parser = new DOMParser()
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
            let items = xmlDOM.querySelectorAll('ItemCode')
            console.log(parser)
            console.log(xmlDOM)
            console.log(items)
            console.log(xml)
            items.forEach(itemXmlNode => {
              
                let row = document.createElement('tr')

                //author
                let td = document.createElement('td')
                td.innerText = itemXmlNode.children[1].innerHTML
                row.appendChild(td)
               
                tableItems.children[1].appendChild(row)
                console.log(tableItems.children[1])
                
            });

        });
    });
  }
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div id='content'>
          <table id='items' cellpading='10px' className="text-align:left;">
              <thead>
                  <tr>
                      <th>Barcode</th>
                      <th>Name</th>
                      <th>Price</th>
                  </tr>
              </thead>
              <tbody>
  
              </tbody>
          </table>
          <button  className="btn btn-primary m-1"
                  onClick={() => this.displayList()}>
        
          </button>
      </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const BarcodeList = withFirebase(BarcodeListComp);
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(SearchBarcode);
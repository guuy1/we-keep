import React from "react";
import MenuItem from "../MenuItem/menuItem";
import "./directory.scss";
import * as ROUTES from "../../constants/routes";
import listImg from "../Data/list.jpg";
import productsImg from "../Data/products.jpg";
import scanImg from "../Data/scan.jpeg";

//home page design
class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "סרוק מוצרים",
          subtitle: "הוסף מוצר חדש ותוקפו",
          imageUrl: scanImg,
          id: 3,
          linkUrl: ROUTES.SCAN_BARCODE,
        },
        {
          title: "המוצרים שלי",
          subtitle: "בדוק תוקף מוצריך",
          imageUrl: productsImg,
          id: 2,
          linkUrl: ROUTES.MY_PRODUCTS,
        },
        {
          title: "הרשימות שלי",
          subtitle: "הוסף וערוך רשימות",
          imageUrl: listImg,
          id: 1,
          linkUrl: ROUTES.CREATE_LIST,
        },
      ],
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

export default Directory;

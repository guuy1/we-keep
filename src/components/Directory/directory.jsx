import React from "react";
import MenuItem from "../MenuItem/menuItem";
import "./directory.scss";
import * as ROUTES from "../../constants/routes";
import listImg from "../Data/list.jpg";
import productsImg from "../Data/products.jpg";
import scanImg from "../Data/scan.jpeg";
class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "my lists",
          subtitle: "TAKE A LOOK AT YOYR LISTS",
          imageUrl: listImg,
          id: 1,
          linkUrl: ROUTES.CREATE_LIST,
        },
        {
          title: "my products",
          subtitle: "TAKE A LOOK AT YOYR PRODUCTS",
          imageUrl: productsImg,
          id: 2,
          linkUrl: ROUTES.MY_PRODUCTS,
        },
        {
          title: "new scan",
          subtitle: "ADD A NEW PRODUCTS",
          imageUrl: scanImg,
          id: 3,
          linkUrl: ROUTES.SCAN_BARCODE,
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

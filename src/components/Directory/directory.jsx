import React from "react";
import MenuItem from "../MenuItem/menuItem";
import "./directory.scss";
import * as ROUTES from "../../constants/routes";
class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "my lists",
          subtitle: "TAKE A LOOK AT YOYR LISTS",
          imageUrl:
            "https://arc-trs-savvy.s3.amazonaws.com/uploads/2016/11/6.2_Meal-plan-and-shopping-list-on-fridge-1024x682.jpg",
          id: 1,
          linkUrl: ROUTES.CREATE_LIST,
        },
        {
          title: "my products",
          subtitle: "TAKE A LOOK AT YOYR PRODUCTS",
          imageUrl:
            "http://www.brockpress.com/wp-content/uploads/2019/03/istockphoto-855098134-612x612-300x200.jpg",
          id: 2,
          linkUrl: ROUTES.MY_PRODUCTS,
        },
        {
          title: "new scan",
          subtitle: "ADD A NEW PRODUCTS",
          imageUrl:
            "https://cdn-images-1.medium.com/max/640/1*RTSUD26ntrTxfOvcJezftw.jpeg",
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

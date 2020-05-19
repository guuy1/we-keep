import React from "react";
import { Link } from "react-router-dom";
import "./Landing.scss";
import * as ROUTES from "../../constants/routes";
import CustomButton from "../CustomButton/CustomButton";

class Landing extends React.Component {
  render() {
    return (
      <div className="about-us">
        <h1 className="title">We Keep</h1>
        <p className="sub">
          בעזרת אפליקציית WeKeep תוכלו אתה ומשפחתך או שותפייך לנהל את משק הבית
          בצורה יעילה וקלה יותר.בעזרת סריקת ברקוד מהירה תוכלו לעקוב אחרי תכולת
          המקרר שלכם בכל רגע.
        </p>
        <p className="sub1">
          בעזרת WeKeep גם התקשורת שלכם תשתפר בעזרת רשימות משותפות המתעדכנות בזמן
          אמת אצל כל דיירי הבית.
        </p>
        <p className="sub2">
          הצטרפו ל WeKeep עכשיו והפכו את חייכם למסודרים יותר
        </p>
        <Link className="link" to={ROUTES.SIGN_UP}>
          <CustomButton>הירשמו עכשיו</CustomButton>
        </Link>
      </div>
    );
  }
}

export default Landing;

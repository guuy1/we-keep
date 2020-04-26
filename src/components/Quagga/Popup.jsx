import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Popup = ({ showPopup, togglePopup }) => {
  return (
    <div>
      <ModalC showPopup={showPopup} togglePopup={togglePopup} />
    </div>
  );
};
class ModalComp extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.showPopup}
          onHide={this.props.togglePopup}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>נמצא מוצר</Modal.Title>
          </Modal.Header>
          <Modal.Body>נמצא מוצר</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.togglePopup}>
              הוסף מוצר והמשך סריקה
            </Button>
            <Button variant="primary" onClick={this.props.togglePopup}>
              הוסף מוצר וסיים סריקה
            </Button>
            <Button variant="secondary" onClick={this.props.togglePopup}>
              זה לא המוצר,המשך סריקה
            </Button>
            <Button variant="secondary" onClick={this.props.togglePopup}>
              זה לא המוצר,סיים סריקה
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const ModalC = withFirebase(ModalComp);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Popup);

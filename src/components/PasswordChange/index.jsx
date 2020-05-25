import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import CustomButton from "../CustomButton/CustomButton";
import FormInput from "../FormInput/FormInput";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
  ok: null,
};
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({
          passwordOne: "",
          passwordTwo: "",
          error: null,
          ok: "You have successfully changed your password",
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { passwordOne, passwordTwo, error, ok } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    return (
      <form onSubmit={this.onSubmit}>
        <FormInput
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="סיסמא חדשה"
        />
        <FormInput
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="אשר סיסמא חדשה"
        />
        <CustomButton disabled={isInvalid} type="submit">
          שנה סיסמא
        </CustomButton>
        {error && <p>{error.message}</p>}
        {ok && <p>{ok}</p>}
      </form>
    );
  }
}
export default withFirebase(PasswordChangeForm);

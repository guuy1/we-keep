import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import { P, ForgetPassLink } from "./PasswordForget.styles";

const PasswordForgetPage = () => (
  <div>
    <h1>איפוס סיסמא</h1>
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email: "",
  error: null,
};
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <form onSubmit={this.onSubmit}>
        <FormInput
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="כתובת אימייל"
        />
        <CustomButton disabled={isInvalid} type="submit">
          אפס סיסמא
        </CustomButton>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const PasswordForgetLink = () => (
  <P>
    <ForgetPassLink to={ROUTES.PASSWORD_FORGET}>שכחת סיסמא?</ForgetPassLink>
  </P>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };

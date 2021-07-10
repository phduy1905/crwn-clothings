import FormGroup from "../form-input/form-group.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.style.scss";
import { Component } from "react";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    const { displayName, email, password, confirmPassword } = this.state;
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password doesn't match");
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit} className="form-sign-up">
          <FormGroup
            name="displayName"
            type="text"
            onChange={this.handleChange}
            label="Display Name"
            value={displayName}
            required
          />
          <FormGroup
            name="email"
            type="email"
            onChange={this.handleChange}
            label="Email"
            value={email}
            required
          />
          <FormGroup
            name="password"
            type="password"
            onChange={this.handleChange}
            label="Password"
            value={password}
            required
          />
          <FormGroup
            name="confirmPassword"
            type="password"
            onChange={this.handleChange}
            label="Confirm Password"
            value={confirmPassword}
            required
          />
          <CustomButton>Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;

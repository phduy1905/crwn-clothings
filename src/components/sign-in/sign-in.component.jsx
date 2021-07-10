import { Component } from "react";
import "./sign-in.style.scss";
import FormGroup from "../form-input/form-group.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span className="subtitle">Sign in with your email and password</span>
        <form action="submit">
          <FormGroup
            type="email"
            onChange={this.handleChange}
            value={email}
            name="email"
            required
            label="email"
          />
          <FormGroup
            type="password"
            onChange={this.handleChange}
            value={password}
            name="password"
            required
            label="password"
          />
          <div className="buttons">
            <CustomButton type="submit" onSubmit={this.handleSubmit}>
              Sign In
            </CustomButton>
            <CustomButton
              onClick={signInWithGoogle}
              onSubmit={this.handleSubmit}
              isGoogleSignIn
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;

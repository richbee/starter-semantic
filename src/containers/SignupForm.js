import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
  Button, Form, Grid, Message, Header, Transition
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signUp} from '../actions/authActions';
import CheckedItem from '../components/CheckedItem';




class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        successMsg: "",
        warningMsg: "",
        errorMsg: "",
        longEnough: false,
        hasUppercase: false,
        hasLowercase: false
    }
    //this.handleChange=this.handleChange.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = (e, {id,value}) => {
    this.setState({
      [id]: value
    });
    if(id === "password") {
      this.checkPasswordCriteria();
    }
  }

  checkPasswordCriteria = () => {
    const hasNumber = value => {
       return new RegExp(/[0-9]/).test(value);
    }
    const hasUpper = value => {
       return new RegExp(/[A-Z]/).test(value);
    }
    const hasLower = value => {
      return new RegExp(/[a-z]/).test(value);
    }
    const isLongEnough = value => {
      return value.length >= 8;
    }
    this.setState({
      longEnough: isLongEnough(this.state.password),
      hasUppercase: hasUpper(this.state.password),
      hasLowercase: hasLower(this.state.password),
      hasNumber: hasNumber(this.state.password)
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmitUserSignup(this.state.email, this.state.password, this.state.name);
  }

  formValid = () => {
    return this.state.longEnough && this.state.hasUppercase && this.state.hasLowercase && this.state.hasNumber && this.state.password===this.state.confirmPassword && this.state.email !== "" && this.state.name !== "";

  }

  renderSignupForm = () => {
    console.log(this.formValid());
    return(
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={8} computer={6}>
            <Header as='h1'>Create new account</Header>
              <Form
                onSubmit={this.handleSubmit}
                error={this.props.signupFailureReason !== ''}
                loading={this.props.signupInProgress}
              >
                <Form.Input
                  required
                  label="Email address"
                  type="email"
                  id="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="someone@somewhere.com"
                  onChange={this.handleChange}
                />
                <Form.Input
                  required
                  label="Password"
                  type="password"
                  id="password"
                  icon="key"
                  iconPosition="left"
                  placeholder="Password..."
                  onChange={this.handleChange}
                />
                <Transition
                  visible={!this.state.hasNumber || !this.state.hasUppercase || !this.state.hasLowercase || !this.state.longEnough}
                  animation="slide up"
                  duration={500}
                >
                  <Message
                    color='brown'
                  >
                    <Message.Header>Your password should include...</Message.Header>
                    <CheckedItem done={this.state.longEnough} text="at least 8 characters" />
                    <CheckedItem done={this.state.hasUppercase} text="uppercase letters" />
                    <CheckedItem done={this.state.hasLowercase} text="lowercase letters" />
                    <CheckedItem done={this.state.hasNumber} text="numbers" />
                  </Message>
                </Transition>

                <Form.Input
                  required
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  icon="key"
                  iconPosition="left"
                  placeholder="Password..."
                  onChange={this.handleChange}
                  error={this.state.confirmPassword!==this.state.password}
                />

                <Form.Input
                  required
                  label="Your Name"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  id="name"
                  placeholder="Your name..."
                  onChange={this.handleChange}
                />
                <Message
                  error
                  header="Something's wrong..."
                  content={this.props.signupFailureReason}
                />
                <Message
                  warning
                  header="Warning"
                  content={this.state.warningMsg}
                />
                <Message
                  success
                  header="Hooray!"
                  content={this.state.successMsg}
                />
              </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={8} computer={6}>
            <Button
              fluid
              color="red"
              size="large"
              onClick={this.handleSubmit}
              disabled={!this.formValid()}
            >
              Sign me up!
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center" mobile={14} tablet={8} computer={6}>Already signed up? <Link to="/login">Log in here.</Link></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={8} computer={6}>&nbsp;</Grid.Column>
        </Grid.Row>
      </Grid>
    );

  }

  renderSignupConfirmation = () => {
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={8} computer={6}>
            <Message
              success
              icon="thumbs up"
              header="Congratulations"
              content="You've signed up. Now check your email for a confirmation link."
            />
            <Button
              as={Link}
              to="/"
              color="red"
              size="large"
            >
            Continue to Home
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  render() {
    if(this.props.signupSuccess) {
      return this.renderSignupConfirmation()
    } else {
      return this.renderSignupForm();
    }
  }

}
 const mapDispatchToProps = (dispatch,ownProps) => ({
   onSubmitUserSignup: (username, password, fullName) => {
     dispatch(signUp(username, password, fullName));
   },
   onSubmitChurchLocation: (lat,lng,churchName) => {
     //dispatch(newChurchLocation)
   }
 });

 const mapStateToProps = (state,ownProps) => ({
   loggedIn: state.userAuth.loggedIn,
   signupInProgress: state.userAuth.signupInProgress,
   signupSuccess: state.userAuth.signupSuccess,
   signupFailureReason: state.userAuth.signupFailureReason
 });

 export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);

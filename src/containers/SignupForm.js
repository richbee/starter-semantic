import React, {Component} from 'react';
import {
  Container, Button, Form, Grid, Message, Progress
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signUp} from '../actions/authActions';
import passwordStrength from '../lib/passwordStrength';



class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password: "",
        name: "",
        successMsg: "",
        warningMsg: "",
        errorMsg: "",
        passwordStrength: 0
    }
    //this.handleChange=this.handleChange.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = (e, {id,value}) => {
    this.setState({
      [id]: value
    });
    if(id === "password") {
      console.log('checking password strength');
      this.setState({
        passwordStrength: passwordStrength(this.state.password)
      })

    }
  }


  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmitUserSignup(this.state.email, this.state.password, this.state.name);
  }

  renderSignupForm = () => {
    return(
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={8} computer={6}>
              <Form
                onSubmit={this.handleSubmit}
                error={this.props.signupFailureReason !== ''}
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
                <Progress
                  size='tiny'
                  percent={this.state.passwordStrength}
                  warning={this.state.passwordStrength < 60 && this.state.passwordStrength >= 30}
                  success={this.state.passwordStrength >= 60}
                  error={this.state.passwordStrength < 30}
                >
                Password Strength
                </Progress>
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
          <Grid.Column mobile={14} tablet={8} computer={6}><Button fluid onClick={this.handleSubmit}>Sign me up!</Button></Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column mobile={14} tablet={8} computer={6}>&nbsp;</Grid.Column>
        </Grid.Row>
      </Grid>
    );

  }

  render() {
    return this.renderSignupForm();
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
   signupFailureReason: state.userAuth.signupFailureReason
 });

 export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);

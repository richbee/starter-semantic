import React, {Component} from 'react'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {logIn} from '../actions/authActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formValid = this.formValid.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    console.log('login clicked');
    e.preventDefault();
    this.props.loginClick(this.state.username,this.state.password);
  }

  formValid() {
    return this.state.username !== "" && this.state.password !== "";
  }

  render() {
    //if(this.props.loggedIn) this.props.location.history.push('/');
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={8} computer={6}>
            <Header as='h1'>Login</Header>
            <Form
              size='large'
              className="attached fluid"
              loading={this.props.loggingIn}
              error={this.props.loginFailureReason !== ''}
              success={this.props.loggedIn}
            >
                <Message
                  error
                  header='Login failed'
                  content={this.props.loginFailureReason}
                />
                <Message
                  success
                  header='Login Successful'
                  content='Go ahead and click back to the home page.'
                />

                <Form.Input
                  id="username"
                  error={!this.formValid}
                  fluid
                  icon='mail'
                  iconPosition='left'
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder='username / email address'
                />
                <Form.Input
                  id="password"
                  fluid
                  icon='key'

                  error={!this.formValid}
                  value={this.state.password}
                  onChange={this.handleChange}
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />

                <Button
                  color='red'
                  fluid
                  size='large'
                  disabled={!this.formValid}
                  onClick={this.handleSubmit}
                >
                Login
              </Button>
          </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center" mobile={14} tablet={8} computer={6}>New to us? <Link to="/signup">Sign Up</Link></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={8} computer={6}>&nbsp;</Grid.Column>
        </Grid.Row>

      </Grid>
    );

  }

}

const mapStateToProps = (state, ownProps) => ({
  loggingIn: state.userAuth.loggingIn,
  loggedIn: state.userAuth.loggedIn,
  loginFailureReason: state.userAuth.loginFailureReason
});

const mapDispatchToProps = (dispatch,ownProps) => ({
  loginClick: (username,password) => {
    dispatch(logIn(username,password));
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);

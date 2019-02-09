import React, {Component} from 'react'
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'
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
    return true;
  }

  render() {
    return (
        <div className='login-form'>
          {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
          <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='red' textAlign='center'>
                <Icon name="arrow alternate circle right" /> Log in
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input
                    id="username"
                    error={!this.formValid}
                    fluid
                    icon='user'
                    iconPosition='left'
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder='username / email address'
                  />
                  <Form.Input
                    id="password"
                    fluid
                    icon='lock'

                    error={!this.formValid}
                    value={this.state.password}
                    onChange={this.handleChange}
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />

                  <Button color='red' fluid size='large' disabled={!this.formValid} onClick={this.handleSubmit}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );

  }

}


const mapDispatchToProps = (dispatch,ownProps) => ({
  loginClick: (username,password) => {
    dispatch(logIn(username,password));
  }
})

export default connect(null,mapDispatchToProps)(LoginForm);

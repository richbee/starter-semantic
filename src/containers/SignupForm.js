import React, {Component} from 'react';
import {
  Container, Button, Form, Grid, Message
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signUp} from '../actions/authActions';



class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password: "",
        name: "",
        successMsg: "",
        warningMsg: "",
        errorMsg: ""
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = (e, {id,value}) => {
    this.setState({
      [id]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmitUserSignup(this.state.email, this.state.password, this.state.name)

  }

  render() {
      return(
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column width={7}>
              <Container>
                <Form onSubmit={this.handleSubmit}>
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
                    text={this.state.errorMsg}
                  />
                  <Message
                    warning
                    header="Warning"
                    text={this.state.warningMsg}
                  />
                  <Message
                    success
                    header="Hooray!"
                    text={this.state.successMsg}
                  />


                </Form>

              </Container>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column><Button onClick={this.handleSubmit}>Sign me up!</Button></Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      );
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


 export default connect(null,mapDispatchToProps)(SignupForm);

import React, {Component} from 'react';
import {
  Grid, Container, Header, Modal, Button, Icon, Message, Form
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {userLevel} from '../actions/authActions';



class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        requestPasswordChange: false,
        oldPassword: "",
        newPassword: "",
        newPasswordRpt: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange = (e, {id, value}) => this.setState({[id]: value});


  handleModalOpen = () => this.setState({requestPasswordChange: true});

  handleModalClose = () => this.setState({requestPasswordChange: false});


  render() {
    if(!this.props.loggedIn) {
      return (
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column width={7}>
              <Container>
                <Header as='h3'>User Profile</Header>
                <p>No user logged in.</p>
              </Container>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }
    let userLevelTxt = "";
    console.log('user level: ',this.props.userLevel);
    console.log(userLevel.user);
    switch(this.props.userLevel) {
      case userLevel.notLoggedIn:
        userLevelTxt = "Not Logged In";
        break;
      case userLevel.user:
        userLevelTxt = "Not Logged In";
        break;
      case userLevel.admin:
        userLevelTxt = "Not Logged In";
        break;
      case userLevel.superAdmin:
        userLevelTxt = "Not Logged In";
        break;
      default:
        userLevelTxt = "error";
    }
    return (
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column width={7}>
            <Container>
              <Header as='h3'>User Profile</Header>
              <p><strong>Username:</strong> {this.props.currentUser.username}</p>
              <p>
                <strong>Password:</strong> <Button onClick={this.handleModalOpen}>Change Password</Button>
              </p>
              <p><strong>Your Name:</strong> {this.props.currentUser.name}</p>
              <p><strong>Your User Level:</strong> {userLevelTxt}</p>
              <Modal
                open={this.state.requestPasswordChange}
                onClose={this.handleModalClose}
                basic
                size="small"
              >
                <Header icon="key" content="Change your password" />
                <Modal.Content>
                  <Form inverted>
                    <Form.Input type="password" label="Old Password" id="oldPassword" onChange={this.handleChange} value={this.state.oldPassword} />
                    <Form.Input type="password" label="New Password" id="newPassword" onChange={this.handleChange} value={this.state.newPassword} />
                    <Form.Input type="password" label="New Password (again!)" id="newPasswordRpt" onChange={this.handleChange} value={this.state.newPasswordRpt} warning={this.state.newPassword !== this.state.newPasswordRpt} />

                  </Form>
                  <Message icon>
                    <Icon name="exclamation" />
                    <Message.Content>
                      <Message.Header>Password tip</Message.Header>
                      Make your password stronger by using a combination of upper and lower case lettters and numbers.
                    </Message.Content>
                  </Message>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic color="red" inverted onClick={this.handleModalClose}>
                    <Icon name="remove" />
                    Cancel
                  </Button>
                  <Button basic color="green" inverted>
                    <Icon name="checkmark" />
                    Change
                  </Button>
                </Modal.Actions>
              </Modal>

            </Container>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.userAuth.currentUser,
  loggedIn: state.userAuth.loggedIn,
  userLevel: state.userAuth.currentUser.userType
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (oldPass, newPass) => {
    //fire action to change password
  }

});

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);

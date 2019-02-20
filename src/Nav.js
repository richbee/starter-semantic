import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Container} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {logUserOut, userLevel} from './actions/authActions';
//menuitem component to only show if user permissions allow
import UserMenu from './components/UserMenu';
import ConditionalMenuItem from './components/ConditionalMenuItem';
const LoggedOutMenu = () =>
  <Menu.Menu position="right">
    <Menu.Item as={Link} to="/login">Login</Menu.Item>
    <Menu.Item as={Link} to="/signup">Sign up</Menu.Item>
  </Menu.Menu>


const menuItems = [
  {
    name: 'About',
    link: '/about',
    userLevel: userLevel.notLoggedIn
  },
  {
    name: 'New Action',
    link: '/action',
    userLevel: userLevel.user
  },
  {
    name: 'Admin Tools',
    link: '/admin',
    userLevel: userLevel.admin
  },
  {
    name: 'SuperAdmin Tools',
    link: '/superadmin',
    userLevel: userLevel.superAdmin
  }
];


class MainNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeLink: "home"
    }
  }

  render() {
    console.log('Nav props:',this.props);
    return(
      <Menu borderless>
        <Container text>
          <Menu.Item as={Link} to="/" header>Branding</Menu.Item>
          {
            menuItems.map((item, index) => {
              return(
                <ConditionalMenuItem
                  key={index}
                  link={item.link}
                  userLevel={item.userLevel}
                  currentUserLevel={this.props.userLevel}
                  active={true}
                  name={item.name}
                />
              );
            }
            )
          }
          {
            this.props.loggedIn
              ? <UserMenu name={this.props.currentUser.name} onLogOut={this.props.logOutClicked} />
              : <LoggedOutMenu />
          }
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = (state,ownProps) => ({
  loggedIn: state.userAuth.loggedIn,
  loggingIn: state.userAuth.loggingIn,
  currentUser: state.userAuth.currentUser,
  userLevel: state.userAuth.currentUser.userType || userLevel.notLoggedIn
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    logOutClicked: () => {
      console.log('someone wants out');
      dispatch(logUserOut());
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(MainNav);

import React from 'react';
import {
  Menu.Item
} from 'semantic-ui-react';

const NavItem = (props) => { //expecting text, destination, userlevel
  //only display Menu.Item if sufficient user level.
  //Suggest converting user levels to numbers (all the
  //way up the state tree, use constants if necessary
  //then can say "if currentUserLevel>userLevel, display..."
}

const mapStateToProps = (state,ownProps) => ({
  loggedIn: state.userAuth.loggedIn,
  currentUser: state.userAuth.currentUser
});

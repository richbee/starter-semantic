import React from 'react';
import {
  Menu, Dropdown, Button
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

// props expected: name, onLogOut

const UserMenu = (props) => {
  return (
    <Menu.Menu position="right">
      <Dropdown icon="user circle" item text={props.name}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={"/userprofile"} icon="user circle" text="Profile" />
          <Dropdown.Item as={Button} onClick={props.onLogOut} icon="key" text="Logout" />
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item as={Button} onClick={props.onLogOut}>Logout</Menu.Item>
    </Menu.Menu>
  );
}

export default UserMenu;

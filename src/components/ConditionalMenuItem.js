import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

// expected props:
// userLevel (minimum level to see this item)
// currentUserLevel
// link
// name

const ConditionalMenuItem = (props) => {
  if(props.userLevel<=props.currentUserLevel) {
    return (
      <Menu.Item as={Link} to={props.link}>{props.name}</Menu.Item>
    );
  } else {
    return null;
  }
}

export default ConditionalMenuItem;

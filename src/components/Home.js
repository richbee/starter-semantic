import React, {Fragment} from 'react';
import {Container, Header, Icon, Segment} from 'semantic-ui-react';

const Home = (props) =>
  <Fragment>
    <Segment inverted>
      <Container text>
        <Header
          as="h1"
          icon
          inverted
          textAlign="center"
          style={{minHeight: '50vh', marginTop: '5em'}}
        >
          <Icon name="home" />
          Home Page
          <Header.Subheader>
            Where your not-logged-in home page content goes
          </Header.Subheader>
        </Header>
      </Container>
    </Segment>
    <Container text>
      <p>
        This starter repo sets up a React-Redux-Thunk web app ready to connect to an AWS Lambda/API gateway backend.
      </p>
      <p>Styling is with Semantic-UI</p>
    </Container>
  </Fragment>

export default Home;

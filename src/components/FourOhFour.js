import React, {Fragment} from 'react';
import {Container, Header, Icon, Segment} from 'semantic-ui-react';

const FourOhFour = (props) =>
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
          <Icon name="question circle outline" />
          Four Oh Four
          <Header.Subheader>
            Oops. that page wasn't found.
          </Header.Subheader>
        </Header>
      </Container>
    </Segment>
    <Container
      text
      style={{textAlign: 'center', minHeight: '40vh'}}
    >
      <p>
        Try backing up, or scream out for help.
      </p>
    </Container>
  </Fragment>

export default FourOhFour;

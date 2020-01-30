import React from 'react';
import { Grid, Header, Form, Input, Segment } from 'semantic-ui-react';
import './SignInPage.scss';

function SignInPage() {
  return (
    <Grid size="huge" centered columns={2}>
      <Grid.Row>
        <Grid.Column>
          <br />
          <Header color="teal" as="h1" textAlign="center">
            Log In
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Segment>
        <Grid.Row>
          <Grid.Column>
            <Form.Field inline>
              <label>Name or Email</label>
              <Input
                size="small"
                type="text"
                icon="user"
                placeholder="error@mail.com"
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <br />
        <Grid.Row>
          <Grid.Column>
            <Form.Field inline>
              <label>Password </label>
              <Input
                size="small"
                type="password"
                icon="lock"
                placeholder="Password"
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Segment>
    </Grid>
  );
}

export default SignInPage;

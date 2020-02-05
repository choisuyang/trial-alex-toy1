import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Form, Input, Segment, Button } from 'semantic-ui-react';
import './SignInPage.scss';
import { withRouter, Link } from 'react-router-dom';

function SignInPage({ history }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  // console.log('History', history);

  const onSubmit = e => {
    e.preventDefault();
    // console.log('I am ID', loginId);
    // console.log('I am PWD', password);

    Meteor.loginWithPassword(loginId, password, err => {
      if (err) {
        alert('실패');
        console.log('로그인 실패');
      } else {
        alert('성공');
        console.log('로그인 성공');
        history.push('/');
      }
    });
  };

  const onChangeId = e => {
    setLoginId(e.target.value);
    console.log('id', loginId);
  };

  const onChangePwd = e => {
    setPassword(e.target.value);
    console.log('pwd', password);
  };

  return (
    <div>
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
                  onChange={onChangeId}
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
                  onChange={onChangePwd}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Segment>
      </Grid>
      <div className="buttonContainer">
        <Link to="/">
          <Button inverted color="blue">
            Cancel
          </Button>
        </Link>

        <Button inverted color="red" type="submit" onClick={onSubmit}>
          OK
        </Button>
      </div>
    </div>
  );
}

export default withRouter(SignInPage);

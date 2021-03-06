import React, { useState } from 'react';
import {
  Grid,
  Header,
  Segment,
  Form,
  Button,
  Image,
  Input,
  Label,
  BreadcrumbSection,
} from 'semantic-ui-react';
import './SignUpPage.scss';

import { isValidation } from '../SignUp/Auth.jsx';
import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';

// NOTE Main Page

function SignUpPage({ history }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [boolean, setBoolean] = useState(true);

  const onChangeEmail = e => {
    setEmail(e.target.value);
    // console.log('Target Email : ', e.target.value);
  };

  const onChangeName = e => {
    setName(e.target.value);
    // console.log('Target Name : ', e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
    // console.log('Target Password :', e.target.value);
  };

  const onChangeCheckPassword = e => {
    setPasswordError(e.target.value !== password);
    setCheckPassword(e.target.value);

    // console.log('Target RePassword :', e.target.value);
  };

  const onChangePhoneNumber = e => {
    setPhoneNumber(e.target.value);
    // console.log('Target PhoneNumber :', e.target.value);
  };

  const onTextValidation = () => {
    if (!isValidation(email).success) {
      setEmailError(isValidation(email).error);
      return false;
    }
    return true;
  };

  const onSubmit = e => {
    e.preventDefault();
    const valid = onTextValidation();
    setBoolean(valid);

    // console.log('Email Validation', valid);
    if (!valid) {
      console.log('Fail');
    }

    const inputUser = {
      email,
      name,
      password,
      checkPassword,
      phoneNumber,
    };

    Meteor.call('signup', inputUser, err => {
      if (err) {
        console.log('실패');
        alert('아이디가 이미 있거나 회원이 아닙니다.');
      } else {
        console.log('성공');
        alert('환영합니다.');
        history.push('/signin');
      }
    });
  };

  const buttonValidation =
    email.length > 3 &&
    name.length > 1 &&
    password.length > 1 &&
    phoneNumber.length > 9;

  // console.log('Check button', buttonValidation);

  // console.log('check', email.length);
  // console.log('name', name.length);
  // console.log('sum', email.length && name.length ? 'true' : 'false');

  return (
    <Grid centered columns={2}>
      <Grid.Row>
        <Grid.Column>
          <br />
          <Header className="HeaderStyle" as="h1" textAlign="center">
            Sign UP
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-TZqQC4X9p9Bjzmm9UZlhIw8Pix5MX4CYK5wZQUecZWzjDoHH&s"
          circular
          avatar
          size="tiny"
        />
      </Grid.Row>
      <Grid.Row>
        <Button size="small" color="red">
          Delete
        </Button>
        <Button size="small" color="blue">
          Upload
        </Button>
      </Grid.Row>

      <Segment>
        <Form size="large" onSubmit={onSubmit}>
          <Form.Field inline>
            <label>Email</label>
            <Input
              size="small"
              type="text"
              icon="mail"
              placeholder="email@gmail.com"
              onChange={onChangeEmail}
              name="email"
              value={email}
            />

            {boolean ? (
              <Label basic color="green" pointing="left">
                'Please enter a Email'
              </Label>
            ) : (
              <Label basic color="red" pointing="left">
                {emailError}
              </Label>
            )}

            {/* <Label basic color="red" pointing="left">
              {isValidInputEmail(email) ? 'Correct' : `${emailError}`}
            
            </Label> */}
          </Form.Field>
          <Form.Field inline>
            <label>Name :</label>
            <Input
              size="small"
              type="text"
              icon="user"
              placeholder="USER-NAME"
              onChange={onChangeName}
              name="name"
              value={name}
            />
            <Label basic color="red" pointing="left">
              'Please enter a Name'
            </Label>
          </Form.Field>
          <Form.Field inline>
            <label>Password</label>
            <Input
              size="small"
              type="password"
              icon="lock"
              placeholder="Password"
              onChange={onChangePassword}
              name="password"
              value={password}
            />
            <Label basic color="red" pointing="left">
              'Please enter a Password'
            </Label>
          </Form.Field>
          <Form.Field inline>
            <label>Check Password</label>
            <Input
              size="small"
              type="password"
              icon="lock"
              placeholder="Password"
              onChange={onChangeCheckPassword}
              name="CheckPassword"
              value={checkPassword}
            />
            <Label basic color="red" pointing="left">
              {!checkPassword.length || passwordError
                ? 'Please enter a Password'
                : 'Correct'}
            </Label>
          </Form.Field>
          <Form.Field inline>
            <label>Phone Number</label>
            <Input
              size="small"
              icon="phone"
              placeholder="Phone Number"
              onChange={onChangePhoneNumber}
              name="phoneNumber"
              value={phoneNumber}
            />
            <Label basic color="red" pointing="left">
              'Please enter a Phone Number'
            </Label>
          </Form.Field>
        </Form>
        <Grid.Row columns={3}>
          <br />
          <Button
            onClick={() => console.log('Cancel')}
            size="small"
            color="grey"
          >
            Cancel
          </Button>
          <Button
            disabled={!buttonValidation}
            type="submit"
            onClick={onSubmit}
            size="small"
            color="blue"
          >
            OK
          </Button>
        </Grid.Row>
      </Segment>

      <Grid.Row>
        <Header
          className="logOutStyle"
          size="small"
          color="blue"
          onClick={() => console.log('log out')}
        >
          Log out
        </Header>
      </Grid.Row>
    </Grid>
  );
}

export default SignUpPage;

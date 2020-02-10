import React, { useEffect, useState } from 'react';
import './UserInfo.scss';
import {
  Grid,
  Image,
  Header,
  Segment,
  Icon,
  Divider,
  Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import _ from 'lodash';

// user info
export default UserInfo = props => {
  // TODO : Get currentUser from props
  const currentUser = Meteor.user();
  const isLogedIn = currentUser && !_.isEmpty(currentUser);
  const TopPart = isLogedIn ? UserTopPart : GuestTopPart;
  const BottomPart = isLogedIn ? UserBottomPart : GuestBottomPart;

  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column style={{ textAlign: 'center' }}>
            <TopPart currentUser={currentUser} />
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row centered>
          <BottomPart currentUser={currentUser} />
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

// guest
// guest top part
const GuestTopPart = () => {
  return (
    <Header as="h2" icon>
      <Icon name="thumbs up outline" />
      Wellcome
      <Header.Subheader>Alex's Toy Proejct</Header.Subheader>
    </Header>
  );
};

// guest bottom part
const GuestBottomPart = () => {
  return (
    <Link to="/signin">
      <Header textAlign="center" inverted color="purple">
        'Please login to access'
      </Header>
    </Link>
  );
};

// user
// user top part
const UserTopPart = props => {
  const { currentUser } = props;
  return (
    <>
      <Image
        style={{ fontSize: 42, objectFit: 'cover', marginRight: 0 }}
        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBqjiOjl_gzPDbUiIJwuJJHa6sx8EdjgLDy5GzB8e2nXf5JAhw"
        src="https://i.insider.com/5e18dca3e0e14465ed6c174e?width=853&format=jpeg"
        avatar
      />
      <Header as="h2" textAlign="center">
        {currentUser ? currentUser.username : 'User'}
      </Header>
    </>
  );
};

// user bottom part
const UserBottomPart = props => {
  const labelStyle = {
    display: 'flex',
    border: 'none',
    marginRight: 0,
    marginLeft: 0,
    wordBreak: 'break-all',
  };

  const { currentUser } = props;
  return (
    <Segment basic textAlign="left" style={{ maxWidth: '100%' }}>
      <Label as="a" size="big" basic style={labelStyle}>
        <Icon name="phone square" size="large" />
        <sapn style={{ alignSelf: 'center' }}>
          {currentUser.profile.phoneNumber}
        </sapn>
      </Label>
      <Label as="a" size="big" basic style={labelStyle}>
        <Icon name="mail square" size="large" />
        <span style={{ alignSelf: 'center' }}>
          AAAAAAAAAA@nannana
          {currentUser.emails[0].address + _.times(80, () => 'a')}
        </span>
      </Label>
    </Segment>
  );
};

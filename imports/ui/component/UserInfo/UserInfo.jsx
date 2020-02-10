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
import autoprefixer from 'autoprefixer';

function UserInfo({ check }) {
  // console.log('UserINfo', check);

  const iAmUser = Meteor.user();

  // console.log('설마 너 유저냐', iAmUser);

  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column style={{ textAlign: 'center' }}>
            <Image
              style={{ fontSize: 42, objectFit: 'cover', marginRight: 0 }}
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBqjiOjl_gzPDbUiIJwuJJHa6sx8EdjgLDy5GzB8e2nXf5JAhw"
              src="https://i.insider.com/5e18dca3e0e14465ed6c174e?width=853&format=jpeg"
              avatar
            />
            <Header as="h2" textAlign="center">
              {iAmUser ? iAmUser.username : 'User'}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row centered>
          {iAmUser ? (
            <Segment basic textAlign="left" style={{ maxWidth: '100%' }}>
              <Label
                basic
                size="big"
                as="a"
                style={{
                  display: 'flex',
                  border: 'none',
                  marginRight: 0,
                  marginLeft: 0,
                }}
              >
                <Icon name="phone square" size="large" />
                <sapn style={{ alignSelf: 'center' }}>
                  {iAmUser.profile.phoneNumber}
                </sapn>
              </Label>
              <Label
                size="big"
                as="a"
                basic
                style={{
                  display: 'flex',
                  wordBreak: 'break-all',
                  border: 'none',
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                <Icon name="mail square" size="large" />
                <span style={{ alignSelf: 'center' }}>
                  AAAAAAAAAA@nannana
                  {iAmUser.emails[0].address + _.times(80, () => 'a')}
                </span>
              </Label>
            </Segment>
          ) : (
            <Link to="/signin">
              <Header textAlign="center" inverted color="purple">
                '로그인 하세요~~'
              </Header>
            </Link>
          )}
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default UserInfo;

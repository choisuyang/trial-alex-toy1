import React, { useEffect, useState } from 'react';
import './UserInfo.scss';
import { Grid, Image, Header, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

function UserInfo({ check }) {
  // console.log('UserINfo', check);

  const iAmUser = Meteor.user();

  // console.log('설마 너 유저냐', iAmUser);

  return (
    <Segment>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBqjiOjl_gzPDbUiIJwuJJHa6sx8EdjgLDy5GzB8e2nXf5JAhw"
              size="tiny"
              circular
              centered
            />
            <Header as="h2" textAlign="center">
              {iAmUser && iAmUser.username}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {iAmUser ? (
              <div>
                <Header as="h5">
                  <Icon name="phone" />
                  {iAmUser.profile.phoneNumber}
                </Header>
                <Header centered as="h5">
                  <Icon name="mail" />
                  {iAmUser.emails[0].address}
                </Header>
              </div>
            ) : (
              <Link to="/signin">
                <Header textAlign="center" inverted color="purple">
                  '로그인 하세요~~'
                </Header>
              </Link>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default UserInfo;

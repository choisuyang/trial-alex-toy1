import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Header, Grid } from 'semantic-ui-react';
import './HeaderBar.scss';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

function HeaderBar({ currentUser }) {
  // const [checkState, setCheckState] = useState('');

  const user = Meteor.user();

  // useEffect(() => {
  //   console.log('hi');
  //   console.log('이팩트 유저', user);
  //   if (user) {
  //     setCheckState(user.username);
  //   }
  // });

  // console.log('첵첵 스테이트', checkState);
  // console.log('현재 유저', user);

  // NOTE  현재유저
  // console.log('Current', currentUser);

  // console.log('User', Meteor.user().username);
  // console.log(
  //   'Current',
  // currentUser.map(item => console.log(item.currentUser)),
  // );

  return (
    <div className="titleContainer">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {user ? (
              <div>
                <Link to="/postpage">
                  <Button inverted color="purple">
                    Blog Write
                  </Button>
                </Link>
                <Button inverted color="pink">
                  Favorite
                </Button>
              </div>
            ) : (
              ''
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div>
        <Grid centered>
          <Link to="/">
            <Header as="h1" inverted textAlign="center">
              [Alex] Smart Link
            </Header>
          </Link>
        </Grid>
      </div>
      {/* <div>
        {checkuser.username !== '' ? (
          <Link to="/signin">
            <Button>Sign IN</Button>
          </Link>
        ) : (
          'hi'
        )}
      </div> */}
      {user ? (
        ''
      ) : (
        <div>
          <Link to="/signin">
            <Button inverted color="orange">
              Sign IN
            </Button>
          </Link>
          <Link to="/signup">
            <Button inverted color="red">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
      {user ? (
        <div>
          <Dropdown text={currentUser ? `${currentUser.username}` : 'User'}>
            <Dropdown.Menu>
              <Dropdown.Item text="LOGOUT" onClick={() => Meteor.logout()} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  return {
    currentUser: Meteor.user(),
  };
})(HeaderBar);

// export default HeaderBar;

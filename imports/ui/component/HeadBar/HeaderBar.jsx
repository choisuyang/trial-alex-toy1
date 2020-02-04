import React from 'react';
import { Button, Dropdown, Header } from 'semantic-ui-react';
import './HeaderBar.scss';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

function HeaderBar({ currentUser }) {
  // NOTE  현재유저
  // console.log('Current', currentUser);

  // console.log('User', Meteor.user().username);
  // console.log(
  //   'Current',
  // currentUser.map(item => console.log(item.currentUser)),
  // );

  return (
    <div className="titleContainer">
      <div>
        <Link to="/postpage">
          <Button inverted color="purple">
            Blog Write
          </Button>
        </Link>
        <Button inverted color="pink">
          Favorit
        </Button>
      </div>
      <div>
        <Link to="/">
          <Header as="h1" inverted>
            [Alex] Smart Link
          </Header>
        </Link>
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
        <Dropdown text={currentUser ? `${currentUser.username}` : 'User'}>
          <Dropdown.Menu>
            <Dropdown.Item text="LOGOUT" />
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}
      {/* <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as="h1" color="grey" className="titleName">
              <Link to="/">
                <label>[Alex] Smart Link</label>
              </Link>
            </Header>
          </Grid.Column>
          <Grid.Column floated="right" verticalAlign="middle" textAlign="right">
            <Link to="/signin">
              <Button>Sign IN</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
    </div>
  );
}

export default withTracker(() => {
  Meteor.subscribe('post');
  return {
    currentUser: Meteor.user(),
  };
})(HeaderBar);

// export default HeaderBar;

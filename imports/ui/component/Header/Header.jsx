import React from 'react';
import { Dropdown, Container, Menu, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// Header bar
const Header = props => {
  // TODO : Get currentUser from props
  const user = Meteor.user();
  const { currentUser } = props;

  const LeftMenuItems = user ? LeftButtons : Empty;
  const RightMenuItems = user ? UserMenu : SignButtons;

  return (
    <Container>
      <Divider hidden />
      <Menu style={{ height: '60px' }}>
        <Menu.Item name="alex">[Alex] Toy</Menu.Item>
        <LeftMenuItems />
        <Menu.Menu position="right">
          <RightMenuItems currentUser={currentUser} />
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

// Left buttons
const LeftButtons = props => {
  return (
    <>
      {/* <Link to="/postpage"> */}
      <Menu.Item onClick={() => {}}>Blog Write</Menu.Item>
      {/* </Link> */}
      <Menu.Item>Favorite</Menu.Item>
    </>
  );
};

// Sign buttons
const SignButtons = props => {
  return (
    <>
      <Link to="/signin">
        <Menu.Item inverted color="orange">
          Sign In
        </Menu.Item>
      </Link>
      <Link to="/signup">
        <Menu.Item inverted color="red">
          Sign Up
        </Menu.Item>
      </Link>
    </>
  );
};

// User menu
const UserMenu = props => {
  const { currentUser } = props;
  return (
    <>
      <Menu.Item>
        <Dropdown text={currentUser ? `${currentUser.username}` : 'User'}>
          <Dropdown.Menu>
            <Dropdown.Item text="LOGOUT" onClick={() => Meteor.logout()} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
};

// Empty
const Empty = props => {
  return <></>;
};

export default withTracker(() => {
  Meteor.subscribe('posts');
  return {
    currentUser: Meteor.user(),
  };
})(Header);

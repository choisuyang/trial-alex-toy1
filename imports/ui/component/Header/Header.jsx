import React from 'react';
import { Dropdown, Container, Menu, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// header bar
const Header = props => {
  const user = Meteor.user();
  const { currentUser } = props;

  const LeftMenuItems = user ? LeftButtons : Empty;
  const RightMenuItems = user ? UserMenu : SignButtons;

  return (
    <Container>
      <Divider hidden />
      <Menu>
        <Menu.Item>[Alex] Toy</Menu.Item>
        <LeftMenuItems />
        <Menu.Menu position="right">
          <RightMenuItems currentUser={currentUser} />
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

// let buttons
const LeftButtons = props => {
  return (
    <>
      <Link to="/postpage">
        <Menu.Item>Blog Write</Menu.Item>
      </Link>
      <Menu.Item>Favorite</Menu.Item>
    </>
  );
};

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

const Empty = props => {
  return <></>;
};

export default withTracker(() => {
  Meteor.subscribe('posts');
  return {
    currentUser: Meteor.user(),
  };
})(Header);

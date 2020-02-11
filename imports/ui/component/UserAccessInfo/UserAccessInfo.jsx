import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import {
  Grid,
  Segment,
  Header,
  Search,
  List,
  Image,
  GridColumn,
  Dropdown,
  Input,
  Divider,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';

const UserAccessInfo = props => {
  const { currentUser, users } = props;
  const testUsers = [];
  _.times(80, () => {
    _.each(users, u => {
      testUsers.push(u);
    });
  });

  return (
    <Segment
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SearchInput />
      <Divider hidden />
      <UserList users={testUsers} />
    </Segment>
  );
};

const SearchInput = props => {
  return <Input icon="search" placeholder="Search..." />;
};

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      listHeight: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO : Delete setTimeout
    setTimeout(() => {
      const newListHeight = this.listRef.current.clientHeight;
      if (this.state.listHeight !== newListHeight) {
        this.setState({ listHeight: newListHeight });
      }
    }, 1000);
  }

  render() {
    const { users } = this.props;
    const { listHeight } = this.state;
    return (
      <div
        ref={this.listRef}
        style={{
          height: '100%',
        }}
      >
        <div
          style={{
            height: listHeight,
            overflowY: 'scroll',
          }}
        >
          <List animated verticalAlign="middle">
            {_.map(users, (user, index) => (
              <UserListItem user={user} key={index} />
            ))}
          </List>
        </div>
      </div>
    );
  }
}

const UserListItem = props => {
  const { user, key } = props;
  return (
    <List.Item key={key}>
      <Image
        avatar
        src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
      />
      <List.Content>
        <List.Header>{user.username}</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default withTracker(() => {
  Meteor.subscribe('users');
  return {
    users: Meteor.users.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(UserAccessInfo);

import React, { useState, useEffect } from 'react';
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
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import './SearchItem.scss';

function SearchBar({ users }) {
  const userData = _.map(users, (state, index) => ({
    key: state._id,
    text: state.username,
  }));

  const [searchQuery, setSearchQuery] = useState('');
  console.log('ㅅㅓ치쿼리', searchQuery);

  const onChangeHandler = (e, { searchQuery, value }) => {
    setSearchQuery(searchQuery);
    console.log('검색 쿼리', searchQuery);
    console.log('검색 값', value);
    console.log('타겟', e.target.value);
  };

  const onSearchChangeHandler = (e, { searchQuery }) => {
    setSearchQuery(searchQuery);
  };

  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Dropdown
              fluid
              multiple
              onChange={onChangeHandler}
              onSearchChange={onSearchChangeHandler}
              options={userData}
              placeholder="검색하세요"
              searchQuery={searchQuery}
              selection
              search
              value={searchQuery}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <div className="searchItem">
              {_.map(users, (item, index) => (
                <List animated verticalAlign="middle" key={index}>
                  <List.Item>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
                    />
                    <List.Content>
                      <List.Header>
                        {searchQuery === item.username
                          ? searchQuery
                          : item.username}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              ))}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
export default withTracker(() => {
  Meteor.subscribe('users');
  return {
    users: Meteor.users.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(SearchBar);

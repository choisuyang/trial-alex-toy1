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
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import './SearchItem.scss';

const SearchBar = props => {
  const listRef = useRef();
  const { users } = props;
  const testUsers = [];
  _.times(80, () => {
    _.each(users, u => {
      testUsers.push(u);
    });
  });
  const [listHeight, setListHeight] = useState(0);
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

  useEffect(() => {
    console.log('========================>1111', listRef);
    console.log(
      '---------------------------->22222',
      listRef.current.getBoundingClientRect().height,
    );
    console.log('---------------------------------->33333', listHeight);
    // TODO : Delete setTimeout
    setTimeout(() => {
      setListHeight(listRef.current.clientHeight);
    }, 500);
  }, [listHeight]);

  return (
    <Segment
      style={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'stretch',
      }}
    >
      <div>
        Search
        <Input />
      </div>

      <div
        ref={listRef}
        style={{
          // display: 'flex',
          // flexDirection: 'column',
          // flexGrow: 1,
          alignSelf: 'stretch',
          backgroundColor: 'red',
          height: '100%',
        }}
      >
        <div
          style={{
            height: listHeight,
            backgroundColor: 'grey',
            overflow: 'scroll',
          }}
        >
          <UserList users={testUsers} />
        </div>

        {/* <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
            <UserList users={testUsers} />
          </div>
        </div>

        <div style={{ backgroundColor: 'green', height: '100%' }}>hi</div> */}
      </div>
    </Segment>
  );
};

const UserList = props => {
  const { users } = props;
  return (
    <>
      {_.map(users, (item, index) => (
        <List animated verticalAlign="middle" key={index}>
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
            />
            <List.Content>
              <List.Header>
                {item.username}
                {/* {searchQuery === item.username ? searchQuery : item.username} */}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      ))}
    </>
  );
};

export default withTracker(() => {
  Meteor.subscribe('users');
  return {
    users: Meteor.users.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(SearchBar);

// const BKUP__OLD = (
//   <Grid>
//     <Grid.Row>
//       <Grid.Column width={16}>
//         <Dropdown
//           fluid
//           multiple
//           onChange={onChangeHandler}
//           onSearchChange={onSearchChangeHandler}
//           options={userData}
//           placeholder="검색하세요"
//           searchQuery={searchQuery}
//           selection
//           search
//           value={searchQuery}
//         />
//       </Grid.Column>
//     </Grid.Row>
//     <Grid.Row>
//       <Grid.Column width={16}>
//         <div
//           style={{
//             display: 'flex',
//             backgroundColor: 'red',
//             height: '100%',
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'green',
//               alignSelf: 'stretch',
//             }}
//           >
//             hi
//           </div>
//         </div>
//         {/* <div className="searchItem">
//         {_.map(testUsers, (item, index) => (
//           <List animated verticalAlign="middle" key={index}>
//             <List.Item>
//               <Image
//                 avatar
//                 src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
//               />
//               <List.Content>
//                 <List.Header>
//                   {searchQuery === item.username
//                     ? searchQuery
//                     : item.username}
//                 </List.Header>
//               </List.Content>
//             </List.Item>
//           </List>
//         ))}
//       </div> */}
//       </Grid.Column>
//     </Grid.Row>
//   </Grid>
// );

import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
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
} from 'semantic-ui-react'
import { withTracker } from 'meteor/react-meteor-data'




# export default UserAccessInfo = (props) =>
# 	{ currentUser = {}, users = [] } = props
# 	testUsers = []
# 	_.times 80, () => _.each users, (u) => testUsers.push u

#   <Segment style={{display: 'flex', flexDirection: 'column'}}>
#     <SearchInput />
#     <Divider hidden />
#     <UserList users={testUsers} />
#   </Segment>



SearchInput = (props) =>
	<Input icon="search" placeholder="Search..." />



class UserList extends React.Component
	constructor: (props) ->
		super props
		@listRef = React.createRef()
		@state =
			listHeight: 0
  
  componentDidUpdate: (prevProps, prevState) => 
    setTimeout( =>
      newListHeight = @listRef.current.clientHeight
      if @state.listHeight isnt newListHeight
        @setState 
          listHeight: newListHeight
    , 1000
    )
		# TODO : Remove setTimeout
		# setTimeout( =>
    #   newListHeight = @listRef.current.clientHeight
		# 	if @state.listHeight isnt newListHeight
    #     @setState 
    #       listHeight: newListHeight
    #   return
    # ), 1000
    
	
	render: =>
		{ users } = @props
		{ listHeight } = @state

    <div ref={@listRef} style={{ height: '100%' }}>
      <div style={{height: listHeight, overflowY: 'scroll'}}>
        <List animated verticalAlign="middle">
          {_.map users, (user, index) =>
            <UserListItem user={user} key={index} />}
        </List>
      </div>
    </div>



UserListItem = (props) =>
	{ user, key } = props;
  <List.Item key={key}>
    <Image
      avatar
      src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
    />
    <List.Content>
      <List.Header>{user.username}</List.Header>
    </List.Content>
  </List.Item>


# export default withTracker () => {
# 	Meteor.subscribe('users');
	
#   {
# 		users: Meteor.users.find({}).fetch(),
# 		currentUser: Meteor.user(),
# 	};
# } UserAccessInfo

import React from 'react'
import {
  Segment,
  Input,
  Button,
  Grid,
  Image,
  Label,
  Popup,
  Form,
  Divider,
} from 'semantic-ui-react'
import { withTracker } from 'meteor/react-meteor-data'
import { Messages } from '../../../api/message'
import _ from 'lodash'
import './MessageRoom.scss' 


# Message Room
MessageRoom = (props) =>
  { messages } = props

  <Segment style={{ display: 'flex', flexDirection: 'column' }}>
    <MessageList messages={ messages } />
    <MessageInput />
  </Segment>


# Message Input
MessageInput = (props) =>
  <div>
    <Input
      className="sendInput"
      placeholder="Type a message"
      maxLength="20"
    />
    <Button type="submit">
      Send
    </Button>
  </div>


# Massage List
class MessageList extends React.Component 
  constructor: (props) ->
    super props
    @listRef = React.createRef()
    @state = listHeight: 0

  componentDidUpdate: (prevProps, prevState) =>
    setTimeout () =>
      newListHeight = @listRef.current.clientHeight
      if @state.listHeight isnt newListHeight
        @setState { listHeight: newListHeight }
    , 1000

  render: () =>
    { messages } = @props
    { listHeight } = @state
    <div ref={ @listRef } style={{ height: '100%' }}>
      <div style={{height: listHeight, overflowY: 'scroll'}}>
        {_.map messages, (message, index) => <MessageListItem message={ message } key={index} />}
      </div>
    </div>


# Message List Item
MessageListItem = (props) =>
  { message, key } = props
  { owner, username, messageContainer, } = message
  isRight = Meteor.userId() is owner
  # console.log("Owner: [#{owner}] vs currentUserId : [#{Meteor.userId()}] ----> ?", isRight)

  <div className="chatRight" key={key}>
    <Label pointing="right" className="chatLabel">
      { username } :{messageContainer.messageValue}
    </Label>
    <Popup
      key="suyang"
      header={
        <Image
          src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
          avatar
        />
      }
    />
  </div>


# export default
export default withTracker(() => 
  Meteor.subscribe 'messages'
  {
    messages: Messages.find().fetch()
    currentUser: Meteor.user()
  }
) MessageRoom

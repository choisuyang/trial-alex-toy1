import React, {useState,useEffect,useRef} from 'react'
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

InsertChatBox = (props) => 
  { messageValue, setMessageValue } = props
  
  # Message OnChangeHandler
  messageOnChangeHaler = (e) => 
    { value } = e.target
    setMessageValue(value)

  # Message OnClick
  messageOnClick = (e) => 
    e.preventDefault()

    messageContainer = { messageValue }

    Meteor.call 'messages.insert', messageContainer, (err) => 
      if err 
        console.log('메세지 작성 안됨 : ', err)
      else 
        setMessageValue('')
        console.log('메세지가 작성 되었습니다.')
    
  <div>
    <Input
      onChange={messageOnChangeHaler}
      value={messageValue}
      className="sendInput"
      placeholder="입력하세요"
      maxLength="20"
    />
    <Button type="submit" onClick={messageOnClick}>
      보내기
    </Button>
  </div>

MessageListItem = (props) => 
  { currentUser, messages, listRef, listHeight } = props

  <div ref={listRef} style={{height: '100%'}}>
    <div style={{ overflowY: 'scroll', height: listHeight }}>
      {currentUser and messages.map (item, index) => 
        if currentUser._id is item.owner 
          <div className="chatRight" key={index}>
            <Label pointing="right" className="chatLabel">
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
        else 
          <div key={index}>
            <Popup
              key="suyang"
              header={item.username}
              trigger={
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                  avatar
                />
              }
            />
            <Label pointing="left">
            </Label>
          </div>
      }
    </div>
  </div>

# MessageRoom
MessageRoom = (props) => 
  { messages } = props
  [messageValue, setMessageValue] = useState('')
  [listHeight, setListHeight] = useState(0)

  currentUser = Meteor.user()
  listRef = useRef()

  useEffect () =>
    setTimeout () => 
      setListHeight(listRef.current?.clientHeight)
    , 1000
  , [listHeight]

  <Segment style={{ display: 'flex', flexDirection: 'column' }}>
    <MessageListItem
      messages = {messages}
      currentUser = {currentUser}
      listRef = {listRef}
      listHeight = {listHeight}
    />
    <Divider hidden />
    <InsertChatBox
      messageValue={messageValue}
      setMessageValue={setMessageValue}
    />
  </Segment>

      
export default withTracker(() => 
  Meteor.subscribe 'messages'

  {
    messages: Messages.find().fetch()
    currentUser: Meteor.user()
  }
) MessageRoom

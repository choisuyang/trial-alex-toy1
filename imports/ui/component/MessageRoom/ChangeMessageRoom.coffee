

import React, { useState, useEffect, useRef } from 'react';
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
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../../api/message';
import _ from 'lodash';
import './MessageRoom.scss';

// MessageRoom
const MessageRoom = props => {
  const { messages } = props;
  const [messageValue, setMessageValue] = useState('');
  const [listHight, setListHight] = useState(0);

  const currentUser = Meteor.user();
  const listRef = useRef();

  // useEffect
  useEffect(() => {
    setTimeout(() => {
      console.log('===========> hi : ', listRef.current.offsetTop);
      setListHight(listRef.current.clientHeight);
    }, 1000);
  }, [listHight]);

  return (
    <Segment style={{ display: 'flex', flexDirection: 'column' }}>
      <MessageListItem
        messages={messages}
        currentUser={currentUser}
        listRef={listRef}
        listHight={listHight}
      />
      <Divider hidden />
      <InsertChatBox
        messageValue={messageValue}
        setMessageValue={setMessageValue}
      />
    </Segment>
  );
};

// MessageListItem
const MessageListItem = props => {
  const { currentUser, messages, listRef, listHight } = props;
  return (
    <div ref={listRef} style={{ height: '100%' }}>
      <div style={{ overflowY: 'scroll', height: listHight }}>
        {currentUser &&
          messages.map((item, index) => {
            return currentUser._id === item.owner ? (
              <div className="chatRight" key={index}>
                <Label pointing="right" className="chatLabel">
                  {item.username} :{item.messageContainer.messageValue}
                </Label>
                <Popup
                  key="suyang"
                  header={item.username}
                  trigger={
                    <Image
                      src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
                      avatar
                    />
                  }
                />
              </div>
            ) : (
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
                  {item.username} :{item.messageContainer.messageValue}
                </Label>
              </div>
            );
          })}
      </div>
    </div>
  );
};

// InsertChatBox
const InsertChatBox = props => {
  const { messageValue, setMessageValue } = props;

  // Message OnChange Handler
  const messageOnChangeHandler = e => {
    const { value } = e.target;
    setMessageValue(value);
  };

  // Message OnClick
  const messsageOnClick = e => {
    e.preventDefault();

    const messageContainer = {
      messageValue,
    };

    // Meteor call Insert
    Meteor.call('messages.insert', messageContainer, err => {
      if (err) {
        console.log('메세지 작성 안됨', err);
      } else {
        setMessageValue('');
        console.log('메세지가 작성 되었습니다.');
      }
    });
  };
  return (
    <div>
      <Input
        onChange={messageOnChangeHandler}
        value={messageValue}
        className="sendInput"
        placeholder="입력 하소"
        maxLength="20"
      />
      <Button tyep="submit" onClick={messsageOnClick}>
        보내기
      </Button>
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('messages');
  return {
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(MessageRoom);

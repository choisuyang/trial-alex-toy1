import React, { useState, useEffect } from 'react';
import {
  Segment,
  Input,
  Button,
  Grid,
  Image,
  Label,
  Popup,
  Form,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../../api/message';
import _ from 'lodash';
import './Chatting.scss';

function Chatting({ messages }) {
  const [messageValue, setMessageValue] = useState('');
  // const [checkId, setCheckId] = useState('');

  const messageID = Meteor.user();
  // console.log('체크 아이디 : ', checkId ? checkId._id : '');
  console.log('messageID', messageID);
  console.log('[Message Value] :', messageValue);
  console.log('[ Subscribe 온거 ] :', messages);

  const messageOnChangeHandler = e => {
    const { value } = e.target;
    setMessageValue(value);
  };

  const messsageOnClick = e => {
    e.preventDefault();

    const messageContainer = {
      messageValue,
    };

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
    <Segment>
      <Grid>
        <div className="chattingContainer">
          <Grid.Row>
            <Grid.Column width={16}>
              {messageID
                ? messages.map((item, index) => {
                    // console.log('맵 안에', messageID._id === item.owner);
                    // console.log('맵 안에 ----------------', item);
                    return (
                      messageID._id !== item.owner && (
                        <div key={index}>
                          <Popup
                            // content="heelo"
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
                            {item.username} :
                            {item.messageContainer.messageValue}
                          </Label>
                        </div>
                      )
                    );
                    // console.log('맵안에', item);
                  })
                : ''}
              {/* </div> */}
            </Grid.Column>
          </Grid.Row>

          {/* 밑에 자신 */}
          <Grid.Row>
            {/* <Grid.Column floated="right"> */}
            <br />
            {/* <div> */}
            {messageID
              ? messages.map((item, index) => {
                  // console.log('맵 안에', messageID._id === item.owner);
                  // console.log('맵 안에 ----------------', item);
                  return (
                    messageID._id === item.owner && (
                      // < key={index}>
                      <Grid.Column textAlign="right" className="chatRight">
                        <div>
                          <Label pointing="right" className="chatLabel">
                            {item.username} :
                            {item.messageContainer.messageValue}
                          </Label>
                          <Popup
                            // content="heelo"
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
                      </Grid.Column>
                    )
                  );
                  // console.log('맵안에', item);
                })
              : ''}
            {/* </div> */}
            {/* </Grid.Column> */}
          </Grid.Row>
        </div>
        <Grid.Row>
          <Grid.Column>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default withTracker(() => {
  //isReady =
  Meteor.subscribe('messages');
  return {
    //isReady: isReady
    messages: Messages.find({}).fetch() || [],
    currentUser: Meteor.user() || [],
  };
})(Chatting);

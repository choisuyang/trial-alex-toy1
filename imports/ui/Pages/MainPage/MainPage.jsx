import React, { useState, useEffect, useContext } from 'react';
import './MainPage.scss';
import _ from 'lodash';

import UserInfo from '../../component/UserInfo/UserInfo';
import Chatting from '../../component/Chatting/Chatting';
import UserAccessInfo from '../../component/UserAccessInfo/UserAccessInfo';

import { Link } from 'react-router-dom';
import { Posts } from '../../../api/posts';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Image, Card, Icon, Container } from 'semantic-ui-react';
import { Comments } from '../../../api/comment';

function MainPage({ posts, currentUser, comments }) {
  const [userCount, setUserCount] = useState(0);
  // const [checkUser, setCheckUser] = useState('');
  // console.log('체크 유저', checkUser);

  // console.log('현재유저', currentUser);
  // console.log('상세 유저', currentUser && currentUser.username);

  // console.log('메인에 포스트 :', posts);
  // console.log('메인에서 댓글', comments);

  // const userCountFunction = _.map(comments, (state, index) => {
  // state.commentValue.postId === _.id ? setUserCount(userCount + 1) : 0;

  // console.log('스테이트값', state);
  // });

  return (
    <Container>
      <Grid divided="vertically">
        <Grid.Row columns={3} stretched>
          <Grid.Column>
            <UserAccessInfo />
          </Grid.Column>
          <Grid.Column>
            <UserInfo check={currentUser && currentUser.username} />
          </Grid.Column>
          <Grid.Column>
            <Chatting />
          </Grid.Column>
        </Grid.Row>

        <Card.Group itemsPerRow={4}>
          {posts.map(item => {
            const { _id, insertValue } = item;
            // console.log('ddddddddddddddddddd', insertValue);
            return (
              // 페이지 이동해야함
              // _id 값을 props 전달
              // 페이지에서 pub/sub으로 해당 _id 페이지 불러옴

              <Link to={`/postitem/${_id}`} key={_id}>
                <Card onClick={() => console.log('클릭한 게시물', _id)}>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>{insertValue.title}</Card.Header>

                    <Card.Description>
                      {insertValue.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="heart" />
                    2020
                    <Icon name="comment" className="mainIcon" />
                    {userCount}
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </Card.Group>
      </Grid>
    </Container>
  );
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('comments');

  return {
    comments: Comments.find({}).fetch(),
    posts: Posts.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(MainPage);

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../../api/posts';
import { withTracker } from 'meteor/react-meteor-data';
import './MainPage.scss';
import UserInfo from '../../component/UserInfo/UserInfo';
import Chatting from '../../component/Chatting/Chatting';
import Search from '../../component/Search/Search';
import { Grid, Image, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MainPage({ posts, currentUser }) {
  return (
    <div className="mainPageContainer">
      <Grid divided="vertically">
        <Grid.Row columns={3}>
          <Grid.Column>
            <Search />
          </Grid.Column>
          <Grid.Column>
            <UserInfo />
          </Grid.Column>
          <Grid.Column>
            <Chatting />
          </Grid.Column>
        </Grid.Row>

        <Card.Group itemsPerRow={4}>
          {posts.map(item => {
            const { _id, insertValue } = item;
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
                    0202
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </Card.Group>
      </Grid>
    </div>
  );
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  return {
    posts: Posts.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(MainPage);
// NOTE  단수복수

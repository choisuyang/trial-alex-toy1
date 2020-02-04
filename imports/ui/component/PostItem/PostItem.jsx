import React, { useEffect } from 'react';
import './PostItem.scss';

import { Meteor } from 'meteor/meteor';
import { Post } from '../../../api/post';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Image, Header, Comment, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function PostItem({ post, currentUser, name, match }) {
  // 클릭된 값을 가져와서 서버에 기존 아이디와 일치한것에 데이터를 뿌려준다.
  // map 으로 하나하나 값을 찾는다.
  // match 해온 값과 일치 한지 본다.

  console.log('Post', post[0]);
  // console.log('MATCH', match.params);

  console.log('MATCH', match.params._id);

  return (
    <div className="postItemContainer">
      <Grid>
        <Grid.Row>
          {post.map(
            (item, index) =>
              match.params._id === item._id && (
                <Grid.Column width={8} key={index}>
                  <Header as="h2" textAlign="center">
                    <Header.Content>
                      {item.insertValue.title}
                      <Header.Subheader>
                        <br />
                        {item.insertValue.description}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                  <Image
                    src="https://i.picsum.photos/id/1011/5472/3648.jpg"
                    size="medium"
                    centered
                  />
                  <br />
                  <p>{item.insertValue.textArea}</p>

                  <Grid centered>
                    <Grid.Row floated="right">
                      <Link to={`/setpostpage/${item._id}`} key={item._id}>
                        <Button
                          onClick={() => console.log('HHHHHHIIIIII')}
                          inverted
                          color="blue"
                        >
                          Post Edit
                        </Button>
                      </Link>
                    </Grid.Row>
                    <Grid.Row>
                      {/* <Grid.Column> */}
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-TZqQC4X9p9Bjzmm9UZlhIw8Pix5MX4CYK5wZQUecZWzjDoHH&s"
                        circular
                        avatar
                        size="tiny"
                      />
                    </Grid.Row>
                    <Grid.Row>
                      <Header as="h2" textAlign="center">
                        <Header.Content>
                          {item.username}
                          <Header.Subheader>
                            <br />
                            Manners makes man
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Grid.Row>

                    {/* </Grid.Column> */}
                  </Grid>
                </Grid.Column>
              ),
          )}

          {/* 오른쪽 페이지 */}
          <Grid.Column width={8}>
            <div className="commentContainer">
              <Header as="h5" inverted color="blue">
                Comment
              </Header>
              <Form reply>
                <Form.TextArea />
                <Button
                  inverted
                  color="blue"
                  content="Add Comment"
                  // labelPosition="right"
                  icon="edit"
                  // primary
                />
              </Form>

              <Comment.Group>
                <Comment>
                  <Comment.Avatar
                    as="a"
                    src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                  />
                  <Comment.Content>
                    <Comment.Author>Joe Henderson</Comment.Author>
                    <Comment.Metadata>
                      <div>1 day ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <p>
                        The hours, minutes and seconds stand as visible
                        reminders that your effort put them all there.
                      </p>
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Comment>
                  <Comment.Avatar
                    as="a"
                    src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
                  />
                  <Comment.Content>
                    <Comment.Author>Christian Rocha</Comment.Author>
                    <Comment.Metadata>
                      <div>2 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>I re-tweeted this.</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

// export default PostItem;

export default withTracker(() => {
  Meteor.subscribe('post');
  return {
    post: Post.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(PostItem);

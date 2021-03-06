import React, { useState } from 'react';
import './PostItem.scss';

import { Meteor } from 'meteor/meteor';
import { Posts } from '../../../api/posts';
import { Like } from '../../../api/like';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Image, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import WriteComment from '../Comment/WriteComment';

function PostItem({ posts, match }) {
  // 클릭된 값을 가져와서 서버에 기존 아이디와 일치한것에 데이터를 뿌려준다.
  // map 으로 하나하나 값을 찾는다.
  // match 해온 값과 일치 한지 본다.
  const [toggle, setToggle] = useState(false);

  // console.log('Post', post[0]);
  // console.log('MATCH', match.params);
  const currentUser = Meteor.user();
  console.log('현재 유저 : ', currentUser ? currentUser._id : '');
  console.log('작성자 아이디 : ', posts ? posts.map(item => item) : '');

  console.log('MATCH', match.params._id);

  const onClickHandler = e => {
    e.preventDefault();

    console.log('hi');
    setToggle(!toggle);

    const toggleLike = {
      toggle,
    };
    console.log('ONclick', toggleLike);

    Meteor.call('like.check', toggleLike, err => {
      if (err) {
        console.log('좋아요 안됨', err);
      } else {
        console.log('좋아요가 됨.');

        alert('좋아요가 등록됨.');
      }
    });
  };
  console.log('ChageBUtton : ', toggle);

  return (
    <div className="postItemContainer">
      <Grid>
        <Grid.Row>
          {posts.map(
            (item, index) =>
              match.params._id === item._id && (
                <Grid.Column width={8} key={index}>
                  <Icon
                    onClick={onClickHandler}
                    color={toggle ? 'red' : 'black'}
                    size="huge"
                    name="like"
                  />

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
                        {item.owner === currentUser._id && (
                          <Button
                            onClick={() => console.log('HHHHHHIIIIII')}
                            inverted
                            color="blue"
                          >
                            Post Edit
                          </Button>
                        )}
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
          <WriteComment checkID={match.params._id} />
        </Grid.Row>
      </Grid>
    </div>
  );
}

// export default PostItem;

export default withTracker(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('like');
  return {
    like: Like.find({}).fetch(),
    posts: Posts.find({}).fetch() || [],
    currentUser: Meteor.user(),
  };
})(PostItem);

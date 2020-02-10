import React, { useState, useEffect } from 'react';
import { Form, Grid, Button, Message, Label } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../../api/posts';
import moment from 'moment';

function SetPostPage({ history, posts, match }) {
  const [text, setText] = useState({
    title: '',
    description: '',
    textArea: '',
  });
  const [matchId, setMatchId] = useState('');
  console.log('수정 페이지', matchId);

  const { title, description, textArea } = text;

  console.log('타이틀이다', title);

  const onChangeContainer = e => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  // const PostItem = Posts.map(item => {
  //   return item._id === match.params._id;
  // });

  //   console.log(
  //     'SEETTTPOST',
  //     post.map(item => console.log(item.insertValue.title)),
  //   );

  useEffect(() => {
    if (posts) {
      posts.map(item => {
        match.params._id === item._id
          ? // const { title, description, textArea } = item.insertValue;
            // console.log('이펙트 안', title);
            setText({
              ...text,
              title: item.insertValue.title,
              description: item.insertValue.description,
              textArea: item.insertValue.textArea,
            })
          : 'undefined';
      });
    }
  }, [posts]);

  useEffect(() => {
    if (match) {
      setMatchId(match.params._id);
    }
  }, [match]);

  console.log('MATCH PARAMS', match.params._id);

  const SetPostInsertHandler = e => {
    e.preventDefault();

    console.log('버튼');
    // console.log('출력', PostItem);

    const editValue = {
      title,
      description,
      textArea,
      matchId,
    };
    console.log('수정된 값', editValue);

    Meteor.call('posts.edit', editValue, err => {
      if (err) {
        console.log('포스트 수정 안됨', err);
      } else {
        console.log('포스트가 수정 되었습니다..');
        alert('포스트가 수정 되었습니다.');
        history.push('/');
      }
    });
  };

  const PostButtonValidation =
    title.length > 1 && description.length > 1 && textArea.length > 1;

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <Form>
            <br />
            <Form.Input
              onChange={onChangeContainer}
              name="title"
              value={title}
              label="Title"
              // placeholder={`${item.insertValue.title}`}
            />

            <br />
            <Form.Input
              name="description"
              onChange={onChangeContainer}
              value={description}
              label="Description"
              // placeholder={`${item.insertValue.description}`}
            />
            <br />
            <Form.Input label="Image" placeholder="Put Your Image" />
            <br />
            <Button>UPLOAD</Button>
            <Form.TextArea
              onChange={onChangeContainer}
              name="textArea"
              value={textArea}
              label="About"
              // placeholder={`${item.insertValue.textArea}`}
            />
          </Form>
          <br />
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={5}>
                <Link to="/">
                  <Button>Cancel</Button>
                </Link>

                <Button
                  className="okButton"
                  disabled={!PostButtonValidation}
                  type="submit"
                  onClick={SetPostInsertHandler}
                >
                  SAVE
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        {/* {posts.map(
          (item, index) =>
            match.params._id === item._id && (
              <Grid.Column width={10} key={index}>
                <Form>
                  <br />
                  <Form.Input
                    onChange={onChangeContainer}
                    name="title"
                    value={title}
                    label="Title"
                    placeholder={`${item.insertValue.title}`}
                  />

                  <br />
                  <Form.Input
                    name="description"
                    onChange={onChangeContainer}
                    value={description}
                    label="Description"
                    placeholder={`${item.insertValue.description}`}
                  />
                  <br />
                  <Form.Input label="Image" placeholder="Put Your Image" />
                  <br />
                  <Button>UPLOAD</Button>
                  <Form.TextArea
                    onChange={onChangeContainer}
                    name="textArea"
                    value={textArea}
                    label="About"
                    placeholder={`${item.insertValue.textArea}`}
                  />
                </Form>
                <br />
                <Grid>
                  <Grid.Row centered>
                    <Grid.Column width={5}>
                      <Link to="/">
                        <Button>Cancel</Button>
                      </Link>

                      <Button
                        className="okButton"
                        disabled={!PostButtonValidation}
                        type="submit"
                        onClick={SetPostInsertHandler}
                      >
                        SAVE
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            ),
        )} */}
      </Grid.Row>
    </Grid>
  );
}

// export default SetPostPage;

export default withTracker(() => {
  Meteor.subscribe('posts');
  return {
    posts: Posts.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(SetPostPage);

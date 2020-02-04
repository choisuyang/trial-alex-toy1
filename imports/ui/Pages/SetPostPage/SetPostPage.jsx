import React, { useState, useEffect } from 'react';
import { Form, Grid, Button, Message, Label } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Post } from '../../../api/post';
import { withTracker } from 'meteor/react-meteor-data';

function SetPostPage({ history, post, match }) {
  const [text, setText] = useState({
    title: '',
    description: '',
    textArea: '',
  });

  const { title, description, textArea } = text;

  console.log('타이틀이다', title);

  const onChangeContainer = e => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  //   console.log(
  //     'SEETTTPOST',
  //     post.map(item => console.log(item.insertValue.title)),
  //   );

  console.log('MATCH PARAMS', match.params._id);

  const SetPostInsertHandler = e => {
    e.preventDefault();
    console.log('버튼');

    const insertValue = {
      title,
      description,
      textArea,
    };

    Meteor.call('post.edit', insertValue, err => {
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
        {post.map(
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
        )}
      </Grid.Row>
    </Grid>
  );
}

// export default SetPostPage;

export default withTracker(() => {
  Meteor.subscribe('post');
  return {
    post: Post.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(SetPostPage);

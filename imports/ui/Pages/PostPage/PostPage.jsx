import React, { useState } from 'react';
import { Form, Grid, Button, Message, Label } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

function PostPage({ history }) {
  const [text, setText] = useState({
    title: '',
    description: '',
    textArea: '',
  });

  const { title, description, textArea } = text;

  const onChangeContainer = e => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  const PostInsertHandler = e => {
    e.preventDefault();

    const insertValue = {
      title,
      description,
      textArea,
    };

    Meteor.call('posts.insert', insertValue, err => {
      if (err) {
        console.log('포스트 작성안됨', err);
      } else {
        console.log('포스트가 작성되었습니다.');
        alert('포스트가 작성 되었습니다.');
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
              placeholder="Wirte Your Title"
            />
            <br />
            <Form.Input
              name="description"
              onChange={onChangeContainer}
              value={description}
              label="Description"
              placeholder="Write Your Description"
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
              placeholder="Tell us more about you..."
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
                  onClick={PostInsertHandler}
                >
                  OK
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default PostPage;

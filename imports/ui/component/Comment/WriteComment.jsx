import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Comment,
  Form,
  Header,
  Segment,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Comments } from '../../../api/comment';

function WriteComment({ comments, checkID }) {
  const [formText, setFormText] = useState('');
  const [postId, setPostId] = useState('');
  const [count, setCount] = useState(1);

  // console.log(
  //   'Comments',
  //   comments.map(item => console.log(item)),
  // );

  console.log('WRITE TWO :', checkID);
  console.log('POSTID :', postId);
  console.log('댓글 카운트', count);

  useEffect(() => setPostId(checkID), []);

  const textAreaChangeHandler = e => {
    const { value } = e.target;
    setFormText(value);
    console.log('Typing', value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const commentValue = {
      formText,
      postId,
      count,
    };

    Meteor.call('comments.insert', commentValue, err => {
      if (err) {
        console.log('댓글 작성안됨', err);
      } else {
        console.log('댓글 작성되었습니다.');
        alert('댓글이 작성 되었습니다.');
        setFormText('');
        setCount(count + 1);

        // history.push('/');
      }
    });
  };
  return (
    <Grid.Column width={8}>
      <div className="commentContainer">
        <Header as="h5" inverted color="blue">
          Comment
        </Header>

        <Form reply onSubmit={onSubmit}>
          <Form.TextArea value={formText} onChange={textAreaChangeHandler} />
          <Button
            inverted
            color="blue"
            content="Add Comment"
            type="submit"
            // icon="edit"
            onClick={onSubmit}
            // labelPosition="right"
            // primary
          />
        </Form>

        <Comment.Group>
          {comments.map((item, index) => {
            // const { commentValue, username } = item;
            // console.log('나는 코멘트의 아이템', item.username);
            return (
              item.commentValue.postId === checkID && (
                <Comment key={index}>
                  <Comment.Avatar
                    as="a"
                    src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                  />
                  <Comment.Content>
                    <Comment.Author>{item.username}</Comment.Author>
                    <Comment.Metadata>
                      <div>1 day ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <p>{item.commentValue.formText}</p>
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              )
            );
          })}
        </Comment.Group>
      </div>
    </Grid.Column>
  );
}

// export default WriteComment;
export default withTracker(() => {
  Meteor.subscribe('comments');
  return {
    comments: Comments.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(WriteComment);

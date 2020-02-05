import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  Meteor.publish('posts', function tasksPublication() {
    return Posts.find({
      // $or: [{
      //     owner: this.userId
      // }, ],
    });
  });
  Meteor.publish('setpost', function setPostPublication() {
    return Posts.find({});
  });
}

Meteor.methods({
  'posts.insert'(insertValue) {
    console.log('포스트 작성', insertValue);
    check(insertValue, {
      title: String,
      description: String,
      textArea: String,
    });
    if (!this.userId) {
      throw new Meteor.Error('Posts Insert Error');
    }

    Posts.insert({
      insertValue,
      createAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'posts.edit'(postId, insertValue) {
    console.log('포스트 수정', insertValue);
    check(insertValue, {
      title: String,
      description: String,
      textArea: String,
    });

    if (!this.userId) {
      throw new Meteor.Error('Edit Posts Error');
    }

    Posts.update(postId, {
      $set: {
        insertValue
      }
    });
  },
});
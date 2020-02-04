import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Post = new Mongo.Collection('post');

if (Meteor.isServer) {
  Meteor.publish('post', function tasksPublication() {
    return Post.find({
      // $or: [{
      //     owner: this.userId
      // }, ],
    });
  });
}

Meteor.methods({
  'post.insert'(insertValue) {
    console.log('포스트 작성', insertValue);
    check(insertValue, {
      title: String,
      description: String,
      textArea: String,
    });
    if (!this.userId) {
      throw new Meteor.Error('Post Insert Error');
    }

    Post.insert({
      insertValue,
      createAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'post.edit'(insertValue) {
    console.log('포스트 수정', insertValue);
    check(insertValue, {
      title: String,
      description: String,
      textArea: String,
    });

    if (!this.userId) {
      throw new Meteor.Error('Edit Post Error');
    }

    Post.update({});
  },
});

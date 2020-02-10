import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  Meteor.publish('posts', function tasksPublication() {
    return Posts.find({
      // $or: [{
      //     owner: this.userId
      // }, ],
    });
  });
}

Meteor.methods({
  'posts.insert'(insertValue, likeContainer) {
    console.log('포스트 작성', insertValue);
    check(insertValue, {
      title: String,
      description: String,
      textArea: String,
    });
    check(likeContainer, {
      like: Boolean,
      likeUsers: String,
    });

    if (!this.userId) {
      throw new Meteor.Error('Posts Insert Error');
    }

    Posts.insert({
      insertValue,
      likeContainer,
      createAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'posts.edit'(editValue) {
    console.log('포스트 수정', editValue);
    console.log('포스트 아이디', editValue.matchId);
    check(editValue, {
      title: String,
      description: String,
      textArea: String,
      matchId: String,
    });

    if (!this.userId) {
      throw new Meteor.Error('Edit Posts Error');
    }

    Posts.update(
      {
        _id: editValue.matchId,
      },
      {
        $set: {
          insertValue: {
            title: editValue.title,
            description: editValue.description,
            textArea: editValue.textArea,
          },
        },
      },
    );
  },
});

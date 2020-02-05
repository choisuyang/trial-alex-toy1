import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';


export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
    Meteor.publish('comments', function commentPublication() {
        return Comments.find({});
    });

}

Meteor.methods({
    'comments.insert'(commentValue) {
        console.log('댓글 작성', commentValue);
        check(commentValue, {
            formText: String,
            postId: String
        })
        if (!this.userId) {
            throw new Meteor.Error('Post Insert Error');
        }

        Comments.insert({
            commentValue,
            createAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    }

})
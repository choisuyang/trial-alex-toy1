import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';

export const Like = new Mongo.Collection('like');

if (Meteor.isServer) {
    Meteor.publish('like', function tasksPublication() {
        return Like.find({
            // $or: [{
            //     owner: this.userId
            // }, ],
        });
    });
}

Meteor.methods({
    'like.check'(toggleLike) {
        console.log('좋아요 토글', toggleLike);
        check(toggleLike, {
            toggle: Boolean
        });
        if (!this.userId) {
            throw new Meteor.Error('Posts Insert Error');
        }

        Like.insert({
            toggleLike,
            createAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    }
})
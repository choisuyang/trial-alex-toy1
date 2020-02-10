import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';


export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
    Meteor.publish('messages', function messagesPublication() {
        return Messages.find({});
    });

}

Meteor.methods({
    'messages.insert'(messageContainer) {
        console.log('메세지 작성', messageContainer);
        check(messageContainer, {
            messageValue: String,
        })
        if (!this.userId) {
            throw new Meteor.Error('Post Insert Error');
        }

        Messages.insert({
            messageContainer,
            createAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    }

})
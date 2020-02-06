import {
  Mongo
} from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import {
  Accounts
} from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

// export default new Mongo.Collection('links');
export const Login = new Mongo.Collection('login');

if (Meteor.isServer) {
  // 미티어 서버에 요청
  Meteor.publish('users', function usersPublication() {
    return Meteor.users.find({});
  });
}

Meteor.methods({
  signup(inputuser) {
    console.log('InputUser', inputuser);
    new SimpleSchema({
      //   inputuser: {
      email: {
        type: String
      },
      name: {
        type: String
      },
      password: {
        type: String
      },
      checkPassword: {
        type: String
      },
      phoneNumber: {
        type: String
      },
      //   },
    }).validate(inputuser);

    Accounts.createUser({
      email: inputuser.email,
      username: inputuser.name,
      password: inputuser.password,
      profile: {
        phoneNumber: inputuser.phoneNumber,
        // checkPassword: inputuser.checkPassword,
      },
    });
  },


});
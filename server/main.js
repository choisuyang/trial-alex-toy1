import {
  Meteor
} from 'meteor/meteor';
import '../imports/api/posts'
import '../imports/api/login'
import '../imports/api/comment'
import '../imports/api/message'
import '../imports/api/like'

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
});
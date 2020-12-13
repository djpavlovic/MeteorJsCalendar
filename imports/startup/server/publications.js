import {EventData} from '../../api/eventdata/eventdata.js';
import {Meteor} from 'meteor/meteor';

Meteor.publish('EventData', () => {
  return EventData.find();
});

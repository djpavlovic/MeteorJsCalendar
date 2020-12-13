import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Session} from 'meteor/session';
import {_} from 'meteor/underscore';
import {EventData, EventDataSchema} from '../../api/eventdata/eventdata.js';

Template.editEventModal.helpers({
    currentEvent() {
        return Session.get('currentEvent')
    }
});

Template.editEventModal.events({
    //add your events here
});


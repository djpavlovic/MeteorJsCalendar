import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';


Template.register.helpers({
    //add you helpers here
    loading() {
        return Session.get('loading') ? 'loading' : ''
    }

});

Template.register.events({
    //add your events here
});

Template.register.onCreated(function () {
    //add your statement here
});

Template.register.onRendered(function () {
    //add your statement here
});

Template.register.onDestroyed(function () {
    //add your statement here
});


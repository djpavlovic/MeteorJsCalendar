import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

Template.register.helpers({
    loading() {
        return Session.get('loading') ? 'loading' : ''
    }
});

Template.register.events({
    //$('.ui.dropdown').dropdown('get value')
    //add your events here
});

Template.register.onCreated(function () {
    //add your statement here
});

Template.register.onRendered(function () {
    console.debug('result rendered ::::')
    this.$('.ui.dropdown').dropdown();
});

Template.register.onDestroyed(function () {
    //add your statement here
});


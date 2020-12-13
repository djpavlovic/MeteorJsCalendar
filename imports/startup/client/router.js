import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
    name: 'Calendar_Page',
    action() {
        BlazeLayout.render('App_Layout', {main: 'Calendar_Page'});
    },
});

FlowRouter.route('/register', {
    name: 'register',
    action() {
        BlazeLayout.render('App_Layout', {main: 'register'});
    },
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('App_Layout', {main: 'login'});
    },
});

FlowRouter.route('/lists', {
    name: 'lists',
    action() {
        BlazeLayout.render('App_Layout', {main: 'lists'});
    },
});

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_Layout', {main: 'App_Not_Found'});
    },
};

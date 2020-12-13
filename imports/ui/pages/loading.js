import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

Template.loading.helpers({
    loading() {
        return Session.get('loading') ? 'loading' : ''
    }
});



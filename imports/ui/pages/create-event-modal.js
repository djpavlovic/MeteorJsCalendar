import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Session} from 'meteor/session';
import {_} from 'meteor/underscore';
import {EventData, EventDataSchema} from '../../api/eventdata/eventdata.js';

/* eslint-disable object-shorthand, no-unused-vars, no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';


const minTime = '06:00'
const maxTime = '23:00'
const step = 30

const getRange = () => {
//Data
    let x = {
        slotInterval: step,
        openTime: minTime,
        closeTime: maxTime
    };
//Format the time
    let startTime = moment(x.openTime, "HH:mm");
//Format the end time and the next day to it
    let endTime = moment(x.closeTime, "HH:mm").add(x.slotInterval, 'minutes');
//Times
    let allTimes = [];
//Loop over the times - only pushes time with 30 minutes interval
    while (startTime < endTime) {
        //Push times
        allTimes.push(startTime.format("HH:mm"));
        //Add interval of 30 minutes
        startTime.add(x.slotInterval, 'minutes');
    }
    return allTimes
}

Template.Create_Event_Modal.onCreated(function onCreated() {
    this.messageFlags = new ReactiveDict();
    this.messageFlags.set(displayErrorMessages, false);
    this.context = EventDataSchema.namedContext('Create_Event_Modal');
});

Template.Create_Event_Modal.helpers({
    eventModal() {
        return Session.get('eventModal')
    },
    errorClass() {
        return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
    },
    displayFieldError(fieldName) {
        const errorKeys = Template.instance().context.invalidKeys();
        return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
    },
    getRange() {
        return getRange()
    }
});

// Enable Semantic UI.
Template.Create_Event_Modal.onRendered(function enableSemantic() {
    this.$('.ui.fluid.search.dropdown').dropdown();
});

Template.Create_Event_Modal.events({
    'submit .session-data-form'(event, instance) {
        event.preventDefault();
        let newEvent = Session.get('eventModal');

        // Get the title of the event.
        const title = event.target.title.value;

        // Get the start date/time and format it to ISO 8601
        const f = document.getElementById(event.target.start.id);
        let start = `${newEvent.date}T${f.options[f.selectedIndex].value}-10:00`;
        if (f.options[f.selectedIndex].value === 'Select a Start Time') {
            start = '';
        }

        // Get the end date/time and format it to ISO 8601
        const g = document.getElementById(event.target.end.id);
        let end = `${newEvent.date}T${g.options[g.selectedIndex].value}-10:00`;
        if (g.options[g.selectedIndex].value === 'Select an End Time') {
            end = '';
        }

        // Store the start and end time as integers.
        const startValue = parseInt(event.target.start.value);
        const endValue = parseInt(event.target.end.value);

        // Store the start and end time in a string format.
        const startString = f.options[f.selectedIndex].text;
        const endString = g.options[g.selectedIndex].text;

        newEvent = {title, start, end, startValue, endValue, startString, endString};

        // Clear out any old validation errors.
        instance.context.resetValidation();

        // Invoke clean so that newEvent reflects what will be inserted.
        EventDataSchema.clean(newEvent);

        // Determine validity.
        instance.context.validate(newEvent);
        if (instance.context.isValid()) {
            EventData.insert(newEvent);
            instance.messageFlags.set(displayErrorMessages, false);
            $('#create-event-modal')
                .modal('hide')
            ;
            FlowRouter.go('Calendar_Page');
        } else {
            instance.messageFlags.set(displayErrorMessages, true);
        }
    },

    'click .cancel'(event) {
        event.preventDefault();
        $('#create-event-modal').modal('hide');
    },
});

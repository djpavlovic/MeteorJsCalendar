import {Tracker} from 'meteor/tracker';
import {EventData} from '../../api/eventdata/eventdata';
import {Template} from "meteor/templating";
import {Session} from "meteor/session";

// Define a function that checks whether a moment has already passed.
let isPast = (date) => {
    let today = moment().format();
    return moment(today).isAfter(date);
};
const minTime = '06:00'
const maxTime = '23:00'
const step = 30

Template.Calendar_Page.onCreated(() => {
    Template.instance().subscribe('EventData');
});

Template.Calendar_Page.onRendered(() => {
    // Initialize the calendar.
    $('#event-calendar').fullCalendar({
        firstDay: 1,
        minTime: minTime,
        maxTime: maxTime,
        businessHours: [ // specify an array instead
            {
                daysOfWeek: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday
                startTime: '08:00',
                endTime: '17:00'
            },
        ],
        eventLimit: true, // for all non-TimeGrid views
        header: {
            left: 'title',
            center: '',
            right: 'month,agendaWeek,agendaDay, today prev,next'
        },
        // Add events to the calendar.
        events(start, end, timezone, callback) {
            let data = EventData.find().fetch().map((session) => {
                // Don't allow already past study events to be editable.
                session.editable = !isPast(session.start);
                return session;
            });
            if (data) {
                callback(data);
            }
        },

        // Configure the information displayed for an "event."
        eventRender(session, element) {
            element.find('.fc-content').html(
                `<h4 class="title">${session.title}</h4>
          <p class="time">${session.startString}</p>
          `
            );
        },

        // Triggered when a day is clicked on.
        dayClick(date, session, third) {
            console.log('click')
            // Store the date so it can be used when adding an event to the EventData collection.
            Session.set('eventModal', {type: 'add', date: date.format()});
            // If the date has not already passed, show the create event modal.
            if (moment(date.format()).isSameOrAfter(moment(), 'day')) {
                $('#create-event-modal').modal({blurring: true}).modal('show');
            } else {
                console.error('event cant be before today')
            }
        },

        // Delete an event if it is clicked on.
        eventClick(event) {
            console.log(event)
            // EventData.remove({_id: event._id});
        },

        // Allow events to be dragged and dropped.
        eventDrop(session, delta, revert) {
            let date = session.start.format();

            if (!isPast(date)) {
                let update = {
                    _id: session._id,
                    start: date,
                    end: date
                };

                // Update the date of the event.
                Meteor.call('editEvent', update);
            } else {
                revert();
            }
        },
    });

    // Updates the calendar if there are changes.
    Tracker.autorun(() => {
        // EventData.find().fetch();
        $('#event-calendar').fullCalendar('refetchEvents');
    });
});

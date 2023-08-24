import React from 'react'
import HeroBtn from '../buttons/HeroBtn'

export default function AddEvent() {
    return (
        <div>
            <h1>Add Event</h1>
            <HeroBtn route="/events" text="back to events" />
            <form>
                <label htmlFor="event">Event</label>
                <input className="form-control" type="text" name="event" id="event" />
                <label htmlFor="location">Location</label>
                <input className="form-control" type="text" name="location" id="location" />
                <label htmlFor="time">Time</label>
                <input className="form-control" type="date" name="time" id="time" />
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

import { useRef } from 'react'
import HeroBtn from '../buttons/HeroBtn'

export default function AddEvent() {

    const eventNameRef = useRef()
    const eventLocationRef = useRef()
    const eventDateRef = useRef()
    const eventDescriptionRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        const newEvent = {
            event_name: eventNameRef.current.value,
            event_location: eventLocationRef.current.value,
            event_date: eventDateRef.current.value,
            event_description: eventDescriptionRef.current.value
        }
        console.log(newEvent)
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            <h1>Add Event</h1>
            <HeroBtn route="/events" text="back to events" />
            <form onSubmit={handleSubmit}>
                <label htmlFor="event">Event</label>
                <input ref={eventNameRef} className="form-control" type="text" name="event" id="event" />
                <label htmlFor="location">Location</label>
                <input ref={eventLocationRef} className="form-control" type="text" name="location" id="location" />
                <label htmlFor="date">Date</label>
                <input ref={eventDateRef} className="form-control" type="date" name="date" id="time" />
                <label htmlFor="description">Description</label>
                <textarea ref={eventDescriptionRef} className="form-control" name="description" id="description" cols="30" rows="10"></textarea>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

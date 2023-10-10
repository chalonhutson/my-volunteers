import { useRef } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

import HeroBtn from '../buttons/HeroBtn'

import '../../css/AddUpdateVolunteerEvent.css'

export default function AddEvent() {

    const navigate = useNavigate()

    const eventNameRef = useRef()
    const eventLocationRef = useRef()
    const eventDateRef = useRef()
    const eventDescriptionRef = useRef()

    const authHeader = useAuthHeader()

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
                "Authorization": authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                navigate('/events')
            }
            )
    }

    return (
        <div>
            <HeroBtn route="/events" text="back to events" />
            <div className="cardLarge">
                <h1 className="mt-2">Add Event</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <label htmlFor="event">Event Name</label>
                        <input ref={eventNameRef} className="form-control" type="text" name="event" id="event" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="location">Location</label>
                        <input ref={eventLocationRef} className="form-control" type="text" name="location" id="location" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="date">Date</label>
                        <input ref={eventDateRef} className="form-control" type="date" name="date" id="time" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="description">Description</label>
                        <textarea ref={eventDescriptionRef} className="form-control" name="description" id="description" cols="30" rows="10"></textarea>
                    </div>
                    <button className="mt-3 heroBtn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

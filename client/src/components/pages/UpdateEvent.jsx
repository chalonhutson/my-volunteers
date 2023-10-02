import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuthHeader } from "react-auth-kit"

import HeroBtn from '../buttons/HeroBtn'

export default function UpdateEvent() {

    const { eventId } = useParams()

    const authHeader = useAuthHeader()
    const navigate = useNavigate()

    const [event, setEvent] = useState({
        event_name: "",
        event_location: "",
        event_date: new Date(),
        event_description: ""
    })



    useEffect(() => {
        fetch(`/api/events/${eventId}`, {
            method: "GET",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            }
        })
            .then((res) =>
                res.json()
            )
            .then((data) => {
                setEvent({
                    event_name: data.event_name,
                    event_location: data.event_location,
                    event_date: data.event_date,
                    event_description: data.event_description
                })
                console.log(data.event_date)
            })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/api/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        })
            .then((res) =>
                res.json()
            )
            .then((data) => {
                console.log(data)
                navigate("/events")
            })
    }

    function handleDelete() {
        fetch(`/api/events/${eventId}`, {
            method: "DELETE",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            }
        })
            .then((res) =>
                res.json()
            )
            .then((data) => {
                console.log(data)
                navigate("/events")
            })
    }

    return (
        <div>
            <h1>Add Event</h1>
            <HeroBtn route="/events" text="back to events" />
            <form onSubmit={handleSubmit}>
                <label htmlFor="event">Event</label>
                <input className="form-control" type="text" name="event" id="event"
                    value={event.event_name}
                    onChange={(e) => setEvent({ ...event, event_name: e.target.value })}
                />
                <label htmlFor="location">Location</label>
                <input className="form-control" type="text" name="location" id="location"
                    value={event.event_location}
                    onChange={(e) => setEvent({ ...event, event_location: e.target.value })}
                />
                <label htmlFor="date">Date</label>
                <input className="form-control" type="date" name="date" id="time"
                    value={event.event_date}
                    onChange={(e) => setEvent({ ...event, event_date: e.target.value })}
                />
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="description" id="description" cols="30" rows="10"
                    value={event.event_description}
                    onChange={(e) => setEvent({ ...event, event_description: e.target.value })}
                ></textarea>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            <button onClick={() => handleDelete()} className="btn btn-danger">Delete</button>
        </div>
    )
}

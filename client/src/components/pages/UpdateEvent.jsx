import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuthHeader } from "react-auth-kit"

import HeroBtn from '../buttons/HeroBtn'

import "../../css/AddUpdateVolunteerEvent.css"

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
        <main>
            <HeroBtn route="/events" text="back to events" />
            <div className="cardLarge">
                <h1 className="mt-2">Edit Event</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <label className="form-label" htmlFor="event">Event</label>
                        <input className="form-control" type="text" name="event" id="event"
                            value={event.event_name}
                            onChange={(e) => setEvent({ ...event, event_name: e.target.value })}
                        />
                    </div>
                    <div className="inputContainer">
                        <label className="form-label" htmlFor="location">Location</label>
                        <input className="form-control" type="text" name="location" id="location"
                            value={event.event_location}
                            onChange={(e) => setEvent({ ...event, event_location: e.target.value })}
                        />
                    </div>
                    <div className="inputContainer">
                        <label className="form-label" htmlFor="date">Date</label>
                        <input className="form-control" type="date" name="date" id="time"
                            value={event.event_date}
                            onChange={(e) => setEvent({ ...event, event_date: e.target.value })}
                        />
                    </div>
                    <div className="inputContainer">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" name="description" id="description" cols="30" rows="10"
                            value={event.event_description}
                            onChange={(e) => setEvent({ ...event, event_description: e.target.value })}
                        ></textarea>
                    </div>
                    <button className="mt-3 heroBtn" type="submit">Submit</button>
                </form>
                <button onClick={() => handleDelete()} className="mt-3 w-100 btn btn-danger">Delete</button>
            </div>
        </main>
    )
}

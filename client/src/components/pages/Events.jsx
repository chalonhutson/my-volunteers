import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthHeader } from "react-auth-kit"

import "../../css/Events.css"

import HeroBtn from '../buttons/HeroBtn'


export default function Events() {

    const navigate = useNavigate()

    const [events, setEvents] = useState([])
    const authHeader = useAuthHeader()


    useEffect(() => {
        fetch("/api/volunteers/events", {
            method: "GET",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then(data => setEvents(data))
    }, [])


    return (
        <main>
            <HeroBtn route="/" text="back to dashboard" />
            <div className="eventsGrid">
                <div className="eventsGridHeader">
                    <span className="eventData">event</span>
                    <span className="eventData">location</span>
                    <span className="eventData">time</span>
                    {/* <span>description</span> */}
                </div>

                {events.map(event => (
                    <div onClick={() => navigate(`/events/${event.event_id}`)} className="eventsGridRow">
                        <span className="eventData">{event.event_name}</span>
                        <span className="eventData">{event.event_location}</span>
                        <span className="eventData">{event.event_date}</span>
                        {/* <span className="eventData">{event.event_description}</span> */}
                    </div>
                ))}
            </div>

            <HeroBtn route="/add-event" text="add event" />
        </main>
    )
}

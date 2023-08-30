import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroBtn from '../buttons/HeroBtn'

export default function Events() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])

    return (
        <div>
            <HeroBtn route="/" text="back to dashboard" />
            <table>
                <tr>
                    <th scope="col">event</th>
                    <th scope="col">location</th>
                    <th scope="col">time</th>
                    <th scope="col">description</th>
                </tr>

                {events.map(event => (
                    <tr>
                        <td className="eventData">{event.event_name}</td>
                        <td className="eventData">{event.event_location}</td>
                        <td className="eventData">{event.event_date}</td>
                        <td className="eventData">{event.event_description}</td>
                    </tr>
                ))}

                {/* <tr>
                    <td className="eventData">GOTV Door Knocking - LD15</td>
                    <td className="eventData">Field Office</td>
                    <td className="eventData">Saturday July 14, 2024</td>
                </tr>
                <tr>
                    <td>Pints & Policy</td>
                    <td>Dave & Busters</td>
                    <td>Friday July 20, 2024</td>
                </tr>
                <tr>
                    <td>GOTV Door Knocking - LD15</td>
                    <td>Field Office</td>
                    <td>Saturday July 14, 2024</td>
                </tr> */}
            </table>
            <HeroBtn route="/add-event" text="add event" />
        </div>
    )
}

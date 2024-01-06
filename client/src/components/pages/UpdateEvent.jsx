import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuthHeader } from "react-auth-kit"

import { toast } from "react-toastify"

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

    const [volunteers, setVolunteers] = useState([])

    const [invitesUpdated, setInvitesUpdated] = useState(false)

    // Get all volunteers for user, then update if they are already invited to event
    useEffect(() => {

        let volunteerLocal = []
        let volunteerInvites = []

        Promise.all([

            fetch(`/api/volunteers/volunteers`, {
                method: "GET",
                headers: {
                    "Authorization": authHeader(),
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log("Something went wrong while fetching volunteers.")
                        throw new Error("Network response was not ok")
                    }
                    return res.json()
                })
                .then((data) => {
                    volunteerLocal = data
                }),


            fetch(`/api/volunteers/events/${eventId}/volunteers`, {
                method: "GET",
                headers: {
                    "Authorization": authHeader(),
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log("Something went wrong while fetching volunteers.")
                        throw new Error("Network response was not ok")
                    }
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    volunteerInvites = data.map(volInvite => volInvite.volunteer.volunteer_id)
                })

        ]).then(() => {

            for (let i = 0; i < volunteerLocal.length; i++) {
                if (volunteerInvites.includes(volunteerLocal[i].volunteer_id)) {
                    volunteerLocal[i].invited = true
                } else {
                    volunteerLocal[i].invited = false
                }
                volunteerLocal[i].isUpdated = false
            }

            setVolunteers(volunteerLocal)

        })
    }, [])



    useEffect(() => {
        fetch(`/api/volunteers/events/${eventId}`, {
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
            })
    }, [])

    function handleUpdateInvites(volunteer_id) {

        console.log(volunteer_id)
        setVolunteers(volunteers.map((vol) => {
            if (volunteer_id === vol.volunteer_id) {
                vol.invited = !vol.invited
                vol.isUpdated = true
            }
            return vol
        }
        ))
        setInvitesUpdated(true)

    }

    function handleUpdateInvitesExecute() {

        const invites = volunteers.filter((vol) => vol.isUpdated === true)

        fetch(`/api/volunteers/events/${eventId}/volunteers`, {
            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invites)
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("Something went wrong while updating invites.")
                    throw new Error("Network response was not ok")
                }
            })
            .then((data) => {
                toast.success("Invites updated successfully.")
                setInvitesUpdated(false)
            })

    }


    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/api/volunteers/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("Something went wrong while updating event.")
                    throw new Error("Network response was not ok")
                }
            })
            .then((data) => {
                toast.success("Event updated successfully.")
                navigate("/events")
            })
    }

    function handleDelete() {
        fetch(`/api/volunteers/events/${eventId}`, {
            method: "DELETE",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("Something went wrong while deleting event.")
                    throw new Error("Network response was not ok")
                }
            }
            )
            .then((data) => {
                toast.success("Event deleted.")
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
                    <button className="mt-3 heroBtn" type="submit">Update</button>
                </form>
                <div className="volunteerInvites mt-3">
                    <div className="volunteerInvitesHeader">
                        <h3>Volunteer Invites</h3>
                        {
                            invitesUpdated ?

                                <button
                                    onClick={() => handleUpdateInvitesExecute()}
                                >Update Invites</button>

                                : null
                        }
                    </div>
                    <div className="volunteerContainer">
                        {volunteers.map((volunteer) => {
                            return (
                                <span
                                    onClick={() => handleUpdateInvites(volunteer.volunteer_id)}
                                    className="volunteerCheckContainer"
                                    key={volunteer.volunteer_id}>
                                    <input
                                        // onChange={() => handleUpdateInvites(volunteer.volunteer_id)}
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={volunteer.invited}
                                    />
                                    <label>{volunteer.first_name} {volunteer.last_name}</label>
                                </span>
                            )
                        }
                        )}
                    </div>

                </div>
                <button onClick={() => handleDelete()} className="mt-3 w-100 btn btn-danger">Delete</button>
            </div>
        </main>
    )
}

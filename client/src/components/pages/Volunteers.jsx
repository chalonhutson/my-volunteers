import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthHeader } from "react-auth-kit"

import "../../css/Volunteers.css"

import HeroBtn from '../buttons/HeroBtn';

import image from "../../assets/headshots/headshot_1.jpg"




export default function Volunteers() {

    const navigate = useNavigate()

    const [volunteers, setVolunteers] = useState([])
    const authHeader = useAuthHeader()

    useEffect(() => {
        fetch("/api/volunteers", {
            method: "GET",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                setVolunteers(data)
            })
    }, [])
    return (
        <main>
            <HeroBtn route="/" text="back to dashboard" />


            <div className="volunteersGrid">
                <div className="volunteersGridHeader">
                    <span className="volunteerHeader">image</span>
                    <span className="volunteerHeader">name</span>
                    <span className="volunteerHeader">preferred contact</span>
                </div>
                {volunteers.map((volunteer, i) => {
                    return (
                        <div className="volunteersGridRow" onClick={() => navigate(`/volunteers/${volunteer.volunteer_id}`)} key={i}>
                            <span>
                                <img
                                    className="volunteerImage"
                                    src={image}
                                    alt={volunteer.first_name}
                                ></img>
                            </span>
                            <span className="volunteerName">{volunteer.first_name} {volunteer.last_name}</span>
                            <span className="volunteerContact">{volunteer.preferred_contact.contact}</span>
                        </div>
                    );
                })}
            </div>
            <HeroBtn route="/add-volunteer" text="add volunteer" />
        </main>
    );
}

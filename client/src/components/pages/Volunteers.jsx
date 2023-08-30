import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "../../css/Volunteers.css"

import headshot_1 from "../../assets/headshots/headshot_1.jpg";
import headshot_2 from "../../assets/headshots/headshot_2.jpg";
import headshot_3 from "../../assets/headshots/headshot_3.jpg";
import headshot_4 from "../../assets/headshots/headshot_4.jpg";
import headshot_5 from "../../assets/headshots/headshot_5.jpg";
import headshot_6 from "../../assets/headshots/headshot_6.jpg";
import headshot_7 from "../../assets/headshots/headshot_7.jpg";
import headshot_8 from "../../assets/headshots/headshot_8.jpg";
import headshot_9 from "../../assets/headshots/headshot_9.jpg";
import headshot_10 from "../../assets/headshots/headshot_10.jpg";
import headshot_11 from "../../assets/headshots/headshot_11.jpg";
import headshot_12 from "../../assets/headshots/headshot_12.jpg";
import headshot_13 from "../../assets/headshots/headshot_13.jpg";
import headshot_14 from "../../assets/headshots/headshot_14.jpg";
import headshot_15 from "../../assets/headshots/headshot_15.jpg";
import headshot_16 from "../../assets/headshots/headshot_16.jpg";
import headshot_17 from "../../assets/headshots/headshot_17.jpg";
import headshot_18 from "../../assets/headshots/headshot_18.jpg";
import headshot_19 from "../../assets/headshots/headshot_19.jpg";
import headshot_20 from "../../assets/headshots/headshot_20.jpg";
import headshot_21 from "../../assets/headshots/headshot_21.jpg";
import headshot_22 from "../../assets/headshots/headshot_22.jpg";
import headshot_23 from "../../assets/headshots/headshot_23.jpg";
import headshot_24 from "../../assets/headshots/headshot_24.jpg";

import HeroBtn from '../buttons/HeroBtn';

const volunteersArr = [
    {
        name: "Ashley Westgate",
        headshot: headshot_1,
        contact: "ashwestgate@email.com"
    },
    {
        name: "Bradley Newborn",
        headshot: headshot_2,
        contact: "(480) 555-5555"
    },
    {
        name: "Cameron Thompson",
        headshot: headshot_3,
        contact: "cameronthompson@email.com"
    },
    {
        name: "Danielle Johnson",
        headshot: headshot_4,
        contact: "(702) 555-5555"
    },
    {
        name: "Ethan Martinez",
        headshot: headshot_5,
        contact: "ethanmartinez@email.com"
    },
    {
        name: "Fiona Parker",
        headshot: headshot_6,
        contact: "(415) 555-5555"
    },
    {
        name: "Gabriel Smith",
        headshot: headshot_7,
        contact: "gabrielsmith@email.com"
    },
    {
        name: "Hannah Wilson",
        headshot: headshot_8,
        contact: "(305) 555-5555"
    },
    {
        name: "Isaac Adams",
        headshot: headshot_9,
        contact: "isaacadams@email.com"
    },
    {
        name: "Julia Brown",
        headshot: headshot_10,
        contact: "(404) 555-5555"
    },
    {
        name: "Kaleb Miller",
        headshot: headshot_11,
        contact: "kalebmiller@email.com"
    },
    {
        name: "Lily Davis",
        headshot: headshot_12,
        contact: "(212) 555-5555"
    },
    {
        name: "Michaela Garcia",
        headshot: headshot_13,
        contact: "michaelagarcia@email.com"
    },
    {
        name: "Nathan Lee",
        headshot: headshot_14,
        contact: "(817) 555-5555"
    },
    {
        name: "Olivia Martinez",
        headshot: headshot_15,
        contact: "oliviamartinez@email.com"
    },
    {
        name: "Patrick Johnson",
        headshot: headshot_16,
        contact: "(603) 555-5555"
    },
    {
        name: "Quincy Taylor",
        headshot: headshot_17,
        contact: "quincytaylor@email.com"
    },
    {
        name: "Rachel White",
        headshot: headshot_18,
        contact: "(916) 555-5555"
    },
    {
        name: "Samuel Clark",
        headshot: headshot_19,
        contact: "samuelclark@email.com"
    },
    {
        name: "Tessa Adams",
        headshot: headshot_20,
        contact: "(503) 555-5555"
    },
    {
        name: "Ulysses Martin",
        headshot: headshot_21,
        contact: "ulyssesmartin@email.com"
    },
    {
        name: "Victoria Smith",
        headshot: headshot_22,
        contact: "(702) 555-5555"
    },
    {
        name: "William Brown",
        headshot: headshot_23,
        contact: "williambrown@email.com"
    },
    {
        name: "Xavier Johnson",
        headshot: headshot_24,
        contact: "(415) 555-5555"
    },
];



export default function Volunteers() {

    const [volunteers, setVolunteers] = useState([])

    useEffect(() => {
        fetch("/api/volunteers")
            .then((res) => res.json())
            .then((data) => {
                setVolunteers(data)
            })
    }, [])
    return (
        <div>
            <HeroBtn route="/" text="back to dashboard" />
            <HeroBtn route="/add-volunteer" text="add volunteer" />

            <table className="table">
                <thead>
                    <tr className="volunteerRow">
                        <th scope="col"></th>
                        <th scope="col">name</th>
                        <th scope="col">preferred contact</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteers.map((volunteer, i) => {
                        return (
                            <tr className="volunteerRow" key={i}>
                                <td>
                                    {/* <img
                                        className="volunteerImage"
                                        src={`{volunteer.image_url}`}
                                        alt={volunteer.first_name}
                                    ></img> */}
                                </td>
                                <td className="volunteerName">{volunteer.first_name} {volunteer.last_name}</td>
                                <td className="volunteerContact">{volunteer.contact}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    );
}

import { Link, useParams, useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { useAuthHeader } from "react-auth-kit"

import "../../css/AddUpdateVolunteerEvent.css"

export default function UpdateVolunteer() {

    const authHeader = useAuthHeader()
    const navigate = useNavigate()

    const [volunteer, setVolunteer] = useState({
        first_name: "",
        last_name: "",
        preferred_contact: {
            method: "none",
            contact: "none"
        },
        phones: [],
        emails: []
    })

    const { volunteerId } = useParams()


    useEffect(() => {
        fetch(`/api/volunteers/${volunteerId}`, {
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
                setVolunteer(data)
            })
    }, [])


    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/api/volunteers/${volunteerId}`, {
            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(volunteer)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                navigate("/volunteers")
            })
    }

    function handleDelete() {
        fetch(`/api/volunteers/${volunteerId}`, {
            method: "DELETE",
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
                console.log(data)
                navigate("/volunteers")
            })
    }


    return (
        <div>
            <Link to="/volunteers">
                <button className="heroBtn">back to volunteers</button>
            </Link>
            <div className="cardLarge volunteerInfo">
                <h1 className="mt-2">Edit Volunteer</h1>
                <form onSubmit={handleSubmit}>
                    <div className="upperForm">
                        <div className="inputContainer">
                            <label className="form-label" htmlFor="name">First Name</label>
                            <input className="form-control" type="text" name="name" id="name"
                                value={volunteer.first_name}
                                onChange={(e) => setVolunteer({ ...volunteer, first_name: e.target.value })}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label" htmlFor="last-name">Last Name</label>
                            <input className="form-control" type="text" name="last-name" id="last-name"
                                value={volunteer.last_name}
                                onChange={(e) => setVolunteer({ ...volunteer, last_name: e.target.value })}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label" htmlFor="preferred-contact-method">Preferred Contact</label>
                            <select className="form-select" name="preferred-contact-metho" id="preferred-contact-method">
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="phonesContainer">
                        <span className="addPhoneInput">
                            <label htmlFor="add-phone">Phone</label>
                            <button onClick={() => console.log("addPhoneInput()")} className="ms-2 addButton" type="button" id="add-phone">+</button>
                        </span>
                        <div className="phoneInputContainer">
                            {volunteer.phones.map((phone) => {
                                return (
                                    <input className="mb-2 form-control" key={phone.phone_id} value={phone.phone_number}></input>
                                )
                            })}
                        </div>
                    </div>
                    <div className="emailsContainer">
                        <span className="addEmailInput">
                            <label htmlFor="add-email">Email</label>
                            <button onClick={() => console.log("addEmailInput()")} className="ms-2 addButton" type="button" id="add-email">+</button>
                        </span>
                        <div className="emailInputContainer">
                            {volunteer.emails.map((email) => {
                                return (
                                    <input className="mb-2 form-control" key={email.email_id} value={email.email_address}></input>
                                )
                            })}
                        </div>
                    </div>
                    <button className="mt-3 heroBtn" type="submit">Update</button>
                </form>
                <button onClick={() => handleDelete()} className="mt-3 w-100 btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

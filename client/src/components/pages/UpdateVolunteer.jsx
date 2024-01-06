import { Link, useParams, useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { useAuthHeader } from "react-auth-kit"

import { toast } from 'react-toastify'

import "../../css/AddUpdateVolunteerEvent.css"

import noImage from "../../assets/default/no-volunteer-img.png"
import addPhoto from "../../assets/default/add-photo.svg"
import ImgUpload from "../ImgUpload"

export default function UpdateVolunteer() {

    const authHeader = useAuthHeader()
    const navigate = useNavigate()

    const [imageModalShowing, setImageModalShowing] = useState(false)

    // const [volunteer, setVolunteer] = useState({
    //     first_name: "",
    //     last_name: "",
    //     preferred_contact: {
    //         method: "none",
    //         contact: "none"
    //     },
    //     phones: [],
    //     emails: [],
    //     notes: [],
    //     events: []
    // })

    const [volunteer, setVolunteer] = useState(null)

    const { volunteerId } = useParams()


    // useEffect(() => {
    //     let newImageURL = ""

    //     fetch(`/api/volunteer/${volunteerId}/images`, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": authHeader(),
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then((res) =>
    //             res.json()
    //         )
    //         .then((data) => {
    //             if (data.length > 0) {
    //                 newImageURL = data
    //             } else {
    //                 newImageURL = ""
    //             }
    //             setVolunteer(
    //                 {
    //                     ...volunteer,
    //                     new_image_url: newImageURL
    //                 }
    //             )
    //         })
    // }, [])


    useEffect(() => {
        getUpdatedVolunteer()
    }, [])

    function getUpdatedVolunteer() {
        fetch(`/api/volunteers/volunteers/${volunteerId}`, {
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
                let volunteer = data
                volunteer.phones = data.phones.map((phone) => {
                    return {
                        ...phone,
                        is_edited: false,
                        is_updated: false,
                        is_new: false
                    }
                }
                )

                volunteer.emails = data.emails.map((email) => {
                    return {
                        ...email,
                        is_edited: false,
                        is_updated: false,
                        is_new: false
                    }
                }
                )

                volunteer.notes = data.notes.map((note) => {
                    return {
                        ...note,
                        is_edited: false,
                        is_updated: false,
                        is_new: false
                    }
                }
                )

                setVolunteer(volunteer)
            })
    }

    function handleVolunteerUpdate() {
        fetch(`/api/volunteers/volunteers/${volunteerId}`, {
            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(volunteer)
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error updating the volunteer.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Volunteer updated successfully.")
                navigate("/volunteers")
            })
    }

    function handleVolunteerDelete() {
        fetch(`/api/volunteers/volunteers/${volunteerId}`, {
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
                toast.success("Volunteer deleted.")
                navigate("/volunteers")
            })
    }


















    // Phones functionality
    function addPhoneInput() {
        setVolunteer(
            {
                ...volunteer,
                phones: [...volunteer.phones, {
                    phone_id: null,
                    phone_number: "",
                    is_new: true,
                }]
            }
        )
    }

    function handleAddPhoneConfirm() {
        const newPhone = volunteer.phones.find((p) => p.is_new)

        fetch(`/api/volunteers/volunteers/${volunteerId}/phones`, {
            method: "POST",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPhone)
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error adding the phone number.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Phone number added.")
                getUpdatedVolunteer()
                // console.log(data)
            })

        setVolunteer(
            {
                ...volunteer,
                phones: volunteer.phones.map((p) => {
                    if (p.is_new) {
                        return (
                            {
                                ...p,
                                is_new: false
                            }
                        )
                    } else {
                        return p
                    }
                }
                )
            }
        )
    }

    function handlePhoneIsEdited(e, phone_id, value) {
        e.preventDefault()
        console.log("update phone")

        if (value) {
            setVolunteer(
                {
                    ...volunteer,
                    phones: volunteer.phones.map((p) => {
                        if (p.phone_id === phone_id) {
                            return (
                                {
                                    ...p,
                                    is_edited: value,
                                    previous_phone_number: p.phone_number
                                }
                            )
                        } else {
                            return (
                                {
                                    ...p,
                                    is_edited: false
                                }
                            )
                        }
                    }
                    )
                }
            )
        } else {
            setVolunteer(
                {
                    ...volunteer,
                    phones: volunteer.phones.map((p) => {
                        if (p.phone_id === phone_id) {
                            return (
                                {
                                    ...p,
                                    phone_number: p.previous_phone_number,
                                    is_edited: value
                                }
                            )
                        } else {
                            return (
                                {
                                    ...p,
                                    is_edited: false
                                }
                            )
                        }
                    }
                    )
                }
            )
        }
    }

    function handlePhoneUpdateConfirm(e, phone_id) {
        e.preventDefault()
        console.log("update phone confirm")
        setVolunteer(
            {
                ...volunteer,
                phones: volunteer.phones.map((p) => {
                    if (p.phone_id === phone_id) {
                        return (
                            {
                                ...p,
                                is_updated: true
                            }
                        )
                    } else {
                        return p
                    }
                }
                )
            }
        )

        fetch(`/api/volunteers/volunteers/phones/${phone_id}`, {

            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(volunteer.phones.find((p) => p.phone_id === phone_id))
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error updating the phone number.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Phone number updated.")
                getUpdatedVolunteer()
                console.log(data)
            })

        handlePhoneIsEdited(e, phone_id, false)
    }

    function handleDeletePhone(e, phone_id) {
        e.preventDefault()
        console.log("delete phone")
        fetch(`/api/volunteers/volunteers/phones/${phone_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error deleting the phone number.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Phone number deleted.")
                getUpdatedVolunteer()
                console.log(data)
            })
    }



    function getPhones() {
        return volunteer.phones.map((phone) => {
            if (phone.is_edited) {
                return (
                    <span className="d-flex flex-row align-items-center ms-3 mb-3" key={phone.phone_id}>
                        <input
                            className="form-control"
                            value={phone.phone_number}
                            onChange={(e) => {
                                console.log(volunteer.phones); setVolunteer(
                                    {
                                        ...volunteer,
                                        phones: volunteer.phones.map((p) => {
                                            if (p.is_edited) {
                                                return (
                                                    {
                                                        ...p,
                                                        phone_number: e.target.value
                                                    }
                                                )
                                            } else {
                                                return p
                                            }
                                        }
                                        )
                                    }
                                )
                            }}
                        ></input>
                        <span className="d-flex flex-row align-items-center">
                            <button
                                onClick={(e) => handlePhoneUpdateConfirm(e, phone.phone_id)}
                                className="btn btn-sm btn-success ms-3"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >
                                update
                            </button>
                            <button
                                onClick={(e) => handlePhoneIsEdited(e, phone.phone_id, false)}
                                className="btn btn-sm btn-danger ms-1"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >
                                cancel
                            </button>
                        </span>
                    </span>
                )
            } else if (phone.is_new) {
                return (
                    <span className="d-flex flex-row ms-3" key={phone.phone_id}
                    >
                        <input
                            className="form-control"
                            value={phone.phone_number}
                            onChange={(e) => setVolunteer(
                                {
                                    ...volunteer,
                                    phones: volunteer.phones.map((p) => {
                                        if (p.is_new) {
                                            return (
                                                {
                                                    ...p,
                                                    phone_number: e.target.value
                                                }
                                            )
                                        } else {
                                            return p
                                        }
                                    }
                                    )
                                }
                            )}
                        ></input>
                        <span className="ms-3">
                            <button
                                onClick={() => handleAddPhoneConfirm()}
                                className="btn btn-sm btn-success"
                                style={{ padding: "0 .5rem", height: "25px", marginLeft: ".5rem" }}
                            >confirm</button>
                        </span>
                    </span>
                )
            } else {
                return (
                    <span className="d-flex flex-row ms-3" key={phone.phone_id}
                    >
                        <p>{phone.phone_number}</p>
                        <span className="ms-3">
                            <button
                                onClick={(e) => handlePhoneIsEdited(e, phone.phone_id, true)}
                                className="btn btn-sm btn-warning"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >edit</button>
                            <button
                                onClick={(e) => handleDeletePhone(e, phone.phone_id)}
                                className="btn btn-sm btn-danger"
                                style={{ padding: "0 .5rem", height: "25px", marginLeft: ".5rem" }}
                            >delete</button>
                        </span>
                    </span>
                )
            }
        })
    }












    // Emails functionality




    function addEmailInput() {
        setVolunteer(
            {
                ...volunteer,
                emails: [...volunteer.emails, {
                    email_id: null,
                    email_address: "",
                    is_new: true,
                }]
            }
        )
    }



    function handleAddEmailConfirm() {
        const newEmail = volunteer.emails.find((e) => e.is_new)

        fetch(`/api/volunteers/volunteers/${volunteerId}/emails`, {
            method: "POST",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmail)
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error adding the email address.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Email address added.")
                getUpdatedVolunteer()
                // console.log(data)
            })

        setVolunteer(
            {
                ...volunteer,
                emails: volunteer.emails.map((e) => {
                    if (e.is_new) {
                        return (
                            {
                                ...e,
                                is_new: false
                            }
                        )
                    } else {
                        return e
                    }
                }
                )
            }
        )
    }

    function handleEmailIsEdited(e, email_id, value) {
        e.preventDefault()
        console.log("update email")

        if (value) {
            setVolunteer(
                {
                    ...volunteer,
                    emails: volunteer.emails.map((e) => {
                        if (e.email_id === email_id) {
                            return (
                                {
                                    ...e,
                                    is_edited: value,
                                    previous_email_address: e.email_address
                                }
                            )
                        } else {
                            return (
                                {
                                    ...e,
                                    is_edited: false
                                }
                            )
                        }
                    }
                    )
                }
            )
        } else {
            setVolunteer(
                {
                    ...volunteer,
                    emails: volunteer.emails.map((e) => {
                        if (e.email_id === email_id) {
                            return (
                                {
                                    ...e,
                                    email_address: e.previous_email_address,
                                    is_edited: value
                                }
                            )
                        } else {
                            return (
                                {
                                    ...e,
                                    is_edited: false
                                }
                            )
                        }
                    }
                    )
                }
            )
        }
    }

    function handleEmailUpdateConfirm(e, email_id) {
        e.preventDefault()
        console.log("update email confirm")
        setVolunteer(
            {
                ...volunteer,
                emails: volunteer.emails.map((e) => {
                    if (e.email_id === email_id) {
                        return (
                            {
                                ...e,
                                is_updated: true
                            }
                        )
                    } else {
                        return e
                    }
                }
                )
            }
        )

        fetch(`/api/volunteers/volunteers/emails/${email_id}`, {

            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(volunteer.emails.find((e) => e.email_id === email_id))
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error updating the email address.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Email address updated.")
                getUpdatedVolunteer()
                console.log(data)
            })

        handleEmailIsEdited(e, email_id, false)
    }

    function handleDeleteEmail(e, email_id) {
        e.preventDefault()
        console.log("delete email")
        fetch(`/api/volunteers/volunteers/emails/${email_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error deleting the email address.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Email address deleted.")
                getUpdatedVolunteer()
                console.log(data)
            })
    }


    function getEmails() {
        return volunteer.emails.map((email) => {
            if (email.is_edited) {
                return (
                    <span className="d-flex flex-row align-items-center ms-3 mb-3" key={email.email_id}>
                        <input
                            className="form-control"
                            value={email.email_address}
                            onChange={(ev) => {
                                console.log(volunteer.emails); setVolunteer(
                                    {
                                        ...volunteer,
                                        emails: volunteer.emails.map((e) => {
                                            if (e.is_edited) {
                                                return (
                                                    {
                                                        ...e,
                                                        email_address: ev.target.value
                                                    }
                                                )
                                            } else {
                                                return e
                                            }
                                        }
                                        )
                                    }
                                )
                            }}
                        ></input>
                        <span className="d-flex flex-row align-items-center">
                            <button
                                onClick={(e) => handleEmailUpdateConfirm(e, email.email_id)}
                                className="btn btn-sm btn-success ms-3"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >
                                update
                            </button>
                            <button
                                onClick={(e) => handleEmailIsEdited(e, email.email_id, false)}
                                className="btn btn-sm btn-danger ms-1"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >
                                cancel
                            </button>
                        </span>
                    </span>
                )
            } else if (email.is_new) {
                return (
                    <span className="d-flex flex-row ms-3" key={email.email_id}
                    >
                        <input
                            className="form-control"
                            value={email.email_address}
                            onChange={(ev) => setVolunteer(
                                {
                                    ...volunteer,
                                    emails: volunteer.emails.map((e) => {
                                        if (e.is_new) {
                                            return (
                                                {
                                                    ...e,
                                                    email_address: ev.target.value
                                                }
                                            )
                                        } else {
                                            return e
                                        }
                                    }
                                    )
                                }
                            )}
                        ></input>
                        <span className="ms-3">
                            <button
                                onClick={() => handleAddEmailConfirm()}
                                className="btn btn-sm btn-success"
                                style={{ padding: "0 .5rem", height: "25px", marginLeft: ".5rem" }}
                            >confirm</button>
                        </span>
                    </span>
                )
            }
            else {
                return (
                    <span className="d-flex flex-row ms-3" key={email.email_id}
                    >
                        <p>{email.email_address}</p>
                        <span className="ms-3">
                            <button
                                onClick={(e) => handleEmailIsEdited(e, email.email_id, true)}
                                className="btn btn-sm btn-warning"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >edit</button>
                            <button
                                onClick={(e) => handleDeleteEmail(e, email.email_id)}
                                className="btn btn-sm btn-danger"
                                style={{ padding: "0 .5rem", height: "25px", marginLeft: ".5rem" }}
                            >delete</button>
                        </span>
                    </span>
                )
            }
        }
        )
    }




















    // Notes functionality

    function addNoteInput() {
        setVolunteer(
            {
                ...volunteer,
                notes: [...volunteer.notes, {
                    note_id: null,
                    content: "",
                    is_new: true,
                }]
            }
        )
    }

    function handleAddNoteConfirm() {
        // Add note to component state
        const newNote = volunteer.notes.find((n) => n.is_new)

        fetch(`/api/volunteers/volunteers/${volunteerId}/notes`, {
            method: "POST",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote)
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error adding the note.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Note added.")
                getUpdatedVolunteer()
                // console.log(data)
            })
    }

    function handleNoteIsEdited(e, note_id, value) {
        e.preventDefault()
        console.log("update note")

        if (value) {
            setVolunteer(
                {
                    ...volunteer,
                    notes: volunteer.notes.map((n) => {
                        if (n.note_id === note_id) {
                            return (
                                {
                                    ...n,
                                    is_edited: value,
                                    previous_content: n.content
                                }
                            )
                        } else {
                            return (
                                {
                                    ...n,
                                    is_edited: false
                                }
                            )
                        }
                    }
                    )
                }
            )
        } else {
            setVolunteer(
                {
                    ...volunteer,
                    notes: volunteer.notes.map((n) => {
                        if (n.note_id === note_id) {
                            return (
                                {
                                    ...n,
                                    content: n.previous_content,
                                    is_edited: value
                                }
                            )
                        } else {
                            return (
                                {
                                    ...n,
                                    is_edited: false
                                }
                            )
                        }
                    }
                    )
                }
            )
        }
    }

    function handleNoteUpdateConfirm(e, note_id) {
        e.preventDefault()
        console.log("update note confirm")
        setVolunteer(
            {
                ...volunteer,
                notes: volunteer.notes.map((n) => {
                    if (n.note_id === note_id) {
                        return (
                            {
                                ...n,
                                is_updated: true
                            }
                        )
                    } else {
                        return n
                    }
                }
                )
            }
        )

        fetch(`/api/volunteers/volunteers/notes/${note_id}`, {

            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(volunteer.notes.find((n) => n.note_id === note_id))
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error updating the note.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Note updated.")
                getUpdatedVolunteer()
                console.log(data)
            })

        handleNoteIsEdited(e, note_id, false)
    }

    function handleDeleteNote(e, note_id) {
        console.log("delete note")

        fetch(`/api/volunteers/notes/${note_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (!res.ok) {
                    toast.error("There was an error deleting the note.")
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then((data) => {
                toast.success("Note deleted.")
                getUpdatedVolunteer()
                console.log(data)
            })
    }

    function getNotes() {
        return volunteer.notes.map((note) => {
            if (note.is_edited) {
                return (
                    <span className="d-flex flex-row align-items-center ms-3 mb-3" key={note.note_id}>
                        <input
                            className="form-control"
                            value={note.content}
                            onChange={(e) => {
                                console.log(volunteer.notes); setVolunteer(
                                    {
                                        ...volunteer,
                                        notes: volunteer.notes.map((n) => {
                                            if (n.is_edited) {
                                                return (
                                                    {
                                                        ...n,
                                                        content: e.target.value
                                                    }
                                                )
                                            } else {
                                                return n
                                            }
                                        }
                                        )
                                    }
                                )
                            }}
                        ></input>
                        <span className="d-flex flex-row align-items-center">
                            <button
                                onClick={(e) => handleNoteUpdateConfirm(e, note.note_id)}
                                className="btn btn-sm btn-success ms-3"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >
                                update
                            </button>
                            <button
                                onClick={(e) => handleNoteIsEdited(e, note.note_id, false)}
                                className="btn btn-sm btn-danger ms-1"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >
                                cancel
                            </button>
                        </span>
                    </span>
                )
            } else if (note.is_new) {
                return (
                    <span className="d-flex flex-row ms-3" key={note.note_id}
                    >
                        <input
                            className="form-control"
                            value={note.content}
                            onChange={(e) => setVolunteer(
                                {
                                    ...volunteer,
                                    notes: volunteer.notes.map((n) => {
                                        if (n.is_new) {
                                            return (
                                                {
                                                    ...n,
                                                    content: e.target.value
                                                }
                                            )
                                        } else {
                                            return n
                                        }
                                    }
                                    )
                                }
                            )}
                        ></input>
                        <span className="ms-3">
                            <button
                                onClick={() => handleAddNoteConfirm()}
                                className="btn btn-sm btn-success"
                                style={{ padding: "0 .5rem", height: "25px", marginLeft: ".5rem" }}
                            >confirm</button>
                        </span>
                    </span>
                )
            }
            else {
                return (
                    <span className="d-flex flex-row ms-3" key={note.note_id}
                    >
                        <p>{note.content}</p>
                        <span className="ms-3">
                            <button
                                onClick={(e) => handleNoteIsEdited(e, note.note_id, true)}
                                className="btn btn-sm btn-warning"
                                style={{ padding: "0 .5rem", height: "25px" }}
                            >edit</button>
                            <button
                                onClick={(e) => handleDeleteNote(e, note.note_id)}
                                className="btn btn-sm btn-danger"
                                style={{ padding: "0 .5rem", height: "25px", marginLeft: ".5rem" }}
                            >delete</button>
                        </span>
                    </span>
                )

            }
        })
    }









    // Component return

    return (
        <main>
            <Link to="/volunteers">
                <button className="heroBtn">back to volunteers</button>
            </Link>

            {!volunteer ? <h1>Loading...</h1> : <>

                <ImgUpload
                    setShow={setImageModalShowing}
                    show={imageModalShowing}
                    fetch_url={`/api/volunteer/${volunteer.volunteer_id}/images`}
                    nav_url={`/volunteers/${volunteer.volunteer_id}`}
                />

                <div className="cardLarge volunteerInfo">
                    <h1 className="mt-2">Edit Volunteer</h1>
                    <div className="headShotContainer">
                        <img
                            className="headShot"
                            src={
                                volunteer.image_url ?
                                    volunteer.image_url :
                                    noImage

                            }
                            alt="no image found"
                            style={{ width: "10rem", height: "10rem", objectFit: "cover", borderRadius: "50%" }}
                        />
                        <div className="overlay" onClick={() => setImageModalShowing(true)}>
                            <img src={addPhoto} className="editSymbol" />
                        </div>
                    </div>
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
                            <button onClick={() => addPhoneInput()} className="ms-2 addButton" type="button" id="add-phone">+</button>
                        </span>
                        <div className="phoneInputContainer">
                            {getPhones()}
                        </div>
                    </div>
                    <div className="emailsContainer">
                        <span className="addEmailInput">
                            <label htmlFor="add-email">Email</label>
                            <button onClick={() => addEmailInput()} className="ms-2 addButton" type="button" id="add-email">+</button>
                        </span>
                        <div className="emailInputContainer">
                            {getEmails()}
                        </div>
                    </div>
                    <div className="notesContainer">
                        <span className="addNoteInput">
                            <label htmlFor="add-note">Note</label>
                            <button onClick={() => addNoteInput()} className="ms-2 addButton" type="button" id="add-note">+</button>
                        </span>
                        <div className="noteInputContainer">
                            {getNotes()}
                        </div>
                    </div>
                    <button onClick={() => handleVolunteerUpdate()} className="mt-3 heroBtn">Update</button>

                    <div className="volunteerEventsContainer">
                        <h3 className="mt-3">Events</h3>
                        <div className="eventContainer">
                            {volunteer.events.map((event) => {
                                return (
                                    <span onClick={() => navigate(`/events/${event.event_id}`)} className="volunteerEvent" key={event.event_id}>
                                        <p>{event.event_name}</p>
                                        <p>{event.event_date}</p>
                                        <p>{event.event_location}</p>
                                    </span>
                                )
                            }
                            )}

                        </div>
                    </div>

                    <button onClick={() => handleVolunteerDelete()} className="mt-3 w-100 btn btn-danger">Delete</button>
                </div >
            </>}
        </main >
    )
}

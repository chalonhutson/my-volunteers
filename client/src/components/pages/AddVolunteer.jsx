import { useState, useRef } from "react"
import { useAuthHeader } from "react-auth-kit"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

export default function AddVolunteer() {

    const navigate = useNavigate()

    const [phoneInputs, setPhoneInputs] = useState([])
    const authHeader = useAuthHeader()

    function renderPhoneInputs() {
        return phoneInputs.map((input, i) => {
            return (
                <div key={i}>
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input className="form-control" type="text" name="phone" id="phone" defaultValue={input.value} />
                    <button onClick={() => removePhoneInput(i)} className="btn btn-danger">-</button>
                </div>
            )
        }
        )
    }

    function renderEmailInputs() {
        console.log("renderEmailInputs()")
    }

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const preferredContactRef = useRef()

    function addPhoneInput() {
        setPhoneInputs([...phoneInputs, { value: "" }])
        console.log(phoneInputs)
    }

    function removePhoneInput(i) {
        const newPhoneInputs = phoneInputs.filter((_, i) => i !== index);
        setPhoneInputs(newPhoneInputs)
        console.log("remove phone input")
    }

    function handleSubmit(e) {
        e.preventDefault()
        const newVolunteer = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            preferred_contact: preferredContactRef.current.value,
        }
        console.log(newVolunteer)
        fetch('/api/volunteers/volunteers', {
            method: 'POST',
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newVolunteer)
        })
            .then(res => {
                if (!res.ok) {
                    toast.error("Something went wrong while adding volunteer.")
                    throw new Error("Network response was not ok")
                }
            })
            .then(data => {
                toast.success("Volunteer added successfully.")
                navigate("/volunteers")
            }
            )
    }


    return (
        <main>
            <Link to="/volunteers">
                <button className="heroBtn">back to volunteers</button>
            </Link>
            <div className="cardLarge">
                <h1 className="mt-2">Add Volunteer</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <label htmlFor="name">First Name</label>
                        <input ref={firstNameRef} className="form-control" type="text" name="name" id="name" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="last-name">Last Name</label>
                        <input ref={lastNameRef} className="form-control" type="text" name="last-name" id="last-name" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="preferred-contact">Preferred Contact</label>
                        <select ref={preferredContactRef} className="form-select" name="preferred-contact" id="preferred-contact">
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                        </select>
                    </div>
                    <div className="inputContainer">
                        <span className="addPhoneInput">
                            <label htmlFor="add-phone">Phone</label>
                            <button onClick={() => console.log("addPhoneInput()")} className="ms-2 addButton" type="button" id="add-phone">+</button>
                        </span>
                        {renderPhoneInputs()}
                    </div>
                    <div className="inputContainer">
                        <span className="addEmailInput">
                            <label htmlFor="add-email">Email</label>
                            <button onClick={() => console.log("addEmailInput()")} className="ms-2 addButton" type="button" id="add-email">+</button>
                        </span>
                        {renderEmailInputs()}
                    </div>
                    <button className="mt-2 heroBtn" type="submit">Submit</button>
                </form>
            </div>
        </main>
    )
}

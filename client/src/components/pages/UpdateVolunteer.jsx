import { Link, useParams, useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { useAuthHeader } from "react-auth-kit"

export default function UpdateVolunteer() {

    const authHeader = useAuthHeader()
    const navigate = useNavigate()

    const [volunteer, setVolunteer] = useState({
        first_name: "",
        last_name: "",
        preferred_contact: "",
        phone: ""
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
            .then((res) =>
                res.json()
            )
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
            <h1>Add Volunteer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">First Name</label>
                <input className="form-control" type="text" name="name" id="name"
                    value={volunteer.first_name}
                    onChange={(e) => setVolunteer({ ...volunteer, first_name: e.target.value })}
                />
                <label htmlFor="last-name">Last Name</label>
                <input className="form-control" type="text" name="last-name" id="last-name"
                    value={volunteer.last_name}
                    onChange={(e) => setVolunteer({ ...volunteer, last_name: e.target.value })}
                />
                <label htmlFor="preferred-contact">Preferred Contact</label>
                <select className="form-select" name="preferred-contact" id="preferred-contact">
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
                <label htmlFor="add-phone">Phone</label>
                <button onClick={() => addPhoneInput()} className="btn btn-primary" type="button" id="add-phone">+</button>
                {/* {renderPhoneInputs()} */}
                <br></br>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

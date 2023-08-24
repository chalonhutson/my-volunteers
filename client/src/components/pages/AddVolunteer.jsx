import { useState } from "react"
import { Link } from "react-router-dom"

export default function AddVolunteer() {
    const [phoneCount, setPhoneCount] = useState(1)
    console.log(phoneCount)

    function renderPhoneInputs() {
        const inputs = []

        for (let i = 0; i < phoneCount; i++) {
            inputs.push(
                <div key={i}>
                    <label htmlFor="phone">Phone</label>
                    <input className="form-control" type="text" name="phone" id="phone" />
                    <button className="btn btn-danger">-</button>
                </div>
            )
        }
        return inputs
    }
    return (
        <div>
            <Link to="/volunteers">
                <button className="heroBtn">back to volunteers</button>
            </Link>
            <h1>Add Volunteer</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" name="name" id="name" />
                <label htmlFor="preferred-contact">Preferred Contact</label>
                <select className="form-select" name="preferred-contact" id="preferred-contact">
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
                <label htmlFor="add-phone">Phone</label>
                <button onClick={() => setPhoneCount((count) => count + 1)} className="btn btn-primary" type="button" id="add-phone">+</button>
                {renderPhoneInputs()}
                <br></br>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

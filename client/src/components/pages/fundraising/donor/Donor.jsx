import { useState } from "react"
import { Link, useParams } from "react-router-dom"

import DonorPhoneEntry from "./DonorPhoneEntry"
import DonorEmailEntry from "./DonorEmailEntry"

import "./Donor.css"

export default function Donor() {

    const { donorId } = useParams()

    const [donor, setDonor] = useState({
        name: "Keanu Reeves",
        business: false,
        status: "prospect",
        expected_dontation: 10000,
    })

    const [phones, setPhones] = useState([
        { id: 1, phone_number: "+13214567890", category: "cell" },
        { id: 2, phone_number: "+15555555555", category: "work" }
    ])

    const [emails, setEmails] = useState([
        { id: 1, email_address: "johnnysilverhands@email.com" },
        { id: 2, email_address: "neo@theone.org" }
    ])

    return (
        <main className="donorMainContainer">
            <span className="addDonorNavLinks">
                <Link to={"/fundraising"}>dashboard</Link>
                <p> - </p>
                <Link to={"/fundraising/donors"}>donors</Link>
                <p> - </p>
                <p>{donor.name}</p>
            </span>
            <div className="donorCoreInfo">
                <h1>{donor.name}</h1>
                <p>{"business" ? donor.business : null}</p>
                <p>status: {donor.status}</p>
                <p>expected donation:
                    <strong>
                        {" "}${donor.expected_dontation}
                    </strong>
                </p>
            </div>
            <div>
                <span className="d-flex align-items-center">
                    <h2>phones</h2>
                    <p className="addButton">+</p>
                </span>
                {phones.map((phone) => {
                    return <DonorPhoneEntry key={phone.id} phone={phone} />
                })}
            </div>
            <div>
                <span className="d-flex align-items-center">
                    <h2>emails</h2>
                    <p className="addButton">+</p>
                </span>
                {emails.map((email) => {
                    return <DonorEmailEntry key={email.id} email={email} />
                })
                }
            </div>
        </main>
    )
}

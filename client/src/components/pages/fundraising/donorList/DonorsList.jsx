import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

import DonorListEntry from "./DonorListEntry"

import "./DonorsList.css"

export default function DonorsList() {

    const navigate = useNavigate()

    const [donors, setDonors] = useState([
        { selected: false, email: "johnwick@email.com", phone: "(123) 456-7890", id: 1, name: "John Wick", business: false, expected_amount: 1000, status: "prospect" },
        { selected: false, email: "jbauer@ctu.gov", phone: "(242) 424-2424", id: 2, name: "Jack Bauer", business: false, expected_amount: 500, status: "donor" },
        { selected: false, email: "diehard@email.com", phone: "(987) 151-6546", id: 3, name: "John McClane", business: false, expected_amount: 1000, status: "prospect" },
        { selected: false, email: "N/A", phone: "N/A", id: 4, name: "Innotech Inc.", business: true, expected_amount: 5000, status: "prospect" },
        { selected: false, email: "N/A", phone: "N/A", id: 5, name: "Globex Corp.", business: true, expected_amount: 10000, status: "super donor" }
    ])

    return (
        <div className="donorListComponent">
            <span className="addDonorNavLinks">
                <Link to={"/fundraising"}>dashboard</Link>
                <p> - </p>
                <p>donors</p>
            </span>
            <span className="donorTopSection">
                <Button onClick={() => navigate("/fundraising/add-donor")} className="donorTopSectionButton" variant="primary">Add Donor</Button>
            </span>
            <div className="donorListContainer">
                <span className="donorListEntryContainer">
                    <p className="donorListHeader"><strong>selected?</strong></p>
                    <p className="donorListHeader"><strong>name</strong></p>
                    <p className="donorListHeader"><strong>business?</strong></p>
                    <p className="donorListHeader"><strong>status</strong></p>
                    <p className="donorListHeader"><strong>expected donation</strong></p>
                    <p className="donorListHeader"><strong>email</strong></p>
                    <p className="donorListHeader"><strong>phone</strong></p>
                </span>
                {donors.map((donor) => {
                    return <DonorListEntry donor={donor} callback={setDonors} />
                })}
            </div>
        </div>
    )
}

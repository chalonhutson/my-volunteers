import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"

import DonorListEntry from "./DonorListEntry"

import "./DonorsList.css"

export default function DonorsList() {

    const [donors, setDonors] = useState([
        { id: 1, name: "John Wick", business: false, expected_amount: 1000, status: "prospect" },
        { id: 2, name: "Jack Bauer", business: false, expected_amount: 500, status: "donor" },
        { id: 3, name: "John McClane", business: false, expected_amount: 1000, status: "prospect" },
        { id: 4, name: "Innotech Inc.", business: true, expected_amount: 5000, status: "prospect" },
        { id: 5, name: "Globex Corp.", business: true, expected_amount: 10000, status: "super donor" }
    ])
    return (
        <div>
            <span className="donorTopSection">
                <Button className="donorTopSectionButton" variant="primary">Add Donor</Button>
            </span>
            <div className="donorListContainer">
                {donors.map((donor) => {
                    return <DonorListEntry donor={donor} />
                })}
            </div>
        </div>
    )
}

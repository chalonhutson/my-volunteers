import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"

export default function DonorsList() {

    const [donors, setDonors] = useState([

    ])
    return (
        <div>
            <span className="donorTopSection">
                <Button className="donorTopSectionButton" variant="primary">Add Donor</Button>
            </span>
            <div className="donorListContainer">

            </div>
        </div>
    )
}

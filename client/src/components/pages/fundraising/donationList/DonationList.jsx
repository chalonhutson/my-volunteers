import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

import DonationListEntry from "./DonationListEntry"

import NavLinks from "../../../NavLinks"

import "./DonationList.css"

export default function DonationList() {

    const navigate = useNavigate()

    const [donations, setDonations] = useState([
        { id: 1, name: "John Doe", date: "2021-01-01", amount: 100.00 },
        { id: 2, name: "Jane Doe", date: "2021-01-01", amount: 100.00 },
        { id: 3, name: "John Smith", date: "2021-01-01", amount: 100.00 },
    ])

    return (
        <div className="donationListComponent">
            <NavLinks links={[
                { name: "dashboard", path: "/fundraising", active: true },
                { name: "donations", path: "/fundraising/donations", active: false }
            ]} />
            <span className="donationTopSection">
                <Button onClick={() => navigate("/fundraising/add-donation")} className="donationTopSectionButton" variant="primary">Add Donation</Button>
            </span>
            <div className="donationListContainer">
                <span className="donationListEntryContainer">
                    <p className="donationListHeader">selected?</p>
                    <p className="donationListHeader"><strong>name</strong></p>
                    <p className="donationListHeader"><strong>date</strong></p>
                    <p className="donationListHeader"><strong>amount</strong></p>
                </span>
                {donations.map((donation) => {
                    return <DonationListEntry
                        key={donation.id}
                        donation={donation} callback={setDonations} />
                })}
            </div>
        </div>
    )
}
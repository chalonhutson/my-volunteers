import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

import DonationListEntry from "./DonationListEntry"

import "./DonationList.css"

export default function DonationList() {

    const navigate = useNavigate()

    const [donations, setDonations] = useState([
        { selected: false, id: 1, name: "John Wick", amount: 1000, date: "December 21, 2023" },
        { selected: false, id: 2, name: "Jack Bauer", amount: 500, date: "December 21, 2023" }
    ])

    return (
        <div className="donationListComponent">
            <span className="addDonationNavLinks">
                <Link to={"/fundraising"}>dashboard</Link>
                <p> - </p>
                <p>donors</p>
            </span>
            <span className="donationTopSection">
                <Button onClick={() => navigate("/fundraising/add-donation")} className="donationTopSectionButton" variant="primary">Add Donation</Button>
            </span>
            <div className="donationListContainer">
                <span className="donationListEntryContainer">
                    <p className="donationListHeader"><strong>selected?</strong></p>
                    <p className="donationListHeader"><strong>name</strong></p>
                    <p className="donationListHeader"><strong>business?</strong></p>
                    <p className="donationListHeader"><strong>status</strong></p>
                    <p className="donationListHeader"><strong>expected donation</strong></p>
                    <p className="donationListHeader"><strong>email</strong></p>
                    <p className="donationListHeader"><strong>phone</strong></p>
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
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import "../../../../../css/fundraising/dashboard/dashboardRecentDonations.css"

import DashboardRecentDonationSingle from "./DashboardRecentDonationSingle"

export default function DashboardRecentDonations() {

    const navigate = useNavigate()

    const [donations, setDonations] = useState([
        { id: 1, date: "December 21, 2023", id: 1, name: "John Doe", amount: 100 },
        { id: 2, date: "December 21, 2023", id: 2, name: "Jane Doe", amount: 200 },
        { id: 3, date: "December 20, 2023", id: 3, name: "John Smith", amount: 300 },
        { id: 4, date: "December 19, 2023", id: 4, name: "Jane Smith", amount: 400 },
        { id: 5, date: "December 11, 2023", id: 5, name: "John Doe", amount: 500 }
    ])


    return (
        <Card className="recentDonationsContainer">
            <h4>Recent Donations</h4>
            {donations.map(donation => (
                <DashboardRecentDonationSingle
                    key={donation.id}
                    donation={donation}
                />
            ))}
            <p onClick={() => navigate("/fundraising/donations")} className="showMore">View All Donations</p>
        </Card>
    )
}

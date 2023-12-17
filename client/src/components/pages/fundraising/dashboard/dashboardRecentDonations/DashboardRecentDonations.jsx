import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"

import "../../../../../css/fundraising/dashboard/dashboardRecentDonations.css"

import DashboardRecentDonationSingle from "./DashboardRecentDonationSingle"

export default function DashboardRecentDonations() {

    const [donations, setDonations] = useState([
        { date: "December 21, 2023", id: 1, name: "John Doe", amount: 100 },
        { date: "December 21, 2023", id: 2, name: "Jane Doe", amount: 200 },
        { date: "December 20, 2023", id: 3, name: "John Smith", amount: 300 },
        { date: "December 19, 2023", id: 4, name: "Jane Smith", amount: 400 },
        { date: "December 11, 2023", id: 5, name: "John Doe", amount: 500 }
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
            <p className="showMore">View All Donations</p>
        </Card>
    )
}

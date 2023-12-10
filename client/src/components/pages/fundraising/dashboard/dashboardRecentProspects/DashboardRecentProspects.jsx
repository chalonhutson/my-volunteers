import { useState } from "react"
import { Card } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import "../../../../../css/fundraising/dashboard/dashboardRecentProspects.css"

import DashboardRecentProspectSingle from "./DashboardRecentProspectSingle"

export default function DashboardRecentProspects() {

    const navigate = useNavigate()

    const [prospects, setProspects] = useState([
        { id: 1, name: "Jeff Wineger", owner: "Steve Smith" },
        { id: 2, name: "Britta Perry", owner: "Steve Smith" },
        { id: 3, name: "Abed Nadir", owner: "Steve Smith" },
        { id: 4, name: "Troy Barnes", owner: "Steve Smith" },
        { id: 5, name: "Annie Edison", owner: "Steve Smith" }
    ])

    return (
        <Card className="recentProspectsContainer">
            <h4>Recent Prospects</h4>
            {prospects.map(prospect => (
                <DashboardRecentProspectSingle prospect={prospect} />
            ))}
            <p onClick={() => navigate("/fundraising/donors")} className="showMore">View All Donors</p>
        </Card>
    )
}

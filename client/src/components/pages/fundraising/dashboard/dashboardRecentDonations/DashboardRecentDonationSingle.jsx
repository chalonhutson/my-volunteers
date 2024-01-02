import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function DashboardRecentDonationSingle({ donation }) {

    const navigate = useNavigate()

    return (
        <Card
            className="recentDonationSingleContainer"
            onClick={() => navigate(`/fundraising/donation/${donation.id}`)}
        >
            <h4>{donation.name}</h4>
            <p>{donation.date}</p>
            <h2>${donation.amount}</h2>
        </ Card>
    )
}

import { Card } from "react-bootstrap"

export default function DashboardRecentDonationSingle({ donation }) {
    return (
        <Card className="recentDonationSingleContainer">
            <h4>{donation.name}</h4>
            <p>{donation.date}</p>
            <h2>${donation.amount}</h2>
        </Card>
    )
}

import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function DashboardRecentProspectSingle({ prospect }) {

    const navigate = useNavigate()

    return (
        <Card
            className="recentProspectSingleContainer"
            onClick={() => navigate(`/fundraising/donors/${prospect.id}`)}
        >
            <h4>{prospect.name}</h4>
            <p>Owner: {prospect.owner}</p>
        </Card>
    )
}

import { Card } from "react-bootstrap"

export default function DashboardRecentProspectSingle({ prospect }) {
    return (
        <Card className="recentProspectSingleContainer">
            <h4>{prospect.name}</h4>
            <p>Owner: {prospect.owner}</p>
        </Card>
    )
}

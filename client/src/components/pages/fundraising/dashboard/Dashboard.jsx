import React from 'react'
import DashboardTasks from './dashboardTasks/DashboardTasks'
import DashboardRecentDonations from './dashboardRecentDonations/DashboardRecentDonations'

import "../../../../css/fundraising/dashboard/Dashboard.css"
import DashboardDonationGoal from './dashboardDonationGoal/DashboardDonationGoal'
import DashboardRecentProspects from './dashboardRecentProspects/DashboardRecentProspects'

export default function Dashboard() {
    return (
        <div>
            Dashboard
            <div className="dashboardContainer">
                <DashboardTasks />
                <div>
                    <DashboardRecentDonations />
                    <DashboardRecentProspects />
                    <DashboardDonationGoal />
                </div>
            </div>

        </div>
    )
}

import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "../../../../../css/fundraising/dashboard/DashboardDonationGoal.css"

export default function DashboardDonationGoal() {
    return (
        <Card className="donationGoalContainer">
            <h4>Donation Goal</h4>
            <span className="goalInfoContainer mt-3">
                <CircularProgressbar value={66} text={"66%"} styles={buildStyles({ pathColor: "var(--primary-color)", textColor: "var(--primary-color)" })} />
                <div className="goalMetrics">
                    <p><strong>Goal:</strong> $10,000</p>
                    <p><strong>Current:</strong> $6600</p>
                    <p><strong>Remaining:</strong> $3400</p>
                </div>
            </span>
            <p className="showMore mt-3">Set Donation Goal</p>
        </Card>
    )
}

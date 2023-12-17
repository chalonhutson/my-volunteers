import { useState, useEffect, useRef } from "react"
import { Card } from "react-bootstrap"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "../../../../../css/fundraising/dashboard/DashboardDonationGoal.css"

export default function DashboardDonationGoal() {

    const [editDonationGoal, setEditDonationGoal] = useState(false)

    const [donationGoal, setDonationGoal] = useState(10000)

    const [donationCurrent, setDonationCurrent] = useState(6600)

    const newDonationGoalRef = useRef()

    function attemptSetDonationGoal() {
        if (editDonationGoal) {
            console.log(newDonationGoalRef.current.value)
            setEditDonationGoal(false)
        } else {
            setEditDonationGoal(true)
        }
    }

    return (
        <Card className="donationGoalContainer">
            <h4>Donation Goal</h4>
            <span className="goalInfoContainer mt-3">
                <CircularProgressbar value={66} text={"66%"} styles={buildStyles({ pathColor: "var(--primary-color)", textColor: "var(--primary-color)" })} />
                {
                    editDonationGoal ?
                        <div className="goalMetrics">
                            <input
                                ref={newDonationGoalRef}
                                className="goalInput w-75" type="number" value={donationGoal} onChange={(e) => setDonationGoal(e.target.value)} />
                            <p><strong>Current:</strong> ${donationCurrent}</p>
                            <p><strong>Remaining:</strong> $3400</p>
                        </div>
                        :
                        <div className="goalMetrics">
                            <p><strong>Goal:</strong> ${donationGoal}</p>
                            <p><strong>Current:</strong> ${donationCurrent}</p>
                            <p><strong>Remaining:</strong> $3400</p>
                        </div>
                }
            </span>
            <p
                onClick={() => attemptSetDonationGoal()}
                className="showMore mt-3">Set Donation Goal</p>
        </Card>
    )
}

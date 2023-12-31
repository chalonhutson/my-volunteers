import { useState, useEffect } from "react"

import "../../../../../css/fundraising/dashboard/DashboardTaskSingle.css"
import { Button, Card } from "react-bootstrap"

export default function DashboardTaskSingle({ task }) {
    return (
        <Card className="cardContainer">
            <div className="topTaskSection">
                <h2>{task.title}</h2>
                <p>{task.type}</p>
            </div>
            <div className="middleTaskSection">
                <p>Due Date: {task.due_date}</p>
            </div>
            <div className="bottomTaskSection">
                <p>{task.owner}</p>
                <Button variant={
                    task.status === "Completed" ? "success" :
                        task.status === "Overdue" ? "danger" :
                            task.status === "To Do" ? "warning" :
                                task.status === "In Progress" ? "info" :
                                    "secondary"
                } size="sm">{task.status}</Button>
            </div>
        </Card>
    )
}

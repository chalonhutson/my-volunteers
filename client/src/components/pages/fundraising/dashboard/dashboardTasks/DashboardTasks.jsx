import { useState, useEffect } from "react"
import { Dropdown, ProgressBar, Card } from "react-bootstrap"


import "../../../../../css/fundraising/dashboard/DashboardTasks.css"
import DashboardTaskSingle from "./DashboardTaskSingle"

export default function DashboardTasks() {

    const [numOfDisplayedTasks, setNumOfDisplayedTasks] = useState(3)

    const [tasks, setTasks] = useState([
        { id: 1, owner: "Bill Nye", title: "Follow up with John Wick", due_date: "December 23", type: "Reminder", status: "Completed" },
        { id: 2, owner: "Fred Flint", title: "Sit down with Elon Musk", due_date: "December 23", type: "In Person", status: "Overdue" },
        { id: 3, owner: "Bill Nye", title: "Send email to Jeff Bezos", due_date: "December 23", type: "Email", status: "Completed" },
        { id: 4, owner: "Bill Nye", title: "Invite Johnson Smith to office", due_date: "December 24", type: "Call", status: "To Do" },
        { id: 5, owner: "Steve Smith", title: "Plan donor dinner", due_date: "December 24", type: "In Person", status: "To Do" },
        { id: 6, owner: "Bill Nye", title: "Send email to Jeff Bezos", due_date: "December 24", type: "Email", status: "To Do" },
    ])

    // Used for dates selector
    const [dates, setDates] = useState([
        { selected: true, weekday: "Sunday", number: 23 },
        { selected: false, weekday: "Monday", number: 24 },
        { selected: false, weekday: "Tuesday", number: 25 },
        { selected: false, weekday: "Wednesday", number: 26 },
        { selected: false, weekday: "Thursday", number: 27 },
        { selected: false, weekday: "Friday", number: 28 },
        { selected: false, weekday: "Saturday", number: 29 }
    ])

    // Sets standard dates for develop. Update later to grab specific dates from API.
    // useEffect(() => {
    //     setDates([
    //         { selected: true, weekday: "Sunday", number: 23 },
    //         { selected: false, weekday: "Monday", number: 24 },
    //         { selected: false, weekday: "Tuesday", number: 25 },
    //         { selected: false, weekday: "Wednesday", number: 26 },
    //         { selected: false, weekday: "Thursday", number: 27 },
    //         { selected: false, weekday: "Friday", number: 28 },
    //         { selected: false, weekday: "Saturday", number: 29 }
    //     ])
    // }, [])

    function TaskProgressBar() {
        const now = 60;

        return <ProgressBar now={now} variant="success" />
    }

    function handleNumOfDisplayedTasksChange(e) {
        setNumOfDisplayedTasks(numOfDisplayedTasks + 3)
    }

    return (
        <div className="dashboardTasksContainer">
            <Card className="topSection">
                <div className="progressContainer">
                    <div className="topProgressContainer">
                        <p>8 tasks complete out of 10</p>
                    </div>
                    {TaskProgressBar()}
                </div>
                <div className="tasksContainer">
                    <h4>December 23, 2023</h4>
                    <span className="d-flex justify-content-evenly dateSelectorContainer">
                        {dates && dates.map((date, index) => {
                            return (
                                <span key={index} className="dateSelector">
                                    <p className="weekday">{date.weekday}</p>
                                    <p className={date.selected ? "number selected" : "number"}>{date.number}</p>
                                </span>
                            )
                        })}
                    </span>
                    <div className="tasksSingleContainer">
                        {tasks.map((task, index) => {
                            if (index >= numOfDisplayedTasks) return null
                            return (
                                <DashboardTaskSingle key={index} task={task} />
                            )
                        })}
                    </div>
                </div>
                {
                    numOfDisplayedTasks >= tasks.length ?
                        (
                            <h4
                                className="d-flex justify-content-center"
                            >
                                No more tasks to show
                            </h4>
                        )
                        :
                        (
                            <h4
                                className="showMore"
                                onClick={handleNumOfDisplayedTasksChange}
                            >
                                Show More
                            </h4>
                        )
                }
                {/* <h4
                    className="showMore"
                    onClick={handleNumOfDisplayedTasksChange}
                >
                    Show More
                </h4> */}
            </Card>
        </div>
    )
}

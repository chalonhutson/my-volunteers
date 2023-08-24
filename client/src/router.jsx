import { Outlet, createBrowserRouter } from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import Volunteers from "./components/pages/Volunteers"
import Events from "./components/pages/Events"
import AddEvent from "./components/pages/AddEvent"
import AddVolunteer from "./components/pages/AddVolunteer"

export const router = createBrowserRouter([
    {
        element: <NavLayout />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "/volunteers", element: <Volunteers /> },
            { path: "/events", element: <Events /> },
            { path: "/add-event", element: <AddEvent /> },
            { path: "/add-volunteer", element: <AddVolunteer /> },
        ]
    }
])

function NavLayout() {
    return <>
        <Outlet />
    </>
}
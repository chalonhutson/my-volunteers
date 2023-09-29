import { Outlet, createBrowserRouter } from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import Volunteers from "./components/pages/Volunteers"
import Events from "./components/pages/Events"
import AddEvent from "./components/pages/AddEvent"
import AddVolunteer from "./components/pages/AddVolunteer"
import Login from "./components/pages/Login"
import { RequireAuth } from "react-auth-kit"

export const router = createBrowserRouter([
    {
        element: <NavLayout />,
        children: [
            {
                path: "/",
                element: (
                    <RequireAuth loginPath="/login">
                        <Dashboard />
                    </RequireAuth>
                )
            },
            { path: "/login", element: <Login /> },
            {
                path: "/volunteers",
                element: (
                    <RequireAuth loginPath="/login">
                        <Volunteers />
                    </RequireAuth>
                )
            },
            {
                path: "/events",
                element: (
                    <RequireAuth loginPath="/login">
                        <Events />
                    </RequireAuth>
                )
            },
            {
                path: "/add-event",
                element: (
                    <RequireAuth loginPath="/login">
                        <AddEvent />
                    </RequireAuth>
                )
            },
            {
                path: "/add-volunteer",
                element: (
                    <RequireAuth loginPath="/login">
                        <AddVolunteer />
                    </RequireAuth>
                )
            },
        ]
    }
])

function NavLayout() {
    return <>
        <Outlet />
    </>
}
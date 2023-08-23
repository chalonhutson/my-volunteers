import { Outlet, createBrowserRouter } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Volunteers from "./components/Volunteers"
import Events from "./components/Events"

export const router = createBrowserRouter([
    {
        element: <NavLayout />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "/volunteers", element: <Volunteers /> },
            { path: "/events", element: <Events /> }
        ]
    }
])

function NavLayout() {
    return <>
        <Outlet />
    </>
}
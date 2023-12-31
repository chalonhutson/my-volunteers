import { Outlet, createBrowserRouter } from "react-router-dom"

import Dashboard from "./components/pages/Dashboard"
import Volunteers from "./components/pages/Volunteers"
import Events from "./components/pages/Events"
import AddEvent from "./components/pages/AddEvent"
import AddVolunteer from "./components/pages/AddVolunteer"
import UpdateVolunteer from "./components/pages/UpdateVolunteer"
import UpdateEvent from "./components/pages/UpdateEvent"
import Login from "./components/pages/Login"
import Navbar from "./components/Navbar"
import Settings from "./components/pages/Settings"

import Fundraising from "./components/pages/fundraising/Fundraising"

import { RequireAuth } from "react-auth-kit"
import DonorsList from "./components/pages/fundraising/donorList/DonorsList"


import AddDonor from "./components/pages/fundraising/donorList/addDonor/AddDonor"
import Donor from "./components/pages/fundraising/donor/Donor"

import DonationList from "./components/pages/fundraising/donationList/DonationList"
import Donation from "./components/pages/fundraising/donation/Donation"

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
            {
                path: "/volunteers/:volunteerId",
                element: (
                    <RequireAuth loginPath="/login">
                        <UpdateVolunteer />
                    </RequireAuth>
                )
            },
            {
                path: "/events/:eventId",
                element: (
                    <RequireAuth loginPath="/login">
                        <UpdateEvent />
                    </RequireAuth>
                )
            },
            {
                path: "/fundraising",
                element: (
                    // <RequireAuth loginPath="/login">
                    <Fundraising />
                    // </RequireAuth>
                )
            },
            {
                path: "/fundraising/donors",
                element: (
                    // <RequireAuth loginPath="/login">
                    <DonorsList />
                    // </RequireAuth>
                )
            },
            {
                path: "/fundraising/donors/:donorId",
                element: (
                    // <RequireAuth loginPath="/login">
                    <Donor />
                    // </RequireAuth>
                )
            },
            {
                path: "/fundraising/add-donor",
                element: (
                    // <RequireAuth loginPath="/login">
                    <AddDonor />
                    // </RequireAuth>
                )
            },
            {
                path: "/fundraising/donations",
                element: (
                    // <RequireAuth loginPath="/login">
                    <DonationList />
                    // </RequireAuth>
                )
            },
            {
                path: "/fundraising/donation/:donationId",
                element: (
                    // <RequireAuth loginPath="/login">
                    <Donation />
                    // </RequireAuth>
                )
            },
            {
                path: "/settings",
                element: (
                    <RequireAuth loginPath="/login">
                        <Settings />
                    </RequireAuth>
                )
            }
        ]
    }
])

function NavLayout() {
    return <>
        <Navbar />
        <Outlet />
    </>
}
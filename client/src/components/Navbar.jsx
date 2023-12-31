import { Link, useLocation } from "react-router-dom"
import { useSignOut, useIsAuthenticated } from "react-auth-kit"

import "../css/Navbar.css"
import { toast } from "react-toastify"

export default function Navbar() {

    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()

    const location = useLocation().pathname

    function handleSignOut() {
        signOut()
        toast.success("You have successfully logged out.")
    }

    if (isAuthenticated()) {

        return (
            <nav className="mb-3 navbar navbar-expand-lg">
                <div className="container-fluid navContainer">
                    <Link className="navTitle" href="/">My Volunteers</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navLinkContainer" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    className={location === "/" ? "nav-link navHeader active" : "nav-link navHeader"}
                                    aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={
                                        location === "/fundraising" ? "nav-link navHeader active" : "nav-link navHeader"
                                    }
                                    to="/fundraising"
                                >
                                    Fundraising
                                </Link>

                            </li>
                            <li className="nav-item">
                                <Link
                                    className={
                                        location === "/volunteers" ? "nav-link navHeader active" : "nav-link navHeader"
                                    }
                                    to="/volunteers"
                                >
                                    Volunteers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={
                                        location === "/events" ? "nav-link navHeader active" : "nav-link navHeader"
                                    }
                                    to="/events"
                                >
                                    Events
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={
                                        location === "/settings" ? "nav-link navHeader active" : "nav-link navHeader"
                                    }
                                    to="/settings"
                                >
                                    Settings
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link navHeader"
                                    onClick={() => handleSignOut()}
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        )
    } else {
        return (
            <nav className="mb-3 navbar navbar-expand-lg">
                <div className="container-fluid navContainer">
                    <Link className="navTitle" href="/">My Volunteers</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navLinkContainer" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    className="nav-link navHeader"
                                    aria-current="page" to="/login">
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        )
    }
}

import { Form, Button } from "react-bootstrap"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { useRef } from "react"

import { toast } from "react-toastify"

import { useAuthHeader, useSignOut } from "react-auth-kit"

import "../../css/Settings.css"

export default function Settings() {

    const authHeader = useAuthHeader()
    const signOut = useSignOut()

    const currentPasswordRef = useRef()
    const newPasswordRef = useRef()
    const confirmNewPasswordRef = useRef()

    const newEmailRef = useRef()

    function handlePasswordChange() {

        if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
            toast.error("Passwords do not match")
            return
        }

        fetch("/api/users/change-password", {
            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                current_password: currentPasswordRef.current.value,
                new_password: newPasswordRef.current.value
            })
        })
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    toast.error("Password change failed")
                    return res.json()

                } else {
                    signOut()
                    toast.success("Password changed successfully. Please login again.")
                }
            })
    }


    function handleEmailChange() {

        fetch("/api/users/change-email", {
            method: "PUT",
            headers: {
                "Authorization": authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                new_email: newEmailRef.current.value
            })
        })
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    toast.error("Email change failed")
                    return res.json()

                } else {
                    signOut()
                    toast.success("Email changed successfully. Please login again.")
                }
            })

    }



    return (
        <main>
            <h1>Settings</h1>
            <div className="cardLarge">
                <Tabs
                    defaultActiveKey="changePassword"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fill
                    variant="pills"
                >
                    <Tab
                        eventKey="changePassword"
                        title="Change Password"
                        className="changeTab"

                    >
                        <div className="changeContainer">
                            <h3>Change Password</h3>
                            <div>
                                <Form.Control className="mb-3" ref={currentPasswordRef} type="password" placeholder="Current Password" />
                                <Form.Control className="mb-3" ref={newPasswordRef} type="password" placeholder="New Password" />
                                <Form.Control className="mb-3" ref={confirmNewPasswordRef} type="password" placeholder="Confirm New Password" />
                                <button onClick={() => handlePasswordChange()} className="changeBtn">Update Password</button>
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        eventKey="changeEmail"
                        title="Change Email"
                    >
                        <div className="changeContainer">
                            <h3>Change Email</h3>
                            <div>
                                <Form.Control ref={newEmailRef} className="mb-3" type="email" placeholder="New Email" />
                                <button onClick={() => handleEmailChange()} className="changeBtn">Update Email</button>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </main>
    )
}

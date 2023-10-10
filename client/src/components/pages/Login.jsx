import { useRef } from "react"
import { useSignIn } from "react-auth-kit"
import { redirect, useNavigate } from "react-router-dom"

import { toast } from 'react-toastify'

import "../../css/Login.css"

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const signIn = useSignIn()
    const navigate = useNavigate()

    function loginHandler(e) {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        console.log("attempting login")

        fetch("http://localhost:5000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                if (!res.ok) {
                    // throw new Error("Network response was not ok")
                    toast.error("Your email or password is incorrect.")
                    return
                }
                return res.json()
            })
            .then(data => {
                console.log("Signing in.")
                signIn(
                    {
                        token: data.access_token,
                        tokenType: "Bearer",
                        expiresIn: 3600,
                        authState: { email: data.email }
                    }
                )
                toast.success("You have successfully logged in.")
                navigate("/")
            })

    }

    return (
        <div>
            <div className="loginContainer">
                <h1>Login</h1>
                <form onSubmit={(e) => loginHandler(e)}>
                    <div className="loginInput">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="loginInput">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password" />
                    </div>
                    <button className="mt-3 btn btn-primary" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

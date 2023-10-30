import { useRef } from "react"
import { useSignIn, useAuthHeader } from "react-auth-kit"
import { redirect, useNavigate } from "react-router-dom"

import { toast } from 'react-toastify'

import "../../css/Login.css"

export default function Login() {

    const authHeader = useAuthHeader()

    const signupEmailRef = useRef()
    const signupPasswordRef = useRef()
    const signupPasswordConfirmRef = useRef()

    const emailRef = useRef()
    const passwordRef = useRef()
    const signIn = useSignIn()
    const navigate = useNavigate()

    function createUserHandler(e) {
        e.preventDefault()
        const email = signupEmailRef.current.value
        const password = signupPasswordRef.current.value
        const passwordConfirm = signupPasswordConfirmRef.current.value

        if (password !== passwordConfirm) {
            toast.error("Passwords do not match.")
            return
        }

        fetch("/api/users", {
            method: "POST",
            headers: {
                "Authorization": authHeader(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok")
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                toast.success("You have successfully created an account.")
                navigate("/login")
            })
            .catch(err => {
                console.log(err)
                toast.error("There was an error creating your account.")
            })
    }


    function loginHandler(e) {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        console.log("attempting login")

        fetch("/api/login", {
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
        <main>



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
                    <p>No account? Create one <a href="" data-bs-toggle="modal" data-bs-target="#signupModal">here.</a></p>
                </form>
            </div>

            <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Signup</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><small>This app is still being developed, and we do not verify an email. Therefore you do not have to sign up with an actual email account.</small></p>
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                ref={signupEmailRef}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter an email"
                            />
                            <label className="form-label mt-3" htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                ref={signupPasswordRef}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter a password" />
                            <input
                                className="form-control mt-2"
                                ref={signupPasswordConfirmRef}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Reconfirm" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={(e) => createUserHandler(e)} type="button" className="btn btn-primary">Create User</button>
                        </div>
                    </div>
                </div>
            </div>

        </main >
    )
}

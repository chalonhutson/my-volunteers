import { useRef } from 'react'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()

    function loginHandler(e) {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        console.log(email, password)

        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    window.location.href = "/"
                }
            })
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input ref={emailRef} type="email" name="email" id="email" placeholder="Enter your email" />
                <br></br>
                <br></br>
                <label htmlFor="password">Password</label>
                <input ref={passwordRef} type="password" name="password" id="password" placeholder="Enter your password" />
                <br></br>
                <br></br>
                <button onClick={(e) => loginHandler(e)} className="btn btn-primary" type="submit">Login</button>
            </form>
        </div>
    )
}

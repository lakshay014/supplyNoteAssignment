
import React, { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("sending")
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })

    })
    const data = res.json();
    console.log(JSON.stringify(data));

    if (res.status === 200) {


    }

  }



  return (
    <div className="Auth-form-container">
      <form action="/login" className="Auth-form" method="POST">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email" name="email"
              className="form-control mt-1"
              placeholder="Enter email" onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password" name="password"
              className="form-control mt-1"
              placeholder="Enter password" onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={loginUser}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot password?
          </p>
        </div>
      </form>
    </div>
  )

}

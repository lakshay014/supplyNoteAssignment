import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;

    const resp = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });

    const data = await resp.json();

    console.log(data);
    if (resp.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else if (resp.status === 201) {
      window.alert("Registration Successful");
      console.log("registeration successful");

      navigate('/login');
    } else if (resp.status === 409) {
      window.alert("Email already exist");
    } else if (resp.status === 401) {
      window.alert("Password & confirm password doesn't match");
    }
  };

  return (
    <div >
      <h1 className="text-center mt-4">Sign Up</h1>

      <div className="container">
        <form method="POST">
          <div class="form-group">
            <label >Your Name</label>
            <input
              type="text"
              name="name"
              class="form-control"
              value={user.name}
              onChange={handleInputs}
              placeholder="Enter your Name"
            />
          </div>

          <div class="form-group">
            <label >Email address</label>
            <input
              type="email"
              name="email"
              class="form-control"
              value={user.email}
              onChange={handleInputs}
              placeholder="Enter your email"
            />

          </div>
          <div class="form-group">
            <label >Password</label>
            <input
              type="password"
              class="form-control"
              name="password"

              value={user.password}
              onChange={handleInputs}
              placeholder="Enter your password"
            />
          </div>
          <div class="form-group">
            <label >Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              class="form-control"

              value={user.cpassword}
              onChange={handleInputs}
              placeholder="Re-enter password"
            />
          </div>


          <div className="text-center">
            <button
              type="submit"
              onClick={postData}
              class="btn btn-primary  m-4"
            >
              Register
            </button>
          </div>
          <p className="text-center">Already Registered?</p>
          <div className="text-center">
            <button class="btn btn-primary  m-4" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register;
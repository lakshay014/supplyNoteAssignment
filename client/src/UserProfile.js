import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const callProfilePage = async () => {
    try {
      const res = await fetch('http://localhost:3000/userProfile', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        // credentials: "include"
      });
      // const res = await fetch('http://localhost:3000/userProfile');
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!res.status === 200)
        throw new Error(res.error);

    } catch (error) {
      console.log(error)
      navigate('/login');
    }

  }
  useEffect(() => {
    callProfilePage();
  }, []);
  return (
    <div>
      <h1 className="text-center mt-4">Profile</h1>

      <div className="text-center">
        <form method="GET" >
          <div class="form-group" >
            <h2>Hi {userData.name}</h2>
            <p>{userData.email}</p>
          </div>
        </form><button type="submit" class="btn btn-primary  m-4" onClick={() => navigate('/urls')} >
          Generate short Links
        </button>
        <div className="text-center">
          <button class="btn btn-primary  m-4" onClick={() => navigate('/logout')}>
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}
export default UserProfile;
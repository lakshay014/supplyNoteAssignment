import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Logout = () => {

  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:3000/logout', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((res) => {
      navigate('/login', { replace: true });
      if (res.status !== 200) {
        const err = new Error(res.error);
        throw err;
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div><h2>User logged out!!</h2></div>
  )
}
export default Logout;
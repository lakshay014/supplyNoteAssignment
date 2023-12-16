import React, { useState } from "react";
//import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css"
const Link = () => {
  const [shortlinks, setShortlinks] = useState({
    full: "",
    short: "",
    clicks: ""
  }
  );

  const [currentlink, setCurrentLink] = useState({
    full: "",
    short: "",
    clicks: ""
  });
  const navigate = useNavigate();
  const updateClicks = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/update', {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ short: currentlink.short }),
    })

    const data = res.json();
    if (res.status === 202)
      console.log(data.message)
    window.open(currentlink.full, '_blank')
    navigate('/urls')
  }


  const generateLink = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/shortUrls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full: shortlinks.full

      })

    })
    const data = await res.json();
    setCurrentLink({ full: data.full, short: data.short, clicks: data.clicks });
    const a = document.getElementById("link");
    a.setAttribute("href", data.full);
  }

  return (
    <div className="container">
      <h1>Generate short links</h1>
      <form action="/shortUrls" method="POST" className="my-4 form-inline">
        <label for="fullUrl" className="sr-only">Url</label>
        <input required placeholder="Url" type="url" name="fullUrl" id="fullUrl" onChange={(e) => setShortlinks({ full: e.target.value })} class="form-control col mr-2" />
        <button className="btn btn-success" type="submit" onClick={generateLink}>Create</button>
      </form>
      <div className="text-center">
        <a id="link" onClick={updateClicks}>{currentlink.short} </a>
        <p>  Clicks: {currentlink.clicks}</p>
      </div>

    </div>
  )
}
export default Link;
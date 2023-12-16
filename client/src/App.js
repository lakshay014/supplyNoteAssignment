
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import UserProfile from "./UserProfile";
import Logout from "./Logout";
import Link from "./Link";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/urls" element={<Link />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

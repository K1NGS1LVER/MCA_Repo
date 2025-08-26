import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Editor from "./components/Editor";
import Feedback from "./components/Feedback";
import CSVEditor from "./components/CSVEditor";
import About from "./pages/About";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/csv-editor" element={<CSVEditor />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

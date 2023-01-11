import Container from "@mui/material/Container";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Components/Navbar/Index";
import { ModalProvider } from "./contexts/ModalContext";
import EventForm from "./Pages/AddEvent/Index";
import { Landing } from "./Pages/Landing/Index";
import { ProfileDashBoard } from "./Pages/Profile/Index";
import Search from "./Pages/Search/Index";

function App() {
  return (
    <>
      <ModalProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/search/:city" element={<Search />} />

            <Route path="/createEvent" element={<EventForm />} />
            <Route path="/user/:userId" element={<ProfileDashBoard />} />
          </Routes>
        </Router>
      </ModalProvider>
    </>
  );
}

export default App;

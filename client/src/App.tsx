import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Modals } from "./Components/Common/Modals";
import { TextEditor } from "./Components/Common/TextEditor";
import { Navbar } from "./Components/Navbar/Index";
import { ModalProvider } from "./contexts/ModalContext";
import { AddEvent } from "./Pages/AddEvent/Index";
import EventPage from "./Pages/EventPage";
import { Landing } from "./Pages/Landing/Index";
import { Map } from "./Pages/MapPage/index";
import { ProfileDashBoard } from "./Pages/Profile/Index";
import Search from "./Pages/Search/Index";

function App() {
  return (
    <>
      <ModalProvider>
        <Router>
          <Modals />
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/search/:city" element={<Search />} />
            <Route path="/map/:cityName" element={<Map />} />
            <Route path="/createEvent" element={<AddEvent />} />
            <Route path="/user/:userId" element={<ProfileDashBoard />} />
            <Route path="/event/:eventId" element={<EventPage />} />
            <Route path="/sample" element={<TextEditor />} />
          </Routes>
        </Router>
      </ModalProvider>
    </>
  );
}

export default App;

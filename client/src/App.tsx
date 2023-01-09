import Container from "@mui/material/Container";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Components/Navbar/Index";
import { ModalProvider } from "./contexts/ModalContext";
import { Landing } from "./Pages/Landing/Index";

function App() {
  return (
    <>
      <ModalProvider>
        <Router>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </Container>
        </Router>
      </ModalProvider>
    </>
  );
}

export default App;

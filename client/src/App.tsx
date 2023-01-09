import { Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./Pages/Landing/Index";

function App() {
  return (
    <>
      <Router>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;

import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Card, CardContent, Container, Grid } from "@mui/material";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { FormOne } from "../../Components/AddEvent/FormOne";
import { FormTwo } from "../../Components/AddEvent/FormTwo";
import { ChangeEvent, useRef, useState } from "react";
import { Box } from "@mui/system";

export default function EventForm() {
  const navigate = useNavigate();

  const completeEventInformation = useRef();

  const [keywords, setKeywords] = useState([
    { tagName: "1", tagName: "bachata" },
  ]);
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    date: null,
    price: "",
    ageGroup: "",
    description: "",
    maxAttendees: "",
  });
  const [tags, setTags] = useState({
    tags: [],
    keywords: [],
  });
  const [eventAddress, setAddress] = useState({
    buildingNumber: "",
    streetName: "",
    cityName: "",
    postcode: "",
  });

  const [imageUpload, setImageUpload] = useState([]);
  const [formNumber, setFormNumber] = useState(false);

  const updateState = (event, setter) => {
    const { value, name } = event.target;
    let valueX = value;
    if (name === "price" || name === "maxAttendees") {
      valueX = parseInt(value);
    }
    setter((prev) => {
      return { ...prev, [name]: valueX };
    });
  };

  const handleFormSwitch = () => {
    setFormNumber((prev) => !prev);
  };
  const ChangeNewEvent = (event: ChangeEvent<any>) => {
    const { value, name } = event.target;
    let valueX = value;
    if (name === "price" || name === "maxAttendees") {
      valueX = parseInt(value);
    }
    setNewEvent((prev) => {
      return { ...prev, [name]: valueX };
    });
  };

  const handleImagesUploaded = (arrayImgs) => {
    setImageUpload(arrayImgs);
  };

  const handleKeywordsSelected = (event) => {
    const { value } = event.target;
    let tagId = value.map((key) => {
      let answer = keywords.find((el) => el.tagName === key);
      return answer._id;
    });
    setTags((prev) => {
      return { ...prev, keywords: value, tags: tagId };
    });
  };

  function handleEventDate(input, key) {
    let date = new Date(input);
    setNewEvent((prev) => {
      return { ...prev, [key]: date };
    });
  }

  function renderForm() {
    return formNumber ? (
      <FormTwo
        ChangeNewEvent={ChangeNewEvent}
        newEvent={newEvent}
        handleFormSwitch={handleFormSwitch}
      />
    ) : (
      <FormOne
        updateState={updateState}
        ChangeNewEvent={ChangeNewEvent}
        newEvent={newEvent}
        setFormNumber={setFormNumber}
        eventAddress={eventAddress}
        updateDate={handleEventDate}
        imageUpload={imageUpload}
        setAddress={setAddress}
        tags={tags}
        keywords={keywords}
        handleKeywords={handleKeywordsSelected}
        updateImage={handleImagesUploaded}
      />
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography
          sx={{ mt: "2rem", mb: "3rem" }}
          textAlign="center"
          variant="h3"
          fontWeight="500"
        >
          Starting a new event
        </Typography>

        {renderForm()}

        {!formNumber || (
          <Box sx={{ display: "flex", mt: "1rem" }}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={handleFormSwitch}
            >
              Previous
            </Button>

            <Button color="info" type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Box>
        )}

        {formNumber || (
          <Button
            sx={{ my: "1rem" }}
            color="primary"
            onClick={handleFormSwitch}
            fullWidth
            variant="contained"
          >
            Next
          </Button>
        )}
      </div>
    </Container>
  );
}

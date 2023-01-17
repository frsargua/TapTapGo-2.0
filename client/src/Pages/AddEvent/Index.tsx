import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Card, CardContent, Container, Grid } from "@mui/material";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { EditorState } from "draft-js";
import { FormOne } from "../../Components/AddEvent/FormOne";
import { FormThree } from "../../Components/AddEvent/FormThree";
import { ChangeEvent, useRef, useState } from "react";
import { Box } from "@mui/system";
import { FormTwo } from "../../Components/AddEvent/FormTwo";
import dayjs from "dayjs";

export default function EventForm() {
  const navigate = useNavigate();

  const completeEventInformation = useRef();

  const [keywords, setKeywords] = useState([
    { tagName: "1", label: "Bachata" },
  ]);
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    date: dayjs(),
    price: "",
    ageGroup: "",
    description: EditorState.createEmpty(),
    maxAttendees: "",
  });
  const [tags, setTags] = useState<{ tags: string[]; keywords: string[] }>({
    tags: [],
    keywords: [],
  });
  const [eventAddress, setAddress] = useState({
    country: "",
    buildingNumber: "",
    firstLine: "",
    secondLine: "",
    cityName: "",
    postcode: "",
  });

  const [imageUpload, setImageUpload] = useState([]);
  const [formNumber, setFormNumber] = useState<number>(3);

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

  const handleAddressChange = (event) => {
    const { value, name } = event.target;

    setAddress((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleNextForm = () => {
    setFormNumber((prev) => prev + 1);
  };

  const handlePreviousForm = () => {
    setFormNumber((prev) => prev - 1);
  };

  const changeNewEvent = (event: ChangeEvent<any>) => {
    const { value, name } = event.target;
    let valueX = value;
    if (name === "price" || name === "maxAttendees") {
      valueX = parseInt(value);
    }
    setNewEvent((prev) => {
      return { ...prev, [name]: valueX };
    });
  };

  const changeNewEventDescription = (value: EditorState) => {
    console.log(value);
    setNewEvent((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleImagesUploaded = (arrayImgs: any[]) => {
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

  function handleEventDate(input: Date) {
    let date = new Date(input);
    setNewEvent((prev) => {
      return { ...prev, date: date };
    });
  }

  function renderForm() {
    switch (formNumber) {
      case 1:
        return (
          <FormOne
            updateState={updateState}
            changeNewEvent={changeNewEvent}
            newEvent={newEvent}
            updateDate={handleEventDate}
            imageUpload={imageUpload}
            tags={tags}
            keywords={keywords}
            handleKeywords={handleKeywordsSelected}
            updateImage={handleImagesUploaded}
          />
        );
      case 2:
        return (
          <FormTwo
            eventAddress={eventAddress}
            handleAddressChange={handleAddressChange}
          />
        );
      default:
        return (
          <FormThree
            changeNewEventDescription={changeNewEventDescription}
            newEvent={newEvent}
          />
        );
    }
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

        <Box sx={{ display: "flex", mt: "1rem" }}>
          {formNumber == 1 || formNumber == 2 ? (
            <Button
              color="primary"
              onClick={handleNextForm}
              fullWidth
              variant="contained"
            >
              Next
            </Button>
          ) : (
            ""
          )}

          {formNumber == 2 || formNumber == 3 ? (
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={handlePreviousForm}
            >
              Previous
            </Button>
          ) : (
            ""
          )}

          {formNumber === 3 ? (
            <Button color="info" type="submit" fullWidth variant="contained">
              Submit
            </Button>
          ) : (
            ""
          )}
        </Box>
      </div>
    </Container>
  );
}

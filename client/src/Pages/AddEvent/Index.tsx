import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { EditorState } from "draft-js";
import { FormOne } from "../../Components/AddEvent/FormOne";
import { FormThree } from "../../Components/AddEvent/FormThree";
import { ChangeEvent, useRef, useState } from "react";
import { Box } from "@mui/system";
import { FormTwo } from "../../Components/AddEvent/FormTwo";
import dayjs, { Dayjs } from "dayjs";

type newEventProps = {
  eventName: string;
  date: dayjs;
  price: string;
  ageGroup: string;
  description: string;
  maxAttendees: string;
};
type EventAddressProps = {
  country: string;
  buildingNumber: string;
  firstLine: string;
  secondLine: string;
  cityName: string;
  postcode: string;
};
type ImageUploadProps = {
  imageLink: string;
};

type keywordsProps = {
  tagName: string;
  label: string;
  _id: number;
};

type tagsProps = {
  tags: number[];
  keywords: string[];
};

export function AddEvent() {
  const navigate = useNavigate();

  const completeEventInformation = useRef();

  const [keywords, setKeywords] = useState<keywordsProps[]>([
    { tagName: "Bachata", label: "Bachata", _id: 1 },
    { tagName: "Salsa", label: "Salsa", _id: 2 },
  ]);
  const [newEvent, setNewEvent] = useState<newEventProps>({
    eventName: "",
    date: dayjs(),
    price: "",
    ageGroup: "",
    description: "",
    maxAttendees: "",
  });
  const [tags, setTags] = useState<tagsProps>({
    tags: [],
    keywords: [],
  });
  const [eventAddress, setAddress] = useState<EventAddressProps>({
    country: "",
    buildingNumber: "",
    firstLine: "",
    secondLine: "",
    cityName: "",
    postcode: "",
  });

  const [imageUpload, setImageUpload] = useState<ImageUploadProps[]>([]);
  const [formNumber, setFormNumber] = useState<number>(1);

  const handleNextForm = () => {
    setFormNumber((prev) => prev + 1);
  };

  const handleAddressChange = (event: ChangeEvent<any>) => {
    const { value, name } = event.target;

    setAddress((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handlePreviousForm = () => {
    setFormNumber((prev) => prev - 1);
  };

  const changeNewEvent = (
    event: ChangeEvent<any> | SelectChangeEvent<string>
  ) => {
    const { value, name } = event.target;
    let valueX = value;
    if (name === "price" || name === "maxAttendees") {
      valueX = parseInt(value);
    }
    setNewEvent((prev) => {
      return { ...prev, [name]: valueX };
    });
  };

  const changeNewEventDescription = (value: string) => {
    setNewEvent((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleImagesUploaded = (arrayImgs: ImageUploadProps[]) => {
    setImageUpload(arrayImgs);
  };

  const handleKeywordsSelected = (event: SelectChangeEvent<string[]>) => {
    const tagNameArray = event.target.value as string[];
    let tagId = tagNameArray.map((key) => {
      let answer = keywords.find((el) => el.tagName === key);
      return answer?._id;
    }) as number[];

    setTags({ keywords: tagNameArray, tags: tagId });
  };

  function handleEventDate(input: Dayjs | null) {
    if (input !== null) {
      setNewEvent((prev) => {
        return { ...prev, date: input.format("YYYY-MM-DD") };
      });
    }
  }

  function renderForm() {
    switch (formNumber) {
      case 1:
        return (
          <FormOne
            changeNewEvent={changeNewEvent}
            newEvent={newEvent}
            updateDate={handleEventDate}
            imageUpload={imageUpload}
            tags={tags}
            keywords={keywords}
            handleKeywordsSelected={handleKeywordsSelected}
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

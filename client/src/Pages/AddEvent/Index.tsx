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
import { useQuery, useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../graphQL/Mutations";
import { QUERY_TAGS } from "../../graphQL/Queries";
import { FormOne } from "../../Components/AddEvent/FormOne";
import { FormThree } from "../../Components/AddEvent/FormThree";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  latitude: string;
  longitude: string;
  firstLine: string;
  secondLine: string;
  city: string;
  postcode: string;
};
type ImageUploadProps = {
  imageLink: string;
};

type keywordsProps = {
  category: string;
  label: string;
  id: string;
};

type tagsProps = {
  tags: number[];
  keywords: string[];
};

export function AddEvent() {
  const navigate = useNavigate();

  const completeEventInformation: any = useRef();

  const [keywords, setKeywords] = useState<keywordsProps[]>([]);

  const { loading, data } = useQuery(QUERY_TAGS);

  useEffect(() => {
    if (data?.QueryAllCategories?.length) {
      console.log(data.QueryAllCategories);
      setKeywords(data.QueryAllCategories);
    }
  }, [data]);
  const [newEvent, setNewEvent] = useState<newEventProps>({
    ageGroup: "",
    date: dayjs(),
    description: "",
    eventName: "",
    maxAttendees: "",
    price: "",
  });
  const [tags, setTags] = useState<tagsProps>({
    tags: [],
    keywords: [],
  });
  const [eventAddress, setAddress] = useState<EventAddressProps>({
    postcode: "",
    firstLine: "",
    secondLine: "",
    city: "",
    latitude: "",
    longitude: "",
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
      let answer = keywords.find((el) => el.category === key);
      return { id: +answer?.id };
    }) as { id: number }[];
    console.log(tagId);

    setTags({ keywords: tagNameArray, tags: tagId });
  };

  function handleEventDate(input: Dayjs | null) {
    if (input !== null) {
      setNewEvent((prev) => {
        return { ...prev, date: input.format("YYYY-MM-DD") };
      });
    }
  }
  const uploadImage = async (image) => {
    if (image == null) return;
    const imageRef = ref(storage, `events/images/${image.name + v4()}`);
    let snapshot = await uploadBytes(imageRef, image);
    let URL = await getDownloadURL(snapshot.ref);
    console.log(URL);
    return await URL;
  };

  const [createEvent] = useMutation(ADD_EVENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      Promise.all(
        imageUpload.map(async (item) => {
          let imageURL = await uploadImage(item.imageLink);
          return { imageLink: imageURL };
        })
      )
        .then((images) => {
          completeEventInformation.current = {
            eventData: newEvent,
            eventCategories: tags.tags,
            eventImages: images,
            eventAddress: eventAddress,
          };
        })
        .then(async () => {
          console.log(completeEventInformation.current);
          // const { data: eventData } = await createEvent({
          //   variables: { input: { ...completeEventInformation.current } },
          // });
          // console.log(eventData);
          // if (eventData?.createEvent?._id) {
          //   const eventID = eventData.createEvent.id;
          //   navigate(`/event/${eventID}`, { replace: true });
          // }
        });
    } catch (e) {
      console.error(e);
    }
  };

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

        <Box
          sx={{ display: "flex", mt: "1rem" }}
          component="form"
          onSubmit={handleFormSubmit}
        >
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

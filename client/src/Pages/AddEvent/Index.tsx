import {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Container, SelectChangeEvent, Typography } from "@mui/material";
import { FormOne } from "../../Components/AddEvent/FormOne";
import { FormTwo } from "../../Components/AddEvent/FormTwo";
import { FormThree } from "../../Components/AddEvent/FormThree";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../graphQL/Mutations";
import { QUERY_TAGS, QUERY_FREQUENCY_TYPES } from "../../graphQL/Queries";
import { uploadImage } from "../../utils/index";
import dayjs, { Dayjs } from "dayjs";
import { NavigationButtons } from "../../Components/AddEvent/NavigationButtons";

type newEventProps = {
  eventName: string;
  date: dayjs;
  price: string;
  ageGroup: string;
  frequency: { frequency: string; id: string };
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

type frequencyProps = {
  frequency: string;
  id: string;
};

type tagsProps = {
  tags: number[];
  keywords: string[];
};

type AddEventProps = {
  tags: number[];
  keywords: string[];
};

export const AddEvent: FunctionComponent<AddEventProps> = () => {
  const navigate = useNavigate();

  const completeEventInformation: any = useRef();

  const [keywords, setKeywords] = useState<keywordsProps[]>([]);

  const [frequencies, setFrequencies] = useState<frequencyProps[]>([]);

  const [newEvent, setNewEvent] = useState<newEventProps>({
    ageGroup: "",
    frequency: { frequency: "", id: "" },
    date: dayjs().format("YYYY-MM-DD"),
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
  const changeNewEventFrequency = (
    event: ChangeEvent<any> | SelectChangeEvent<string>
  ) => {
    const { value } = event.target;

    let frequencyObject = frequencies.find(
      (keyword) => keyword.frequency == String(value)
    );

    setNewEvent((prev) => {
      let freqInput = {
        id: frequencyObject?.id ? frequencyObject?.id : "",
        frequency: frequencyObject?.frequency ? frequencyObject?.frequency : "",
      };

      console.log(value, freqInput);

      return { ...prev, frequency: freqInput };
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

    setTags({ keywords: tagNameArray, tags: tagId });
  };

  function handleEventDate(input: Dayjs | null) {
    if (input !== null) {
      setNewEvent((prev) => {
        return { ...prev, date: input.format("YYYY-MM-DD") };
      });
    }
  }

  const [createEvent] = useMutation(ADD_EVENT);
  const { data } = useQuery(QUERY_TAGS);
  const { data: frequenciesFromDB } = useQuery(QUERY_FREQUENCY_TYPES);

  const handleFormSubmit = async (event: any) => {
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
          const { data: eventData } = await createEvent({
            variables: { input: { ...completeEventInformation.current } },
          });
          if (eventData?.createEvent?.id) {
            const eventID = eventData.createEvent.id;
            navigate(`/event/${eventID}`, { replace: true });
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (data?.QueryAllCategories?.length) {
      setKeywords(data.QueryAllCategories);
    }
  }, [data]);

  useEffect(() => {
    if (frequenciesFromDB?.QueryAllFrequencyTypes) {
      setFrequencies(frequenciesFromDB.QueryAllFrequencyTypes);
    }
  }, [frequenciesFromDB]);

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

        <Box sx={{ mt: "1rem" }} component="form" onSubmit={handleFormSubmit}>
          {formNumber == 1 && (
            <FormOne
              changeNewEvent={changeNewEvent}
              newEvent={newEvent}
              updateDate={handleEventDate}
              imageUpload={imageUpload}
              tags={tags}
              keywords={keywords}
              frequencies={frequencies}
              handleFrequencySelected={changeNewEventFrequency}
              handleKeywordsSelected={handleKeywordsSelected}
              updateImage={handleImagesUploaded}
            />
          )}
          {formNumber == 2 && (
            <FormTwo
              eventAddress={eventAddress}
              handleAddressChange={handleAddressChange}
            />
          )}
          {formNumber >= 3 && (
            <FormThree
              changeNewEventDescription={changeNewEventDescription}
              newEvent={newEvent}
            />
          )}
          <NavigationButtons
            formNumber={formNumber}
            handlePreviousForm={handlePreviousForm}
            handleNextForm={handleNextForm}
          />
        </Box>
      </div>
    </Container>
  );
};

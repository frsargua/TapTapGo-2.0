import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { CreateEventContext } from "../../contexts/CreateEventContext";
import { ADD_EVENT } from "../../graphQL/Mutations";
import { QUERY_FREQUENCY_TYPES, QUERY_TAGS } from "../../graphQL/Queries";
import { uploadImage } from "../../utils/index";
import FormOne from "../../Components/CreateEventPage/FormOne";
import FormTwo from "../../Components/CreateEventPage/FormTwo";
import FormThree from "../../Components/CreateEventPage/FormThree";
import FormFour from "../../Components/CreateEventPage/FormFour";
import { NavigationButtons } from "../../Components/CreateEventPage/NavigationButtons";

type AddEventProps = {};

const CreateEventPage: FunctionComponent<AddEventProps> = () => {
  const navigate = useNavigate();
  const {
    eventDetails,
    imageUpload,
    eventAddress,
    tags,
    formFour,
    optionSelectedByUser,
    setKeywords,
    setFrequencies,
  } = useContext(CreateEventContext);

  const completeEventInformation = useRef<any>(null);

  const [formNumber, setFormNumber] = useState<number>(1);

  const handleNextForm = () => {
    setFormNumber((prev) => prev + 1);
  };

  const handlePreviousForm = () => {
    setFormNumber((prev) => prev - 1);
  };

  const [createEvent] = useMutation(ADD_EVENT);
  const { data: arrayOfFrequencyOptions } = useQuery(QUERY_FREQUENCY_TYPES);
  const { data: arrayOfCategoriesOptions } = useQuery(QUERY_TAGS);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const images = await Promise.all(
        imageUpload.map(async (item) => {
          const imageURL = await uploadImage(item.imageLink);
          return { imageLink: imageURL };
        })
      );

      completeEventInformation.current = {
        eventData: { ...eventDetails, description: formFour.description },
        eventCategories: tags.tags,
        eventImages: images,
        eventAddress: eventAddress,
        ticketOptions: optionSelectedByUser,
      };

      console.log(completeEventInformation.current);
      const { data: eventData } = await createEvent({
        variables: { input: { ...completeEventInformation.current } },
      });

      if (eventData?.createEvent?.id) {
        const eventID = eventData.createEvent.id;
        navigate(`/event/${eventID}`, { replace: true });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (arrayOfFrequencyOptions?.QueryAllFrequencyTypes?.length) {
      setFrequencies(arrayOfFrequencyOptions.QueryAllFrequencyTypes);
    }
  }, [arrayOfFrequencyOptions, setFrequencies]);

  useEffect(() => {
    if (arrayOfCategoriesOptions?.QueryAllCategories?.length) {
      setKeywords(arrayOfCategoriesOptions.QueryAllCategories);
    }
  }, [arrayOfCategoriesOptions, setKeywords]);

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
        <form onSubmit={handleFormSubmit}>
          <Box
            sx={{
              mt: "1rem",
              display: "flex",
              flexDirection: "column",
              minHeight: "400px",
            }}
          >
            {formNumber === 1 && <FormOne />}
            {formNumber === 2 && <FormTwo />}
            {formNumber === 3 && <FormThree />}
            {formNumber >= 4 && <FormFour />}
          </Box>
          <NavigationButtons
            formNumber={formNumber}
            handlePreviousForm={handlePreviousForm}
            handleNextForm={handleNextForm}
          />
        </form>
      </div>
    </Container>
  );
};

export default CreateEventPage;

import { FunctionComponent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import { FormOne } from "../../Components/AddEvent/FormOne";
import { FormTwo } from "../../Components/AddEvent/FormTwo";
import { FormThree } from "../../Components/AddEvent/FormThree";
import { FormFour } from "../../Components/AddEvent/FormFour";
import { useMutation } from "@apollo/client";
import { NavigationButtons } from "../../Components/AddEvent/NavigationButtons";
import { CreateEventContext } from "../../contexts/CreateEventContext";
import { ADD_EVENT } from "../../graphQL/Mutations";
import { uploadImage } from "../../utils/index";

type AddEventProps = {};

export const AddEvent: FunctionComponent<AddEventProps> = () => {
  const navigate = useNavigate();
  const {
    eventDetails,
    imageUpload,
    eventAddress,
    tags,
    optionSelectedByUser,
  } = useContext(CreateEventContext);

  const completeEventInformation: any = useRef();

  const [formNumber, setFormNumber] = useState<number>(1);

  const handleNextForm = () => {
    setFormNumber((prev) => prev + 1);
  };

  const handlePreviousForm = () => {
    setFormNumber((prev) => prev - 1);
  };
  const [createEvent] = useMutation(ADD_EVENT);

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
            eventData: eventDetails,
            eventCategories: tags.tags,
            eventImages: images,
            eventAddress: eventAddress,
            ticketOptions: optionSelectedByUser,
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
          {formNumber == 1 && <FormOne />}
          {formNumber == 2 && <FormTwo />}
          {formNumber == 3 && <FormThree />}
          {formNumber >= 4 && <FormFour />}
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

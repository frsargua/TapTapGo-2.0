import React, { createContext, useState, ChangeEvent } from "react";
import dayjs, { Dayjs } from "dayjs";
import { v1 as uuidv1 } from "uuid";

type CreateEventProps = {
  children: React.ReactNode;
};

type NewEventProps = {
  eventName: string;
  date: dayjs.Dayjs;
  ageGroup: string;
  frequency: { frequency: string; id: string };
  maxAttendees: string;
};

type TagsProps = {
  tags: number[];
  keywords: string[];
};

type ImageUploadProps = {
  imageLink: string;
};

type FrequencyProps = {
  frequency: string;
  id: string;
};

type EventAddressProps = {
  latitude: string;
  longitude: string;
  firstLine: string;
  secondLine: string;
  city: string;
  postcode: string;
};

export const CreateEventContext = createContext<any>({});

export const CreateEventProvider = ({ children }: CreateEventProps) => {
  // State
  const [keywords, setKeywords] = useState<string[]>([]);
  const [frequencies, setFrequencies] = useState<FrequencyProps[]>([]);
  const [imageUpload, setImageUpload] = useState<ImageUploadProps[]>([]);
  const [eventDetails, setNewEvent] = useState<NewEventProps>({
    ageGroup: "",
    frequency: { frequency: "", id: "" },
    date: dayjs().format("YYYY-MM-DD"),
    eventName: "",
    maxAttendees: "",
  });
  const [tags, setTags] = useState<TagsProps>({
    tags: [],
    keywords: [],
  });
  const [optionSelectedByUser, setOptionSelectedByUser] = useState([
    {
      id: uuidv1(),
      ticketName: "",
      price: "",
      description: "",
      expirationDate: dayjs().format("YYYY-MM-DD"),
    },
  ]);
  const [optionsAvailable, setOptionsAvailable] = useState<any>([
    { name: "standard", selected: false },
    { name: "premiun", selected: false },
    { name: "delux", selected: false },
  ]);
  const [eventAddress, setAddress] = useState<EventAddressProps>({
    postcode: "",
    firstLine: "",
    secondLine: "",
    city: "",
    latitude: "",
    longitude: "",
  });
  const [formFour, setFormFour] = useState<any>({ description: "" });

  // Event Handlers
  const handleAddressChange = (event: ChangeEvent<any>) => {
    const { value, name } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const updateImageState = (arrayImgs: ImageUploadProps[]) => {
    setImageUpload(arrayImgs);
  };

  const updateTagsSelected = (event: React.ChangeEvent<{ value: unknown }>) => {
    const tagNameArray = event.target.value as string[];

    let tagId = tagNameArray.map((key) => {
      let answer = keywords.find((el) => el.category === key);
      return { id: +answer?.id };
    }) as { id: number }[];

    setTags({ keywords: tagNameArray, tags: tagId });
  };

  const changeFrequency = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;

    let frequencyObject = frequencies.find(
      (keyword) => keyword.frequency === String(value)
    );

    setNewEvent((prev) => {
      let freqInput = {
        id: frequencyObject?.id ? frequencyObject?.id : "",
        frequency: frequencyObject?.frequency ? frequencyObject?.frequency : "",
      };

      return { ...prev, frequency: freqInput };
    });
  };

  const updateDate = (input: Dayjs | null) => {
    if (input !== null) {
      setNewEvent((prev) => ({ ...prev, date: input.format("YYYY-MM-DD") }));
    }
  };

  const changeNewEvent = (event: ChangeEvent<any>) => {
    const { value, name } = event.target;
    let valueX = value;
    if (name === "price" || name === "maxAttendees") {
      valueX = parseInt(value);
    }
    setNewEvent((prev) => ({ ...prev, [name]: valueX }));
  };

  const addOption = () => {
    if (optionSelectedByUser.length < 3) {
      setOptionSelectedByUser((prev: any[]) => {
        prev.push({
          id: uuidv1(),
          ticketName: "",
          price: 0,
          description: "",
          expirationDate: dayjs().format("YYYY-MM-DD"),
        });

        return [...prev];
      });
    }
  };

  const removeOption = () => {
    if (optionSelectedByUser.length > 1) {
      let lastTicketOptionName =
        optionSelectedByUser[optionSelectedByUser.length - 1].name;

      setOptionSelectedByUser((prev: any[]) => {
        prev.pop();
        return [...prev];
      });

      setOptionsAvailable((prev: any) => {
        return prev.map((options: any) => {
          if (options.name === lastTicketOptionName) {
            options.selected = false;
          }
          return options;
        });
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name: fieldIdentifier, value } = event.target;

    setOptionsAvailable((prev: any) => {
      return prev.map((el: any) => {
        optionSelectedByUser.forEach((element: any) => {
          if (element.id === fieldIdentifier && element.name !== "") {
            if (el.name === element.name) {
              el.selected = !el.selected;
            }
          }
        });

        if (el.name === value) {
          el.selected = !el.selected;
        }

        return el;
      });
    });

    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id === fieldIdentifier) {
          el.ticketName = value;
        }
        return el;
      });
    });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name: fieldIdentifier, value: newPrice } = event.target;

    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id === fieldIdentifier) {
          el.price = +newPrice;
        }
        return el;
      });
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { name: fieldIdentifier, value: newDescription } = event.target;

    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id === fieldIdentifier) {
          el.description = newDescription;
        }
        return el;
      });
    });
  };

  const handleExpirationDateChange = (
    input: Dayjs | null,
    fieldIdentifier: number
  ) => {
    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id === fieldIdentifier) {
          el.expirationDate = input?.format("YYYY-MM-DD");
        }
        return el;
      });
    });
  };

  const changeNewEventDescription = (value: string) => {
    setFormFour((prev: any) => ({ ...prev, description: value }));
  };

  return (
    <CreateEventContext.Provider
      value={{
        eventDetails,
        setKeywords,
        keywords,
        setFrequencies,
        frequencies,
        imageUpload,
        updateDate,
        changeNewEvent,
        changeFrequency,
        updateTagsSelected,
        updateImageState,
        tags,
        optionSelectedByUser,
        optionsAvailable,
        addOption,
        removeOption,
        handleChange,
        handlePriceChange,
        handleDescriptionChange,
        handleExpirationDateChange,
        eventAddress,
        handleAddressChange,
        formFour,
        changeNewEventDescription,
        setAddress,
      }}
    >
      {children}
    </CreateEventContext.Provider>
  );
};

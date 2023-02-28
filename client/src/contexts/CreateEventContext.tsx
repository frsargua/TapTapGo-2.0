import React, { createContext, useState, ChangeEvent } from "react";
import dayjs, { Dayjs } from "dayjs";
import { v1 as uuidv1 } from "uuid";

// interface CreateEventContextProps {
//   eventDetails: any[];
// }

type CreateEventProps = {
  children: React.ReactNode;
};

type newEventProps = {
  eventName: string;
  date: dayjs;
  ageGroup: string;
  frequency: { frequency: string; id: string };
  maxAttendees: string;
};

type tagsProps = {
  tags: number[];
  keywords: string[];
};

type ImageUploadProps = {
  imageLink: string;
};

type frequencyProps = {
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

// Types for form 2

export const CreateEventContext = createContext({} as any);

export const CreateEventProvider = ({ children }: CreateEventProps) => {
  // State Form One
  const [keywords, setKeywords] = useState<keywordsProps[]>([]);
  const [frequencies, setFrequencies] = useState<frequencyProps[]>([]);
  const [imageUpload, setImageUpload] = useState<ImageUploadProps[]>([]);
  const [eventDetails, setNewEvent] = useState<newEventProps>({
    ageGroup: "",
    frequency: { frequency: "", id: "" },
    date: dayjs().format("YYYY-MM-DD"),
    eventName: "",
    maxAttendees: "",
  });
  const [tags, setTags] = useState<tagsProps>({
    tags: [],
    keywords: [],
  });

  // States Form Two
  const [optionSelectedByUser, setOptionSelectedByUser] = useState([
    {
      id: "1",
      name: "",
      price: "",
      description: "",
      date: dayjs().format("YYYY-MM-DD"),
      label: "option 1",
    },
  ]);
  const [optionsAvailable, setOptionsAvailable] = useState<any>([
    { name: "standard", selected: false },
    { name: "premiun", selected: false },
    { name: "delux", selected: false },
  ]);

  // States Form Three
  const [eventAddress, setAddress] = useState<EventAddressProps>({
    postcode: "",
    firstLine: "",
    secondLine: "",
    city: "",
    latitude: "",
    longitude: "",
  });

  // States Form Three

  const handleAddressChange = (event: ChangeEvent<any>) => {
    const { value, name } = event.target;

    setAddress((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // State for form four
  const [formFour, setFormFour] = useState<any>({ description: "" });

  // Functions for form one
  const updateImageState = (arrayImgs: ImageUploadProps[]) => {
    setImageUpload(arrayImgs);
  };

  const updateTagsSelected = (event: SelectChangeEvent<string[]>) => {
    const tagNameArray = event.target.value as string[];

    let tagId = tagNameArray.map((key) => {
      let answer = keywords.find((el) => el.category === key);
      return { id: +answer?.id };
    }) as { id: number }[];

    setTags({ keywords: tagNameArray, tags: tagId });
  };

  const changeFrequency = (
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

  function updateDate(input: Dayjs | null) {
    if (input !== null) {
      setNewEvent((prev) => {
        return { ...prev, date: input.format("YYYY-MM-DD") };
      });
    }
  }

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

  //   Functions for form two

  function addOption() {
    if (optionSelectedByUser.length < 3)
      setOptionSelectedByUser((prev: any[]) => {
        prev.push({
          id: uuidv1(),
          name: "",
          price: "",
          description: "",
          date: dayjs().format("YYYY-MM-DD"),
          label: "option 1",
        });

        return [...prev];
      });
  }
  function removeOption() {
    if (optionSelectedByUser.length > 1) {
      let lastTicketOptionName =
        optionSelectedByUser[optionSelectedByUser.length - 1].name;

      setOptionSelectedByUser((prev: any[]) => {
        prev.pop();
        return [...prev];
      });

      setOptionsAvailable((prev: any) => {
        return prev.map((options: any) => {
          if (options.name == lastTicketOptionName) {
            options.selected = false;
          }
          return options;
        });
      });
    }
  }

  const handleChange = (event: any) => {
    let { name: fieldIdentifier, value } = event.target;

    setOptionsAvailable((prev: any) => {
      return prev.map((el: any) => {
        optionSelectedByUser.forEach((element: any) => {
          if (element.id == fieldIdentifier && element.name !== "") {
            if (el.name == element.name) {
              el.selected = !el.selected;
            }
          }
        });

        if (el.name == value) {
          el.selected = !el.selected;
        }

        return el;
      });
    });

    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id == fieldIdentifier) {
          el.name = value;
        }
        return el;
      });
    });
  };

  const handlePriceChange = (event: any) => {
    let { name: fieldIdentifier, value: newPrice } = event.target;

    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id == fieldIdentifier) {
          el.price = newPrice;
        }
        return el;
      });
    });
  };

  const handleDescriptionChange = (event: any) => {
    let { name: fieldIdentifier, value: newDescription } = event.target;

    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id == fieldIdentifier) {
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
        if (el.id == fieldIdentifier) {
          el.date = input?.format("YYYY-MM-DD");
        }
        return el;
      });
    });
  };
  // Functions for form four

  const changeNewEventDescription = (value: string) => {
    setFormFour((prev) => {
      return { ...prev, description: value };
    });
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
      }}
    >
      {children}
    </CreateEventContext.Provider>
  );
};

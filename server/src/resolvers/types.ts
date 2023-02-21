export type UserType = {
  input: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    age: number;
    createdAt: string;
    profileAvatar: string;
    aboutMe: string;
    websiteUrl: string;
    number: string;
    email: string;
    password: string;
  };
  user: { username: string; email: string; id: number };
};

export type CreateCategory = {
  input: { category: string };
};

export type MakePaymentType = {
  input: { amount: number; paymentId: string };
};
export type CreateTicketType = {
  input: {
    details: { reference: string; qrCode: string; event_id: string };
    numberTicketsPurchased: number;
  };
};

export type EventType = {
  input: {
    eventData: {
      eventName: string;
      description: string;
      date: Date;
      price: number;
      ageGroup: string;
      attendees?: number;
      maxAttendees: number;
      frequency: { frequency: string; id: string };
    };
    eventImages: [{ imageLink: string }];
    eventAddress: {
      firstLine: string;
      secondLine?: string;
      city: string;
      latitude: number;
      longitude: number;
      postcode: string;
    };
    eventCategories: [{ id: number; category: string }];
  };
};

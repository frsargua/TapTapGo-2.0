export const categoryList = [
  {
    id: "1",
    value: "Weekly",
    label: "🔂 Weekly",
  },
  {
    id: "2",
    value: "Monthly",
    label: "🔁 Monthly",
  },
  {
    id: "3",
    value: "Specials",
    label: "🤩 Specials",
  },
];

export const options = [
  { id: 1, value: "bookmarks", label: "Bookmark" },
  { id: 2, value: "yourEvents", label: "Your Events" },
  { id: 3, value: "yourReviews", label: "Your Reviews" },
  { id: 4, value: "admin", label: "Admin" },
  { id: 5, value: "going", label: "Going" },
];

export const ratingList = [
  {
    id: "1",
    value: "1",
    label: "1⭐️",
  },
  {
    id: "2",
    value: "2",
    label: "2⭐️",
  },
  {
    id: "3",
    value: "3",
    label: "3⭐️",
  },
  {
    id: "4",
    value: "4",
    label: "4⭐️",
  },
  {
    id: "5",
    value: "5",
    label: "5⭐️",
  },
];

export const singleEvent = {
  eventName: "error quo repudiandae",
  location: {
    streetName: "Clotilde Glen",
    cityName: "London",
    postcode: "IY1 8YT",
    coordinates: { lat: 51.509865, lng: -0.118092 },
    __typename: "LocationEvent",
  },
  description:
    "Officiis deserunt rerum sunt ipsam assumenda. Magnam occaecati commodi autem amet. Natus dolorum voluptatem quisquam cupiditate odit maiores sunt vitae sint. Similique neque explicabo amet ullam eligendi et. Natus dolor laudantium sed vel a nesciunt. Non est laboriosam minus rerum est non reprehenderit asperiores.",
  date: "21/10/2022",
  price: 216,
  ageGroup: "Teenagers",
  createdById: {
    username: "Julie0",
    myEvents: [],
    websiteUrl: "pushy-splendor.info",
    profileAvatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/638.jpg",
    __typename: "User",
  },
  images: [
    {
      imageLink: "https://loremflickr.com/640/480/city",
      __typename: "Image",
    },
    {
      imageLink: "https://loremflickr.com/640/480/city",
      __typename: "Image",
    },
    {
      imageLink: "https://loremflickr.com/640/480/city",
      __typename: "Image",
    },
    {
      imageLink: "https://loremflickr.com/640/480/city",
      __typename: "Image",
    },
  ],
  reviews: [
    {
      _id: "6327abc8736e513034bd314e",
      postedBy: "6327abb8736e513034bd2e18",
      username: "Ralph.Ratke",
      title: "Quos rerum dolor debitis cumque quam eum modi quaerat.",
      reviewText:
        "Et id id voluptatum nam ipsum. Iste dolorem iusto quis. Reiciendis explicabo eos quo dicta distinctio consequatur aut. Deleniti quo sint officiis. Autem quod voluptates.",
      rating: 2,
      __typename: "Review",
    },
  ],
  attendees: 80,
  tags: [
    {
      tagName: "Folk Dance",
      events: [],
      __typename: "Tag",
    },
  ],
  __typename: "Event",
};

export const dataList = [
  {
    eventName: "Salsa Night",
    price: 15,
    rating: 4.5,
    _id: "123abc",
    createdById: "456def",
    coordinates: { lat: 51.509865, lng: -0.118092 },
    reviews: [
      { rating: 5 },
      { rating: 4 },
      { rating: 3 },
      { rating: 2 },
      { rating: 1 },
    ],
    images: [
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
    ],
  },
  {
    eventName: "Tango Evening",
    price: 20,
    rating: 4.0,
    _id: "789ghi",
    createdById: "101112",
    reviews: [
      { rating: 4.5 },
      { rating: 4.0 },
      { rating: 3.5 },
      { rating: 3.0 },
      { rating: 2.5 },
    ],
    coordinates: { lat: 51.519475, lng: -0.10344 },

    images: [
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2FRev-de-Cuba.jpg?alt=media&token=d0272313-3da0-40fd-9684-e47df2e3d4c3",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2FRev-de-Cuba.jpg?alt=media&token=d0272313-3da0-40fd-9684-e47df2e3d4c3",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2FRev-de-Cuba.jpg?alt=media&token=d0272313-3da0-40fd-9684-e47df2e3d4c3",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2FRev-de-Cuba.jpg?alt=media&token=d0272313-3da0-40fd-9684-e47df2e3d4c3",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2FRev-de-Cuba.jpg?alt=media&token=d0272313-3da0-40fd-9684-e47df2e3d4c3",
      },
    ],
  },
  {
    eventName: "Dancing under the Stars",
    price: 25,
    rating: 4.5,
    _id: "131415",
    createdById: "161718",
    reviews: [
      { rating: 5.0 },
      { rating: 4.5 },
      { rating: 4.0 },
      { rating: 3.5 },
      { rating: 3.0 },
    ],
    coordinates: { lat: 51.499981, lng: -0.124755 },

    images: [
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fc870x524.jpg?alt=media&token=89e92501-7f19-4390-ae05-4d9d131765aa",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fc870x524.jpg?alt=media&token=89e92501-7f19-4390-ae05-4d9d131765aa",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fc870x524.jpg?alt=media&token=89e92501-7f19-4390-ae05-4d9d131765aa",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fc870x524.jpg?alt=media&token=89e92501-7f19-4390-ae05-4d9d131765aa",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fc870x524.jpg?alt=media&token=89e92501-7f19-4390-ae05-4d9d131765aa",
      },
    ],
  },
  {
    eventName: "latin Dance Party",
    price: 30,
    rating: 4.0,
    _id: "19202122",
    createdById: "232425",
    reviews: [
      { rating: 4.5 },
      { rating: 4.0 },
      { rating: 3.5 },
      { rating: 3.0 },
      { rating: 2.5 },
    ],
    coordinates: { lat: 51.508129, lng: -0.128069 },
    images: [
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Feefd5c1b1eb6a533c486cc01b1a9f85869f81935a604d56d5524f740d1a84966-rimg-w960-h542-gmir.jpg?alt=media&token=a9365bfc-7cac-4bc2-9032-4004d2077855",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Feefd5c1b1eb6a533c486cc01b1a9f85869f81935a604d56d5524f740d1a84966-rimg-w960-h542-gmir.jpg?alt=media&token=a9365bfc-7cac-4bc2-9032-4004d2077855",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Feefd5c1b1eb6a533c486cc01b1a9f85869f81935a604d56d5524f740d1a84966-rimg-w960-h542-gmir.jpg?alt=media&token=a9365bfc-7cac-4bc2-9032-4004d2077855",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Feefd5c1b1eb6a533c486cc01b1a9f85869f81935a604d56d5524f740d1a84966-rimg-w960-h542-gmir.jpg?alt=media&token=a9365bfc-7cac-4bc2-9032-4004d2077855",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Feefd5c1b1eb6a533c486cc01b1a9f85869f81935a604d56d5524f740d1a84966-rimg-w960-h542-gmir.jpg?alt=media&token=a9365bfc-7cac-4bc2-9032-4004d2077855",
      },
    ],
  },
  {
    eventName: "latin  Party",
    price: 35,
    rating: 4.0,
    _id: "19202198",
    createdById: "232425",
    reviews: [
      { rating: 4.5 },
      { rating: 4.0 },
      { rating: 3.5 },
      { rating: 3.0 },
      { rating: 2.5 },
    ],
    coordinates: { lat: 51.508129, lng: -0.128069 },
    images: [
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fimages.jpeg?alt=media&token=54f13bc0-defc-40a1-ad13-e571981a4231",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fimages.jpeg?alt=media&token=54f13bc0-defc-40a1-ad13-e571981a4231",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fimages.jpeg?alt=media&token=54f13bc0-defc-40a1-ad13-e571981a4231",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fimages.jpeg?alt=media&token=54f13bc0-defc-40a1-ad13-e571981a4231",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2Fimages.jpeg?alt=media&token=54f13bc0-defc-40a1-ad13-e571981a4231",
      },
    ],
  },
  {
    eventName: " Dance Party",
    price: 30,
    rating: 4.0,
    _id: "19202152",
    createdById: "232425",
    reviews: [
      { rating: 4.5 },
      { rating: 4.0 },
      { rating: 3.5 },
      { rating: 3.0 },
      { rating: 2.5 },
    ],
    coordinates: { lat: 51.508129, lng: -0.128069 },
    images: [
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
    ],
  },
  {
    eventName: "Bachata Party",
    price: 30,
    rating: 4.0,
    _id: "19208922",
    createdById: "232425",
    reviews: [
      { rating: 4.5 },
      { rating: 4.0 },
      { rating: 3.5 },
      { rating: 3.0 },
      { rating: 2.5 },
    ],
    coordinates: { lat: 51.504129, lng: -0.128069 },
    images: [
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
      {
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9",
      },
    ],
  },
];

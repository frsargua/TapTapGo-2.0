import { setContext } from "@apollo/client/link/context";
import "./App.css";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Modals } from "./Components/Common/Modals";
import { TextEditor } from "./Components/Common/TextEditor";
import { Navbar } from "./Components/Common/Navbar/Index";
import { ModalProvider } from "./contexts/ModalContext";
import { AddEvent } from "./Pages/AddEvent/Index";
import { EventPage } from "./Pages/EventPage";
import { Landing } from "./Pages/Landing/Index";
import { Map } from "./Pages/MapPage/index";
import { ProfileDashBoard } from "./Pages/Profile/Index";
import Search from "./Pages/Search/Index";
import { CreateEventProvider } from "./contexts/CreateEventContext";

const httpLink = createHttpLink({
  // uri: `${window.location.origin}/graphql`,
  uri: `http://localhost:3004/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      event: {
        fields: {
          event: {
            // Short for options.mergeObjects(existing, incoming).
            merge: true,
          },
        },
      },
    },
  }),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <CreateEventProvider>
          <ModalProvider>
            <Router>
              <Modals />
              <Navbar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/search/:city" element={<Search />} />
                <Route path="/map/:cityName" element={<Map />} />
                <Route path="/createEvent" element={<AddEvent />} />
                <Route path="/user/:userId" element={<ProfileDashBoard />} />
                <Route path="/event/:eventId" element={<EventPage />} />
                <Route path="/sample" element={<TextEditor />} />
              </Routes>
            </Router>
          </ModalProvider>
        </CreateEventProvider>
      </ApolloProvider>
    </>
  );
}

export default App;

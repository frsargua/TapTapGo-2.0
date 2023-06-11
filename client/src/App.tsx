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
import { Navbar } from "./Components/Navbar/Index";
import { ModalProvider } from "./contexts/ModalContext";
import CreateEventPage from "./Pages/CreateEventPage/Index";
import SingleEventPage from "./Pages/SingleEventPage/Index";
import MainLandingPage from "./Pages/MainLandingPage/Index";
import SearchResultsMapPage from "./Pages/SearchResultsMapPage/Index";
import UserProfilePage from "./Pages/UserProfilePage/Index";
import SearchResultsPage from "./Pages/SearchResultsPage/Index";
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
                <Route path="/" element={<MainLandingPage />} />
                <Route path="/search/:city" element={<SearchResultsPage />} />
                <Route path="/map/:city" element={<SearchResultsMapPage />} />
                <Route path="/createEvent" element={<CreateEventPage />} />
                <Route path="/user/:userId" element={<UserProfilePage />} />
                <Route path="/event/:eventId" element={<SingleEventPage />} />
              </Routes>
            </Router>
          </ModalProvider>
        </CreateEventProvider>
      </ApolloProvider>
    </>
  );
}

export default App;

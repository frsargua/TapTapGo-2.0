import { UserForms } from "./Authentification/index";
import { BookMark } from "./Bookmark/index";
import { GetTicketModal } from "./Tickets/index";
import { ModalContext } from "../../../contexts/ModalContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export function Modals() {
  const { getModalState, getBookmarksModalState, getTicketModalState } =
    useContext(ModalContext);

  return (
    <>
      {getModalState() && <UserForms />}
      {getBookmarksModalState() && <BookMark />}
      {/* {getTicketModalState() && <GetTicketModal />} */}
    </>
  );
}

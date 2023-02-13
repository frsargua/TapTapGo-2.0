import { UserForms } from "./Authentification/index";
import { BookMark } from "./Bookmark/index";
import { ModalContext } from "../../../contexts/ModalContext";
import { useContext } from "react";

export function Modals() {
  const { getModalState, getBookmarksModalState } = useContext(ModalContext);

  return (
    <>
      {getModalState() && <UserForms />}
      {getBookmarksModalState() && <BookMark />}
    </>
  );
}

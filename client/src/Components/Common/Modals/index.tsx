import { UserForms } from "./Authentification/index";
// import BookMark from "../bookmark";
import { ModalContext } from "../../../contexts/ModalContext";
import { useContext } from "react";

export function Modals() {
  const { getModalState, getBookmarksModalState } = useContext(ModalContext);

  return (
    <>
      {getModalState() && <UserForms />}
      {/* {BookmarksModalState && <BookMark />} */}
    </>
  );
}

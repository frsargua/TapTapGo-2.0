import React, { createContext, useState, useContext, ChangeEvent } from "react";

interface ModalContextProps {
  getModalState: () => Boolean;
  getBookmarksModalState: () => Boolean;
  closeModal: (event: ChangeEvent<HTMLInputElement>) => void;
  closeBookmarkModal: (event: ChangeEvent<HTMLInputElement>) => void;
  openSignModal: () => void;
  openBookmarkModal: () => void;
}

export const ModalContext = createContext({} as ModalContextProps);

type ModalProviderProps = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalState, setModalState] = useState(false);
  const [bookmarksModalState, setBookmarksModalState] = useState(false);

  const getModalState = (): Boolean => {
    return modalState;
  };

  const getBookmarksModalState = (): Boolean => {
    return bookmarksModalState;
  };

  const closeModal = (event: ChangeEvent<HTMLInputElement>) => {
    const isCloseBox = event.target.getAttribute("value");
    setModalState((prev) => {
      return isCloseBox === "CloseBox" ? !prev : prev;
    });
  };

  const openSignModal = () => {
    console.log("inside Modal");
    setModalState((prev) => {
      return !prev;
    });
  };

  const openBookmarkModal = () => {
    console.log("inside bookmark");
    setBookmarksModalState((prev) => {
      return !prev;
    });
  };

  const closeBookmarkModal = (event: ChangeEvent<HTMLInputElement>) => {
    const isCloseBox = event.target.getAttribute("value");
    setBookmarksModalState((prev) => {
      return isCloseBox === "CloseBox" ? !prev : prev;
    });
  };

  return (
    <ModalContext.Provider
      value={{
        getModalState,
        getBookmarksModalState,
        closeModal,
        openSignModal,
        openBookmarkModal,
        closeBookmarkModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

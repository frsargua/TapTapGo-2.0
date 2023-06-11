import React, { createContext, useState, ChangeEvent } from "react";

interface ModalContextProps {
  getModalState: () => Boolean;
  getBookmarksModalState: () => Boolean;
  getTicketModalState: () => Boolean;
  closeModal: (event: ChangeEvent<any>) => void;
  closeBookmarkModal: (event: ChangeEvent<any>) => void;
  closeTicketModalState: (event: ChangeEvent<any>) => void;
  openSignModal: () => void;
  openBookmarkModal: () => void;
  openTicketModalState: () => void;
}

export const ModalContext = createContext({} as ModalContextProps);

type ModalProviderProps = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalState, setModalState] = useState(false);
  const [bookmarksModalState, setBookmarksModalState] = useState(false);
  const [ticketModalState, setTicketModalStateModalState] = useState(false);

  const getModalState = (): Boolean => {
    return modalState;
  };

  const getBookmarksModalState = (): Boolean => {
    return bookmarksModalState;
  };

  const getTicketModalState = (): Boolean => {
    return ticketModalState;
  };

  const closeModal = (event: ChangeEvent<any>) => {
    if (event.currentTarget === event.target) {
      setModalState((prev) => {
        return !prev;
      });
    }
  };

  const closeBookmarkModal = (event: ChangeEvent<any>) => {
    if (event.currentTarget === event.target) {
      setBookmarksModalState((prev) => {
        return !prev;
      });
    }
  };

  const closeTicketModalState = (event: ChangeEvent<any>) => {
    if (event.currentTarget === event.target) {
      setTicketModalStateModalState((prev) => {
        return !prev;
      });
    }
  };

  const openSignModal = () => {
    setModalState((prev) => {
      return !prev;
    });
  };

  const openBookmarkModal = () => {
    setBookmarksModalState((prev) => {
      return !prev;
    });
  };

  const openTicketModalState = () => {
    setTicketModalStateModalState((prev) => {
      return !prev;
    });
  };

  return (
    <ModalContext.Provider
      value={{
        getModalState,
        getBookmarksModalState,
        getTicketModalState,
        openSignModal,
        openBookmarkModal,
        openTicketModalState,
        closeModal,
        closeBookmarkModal,
        closeTicketModalState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

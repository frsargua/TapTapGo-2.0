import { TextField } from "@mui/material";
import React, { useRef, useEffect, ChangeEvent, MouseEvent } from "react";

type AddressInputProps = {
  searchTerm: string;
  onInputChange: (value: string) => void;
};

const AddressInput: React.FC<AddressInputProps> = ({
  searchTerm,
  onInputChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      onInputChange("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <TextField
      inputRef={inputRef}
      type="text"
      fullWidth
      placeholder="Enter a UK address"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default AddressInput;

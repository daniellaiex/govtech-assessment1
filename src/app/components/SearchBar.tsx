import React from "react";
import { TextField } from "@mui/material";
import { SearchBarProps } from "../types/types";

function SearchBar({ onSearch, label }: SearchBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      onChange={handleSearchChange}
      fullWidth
      margin="normal"
    />
  );
}

export default SearchBar;
import { Box, Button, FormControl, Input, InputAdornment } from "@mui/material";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { useContext, useState } from "react";
import { BoardContext } from "../context/BoardContext";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const { searchTask } = useContext(BoardContext);

  const handleSearch = () => {
    const results = searchTask("some query", "Todo");
    console.log("Search results:", results);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <FormControl variant="standard" sx={{ flexGrow: 1 }}>
        <Input
          id="input-with-icon-adornment"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <AlignHorizontalLeftIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" onClick={() => setInputValue("")}>
        Discard
      </Button>
      <Button variant="contained" onClick={handleSearch}>
        Save
      </Button>
    </Box>
  );
};

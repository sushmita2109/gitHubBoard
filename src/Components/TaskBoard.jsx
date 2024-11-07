import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { useContext, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const TaskBoard = () => {
  const { board, setBoard } = useContext(BoardContext);
  const [inputState, setInputState] = useState({});

  const handleAdd = (index) => {
    setInputState((prev) => ({
      ...prev,
      [index]: { isActive: true, text: "" },
    }));
  };

  const handleTextChange = (index, value) => {
    setInputState((prev) => ({
      ...prev,
      [index]: { ...prev[index], text: value },
    }));
  };

  const handleSave = (index) => {
    const newItems = [...board.board.items];
    newItems[index].texts.push(inputState[index].text);
    setBoard({ board: { ...board.board, items: newItems } });
    setInputState((prev) => ({
      ...prev,
      [index]: { isActive: false, text: "" },
    }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceIndex = parseInt(source.droppableId, 10);
    const destinationIndex = parseInt(destination.droppableId, 10);

    const sourceTexts = Array.from(board.board.items[sourceIndex].texts);
    const [movedText] = sourceTexts.splice(source.index, 1);

    const destinationTexts = Array.from(
      board.board.items[destinationIndex].texts
    );
    destinationTexts.splice(destination.index, 0, movedText);

    const updatedItems = [...board.board.items];
    updatedItems[sourceIndex].texts = sourceTexts;
    updatedItems[destinationIndex].texts = destinationTexts;

    setBoard({ board: { ...board.board, items: updatedItems } });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: "flex", margin: 2, gap: 2 }}>
        {board.board.items.map((item, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: "#ebedf0",
              minWidth: 275,
              minHeight: 575,
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <IconButton>
                <PanoramaFishEyeIcon
                  sx={{ color: item.iconColor, fontWeight: "bold" }}
                />
              </IconButton>
              <Typography variant="h6" sx={{ marginLeft: 1 }}>
                {item.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              {item.description}
            </Typography>

            <Droppable droppableId={`${index}`}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ flexGrow: 1, paddingBottom: 2 }}
                >
                  {item.texts.map((text, textIndex) => (
                    <Draggable
                      key={textIndex}
                      draggableId={`${index}-${textIndex}`}
                      index={textIndex}
                    >
                      {(provided) => (
                        <Typography
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            padding: "8px",
                            backgroundColor: "#ffffff",
                            borderRadius: "4px",
                            marginBottom: "8px",
                            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                          }}
                        >
                          - {text}
                        </Typography>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>

            {inputState[index]?.isActive ? (
              <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
                <TextField
                  variant="outlined"
                  placeholder="Enter item text"
                  size="small"
                  value={inputState[index].text}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave(index)}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Button onClick={() => handleAdd(index)} sx={{ marginTop: 2 }}>
                + Add item
              </Button>
            )}
          </Card>
        ))}
      </Box>
    </DragDropContext>
  );
};

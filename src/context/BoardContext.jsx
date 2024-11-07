import { createContext, useState } from "react";
import mockData from "../util/mockData.json";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(mockData);
  const searchTask = (query) => {
    // Check if items exist in board
    const items = board?.board?.items || [];

    // Find all tasks that contain the query in each board section's `texts`
    return items
      .map((item) => ({
        ...item,
        texts: item.texts.filter((task) =>
          task.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((item) => item.texts.length > 0); // Only include items with matched tasks
  };
  return (
    <BoardContext.Provider value={{ board, setBoard, searchTask }}>
      {children}
    </BoardContext.Provider>
  );
};

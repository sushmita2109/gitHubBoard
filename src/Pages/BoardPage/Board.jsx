import { NavBar } from "../../Components/NavBar";
import { SearchBar } from "../../Components/SearchBar";
import { TaskBoard } from "../../Components/TaskBoard";

export const Board = () => {
  return (
    <div>
      <h1>Board</h1>
      <NavBar />
      <SearchBar />
      <TaskBoard />
    </div>
  );
};

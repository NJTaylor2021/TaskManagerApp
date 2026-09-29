import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainPage";
import AddTaskPage from "./addTaskPage";
import EditTaskPage from "./editTaskPage";
import OpenFilePage from "./openFilePage";

/**
 * Defines all of the different URLs used for the task manager
 * @returns All of the routes for the different pages
 */
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add" element={<AddTaskPage />} />
        <Route path="/edit/:selectedID" element={<EditTaskPage />} />
        <Route path="/open" element={<OpenFilePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

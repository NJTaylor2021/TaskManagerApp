import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ParseTaskFile } from "./Utilities";
import TaskList from "./taskList";

/**
 * Allows the user to create a task list from an existing text file.
 * @returns HTML that allows the user to open a text file or return to the home page.
 */
function OpenFilePage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const model = TaskList.instance;

  const navigate = useNavigate();
  const handleFileChoice = (input: React.ChangeEvent<HTMLInputElement>) => {
    const file = input.target.files?.[0] ?? null;
    setFile(file);
    setError(null);
  };

  const handleSubmit = () => {
    if (file === null) {
      setError("Please choose a file to open.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result as string;
      ParseTaskFile(contents, model);
      navigate("/");
    };

    reader.onerror = () => {
      setError(
        "File could not be read. Please try again or choose another file.",
      );
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Open File</h1>
      <label>File to Open:</label>
      <input
        type="file"
        accept=".txt,text/plain"
        onChange={handleFileChoice}
      ></input>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <button type="button" onClick={handleSubmit}>
          Open
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default OpenFilePage;

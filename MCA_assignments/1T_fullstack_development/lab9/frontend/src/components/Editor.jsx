import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const Editor = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [file, setFile] = useState(null);
  const [lastSaved, setLastSaved] = useState("Just now");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/signin");
      return;
    }
    const fileId = localStorage.getItem("currentFileId");
    if (!fileId) {
      navigate("/dashboard");
      return;
    }
    const files = JSON.parse(localStorage.getItem("files") || "[]");
    const currentFile = files.find((f) => f.id === fileId);
    if (!currentFile) {
      navigate("/dashboard");
      return;
    }
    setFile(currentFile);
    editorRef.current.innerHTML = currentFile.content || "";
    setHistory(currentFile.history || []);
    // Auto-save every 30 seconds
    const interval = setInterval(() => saveFile(), 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const saveFile = () => {
    if (!file) return;
    const files = JSON.parse(localStorage.getItem("files") || "[]");
    const fileIndex = files.findIndex((f) => f.id === file.id);
    if (fileIndex === -1) return;
    // Add to history
    if (!files[fileIndex].history) files[fileIndex].history = [];
    files[fileIndex].history.push({
      timestamp: new Date().toISOString(),
      content: editorRef.current.innerHTML,
      user: JSON.parse(localStorage.getItem("user")).username,
    });
    files[fileIndex].content = editorRef.current.innerHTML;
    localStorage.setItem("files", JSON.stringify(files));
    setLastSaved("Just now");
    setHistory(files[fileIndex].history);
  };

  const downloadFile = () => {
    if (!file) return;
    const blob = new Blob([editorRef.current.innerText], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const showHistoryModal = () => {
    setShowHistory(true);
  };
  const closeHistoryModal = () => {
    setShowHistory(false);
  };
  const restoreVersion = (version) => {
    if (
      !window.confirm(
        "Are you sure you want to restore this version? Current changes will be lost."
      )
    )
      return;
    editorRef.current.innerHTML = version.content;
    saveFile();
    closeHistoryModal();
  };
  const handleSignout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex flex-col">
      <header>
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-b-xl">
          <div className="text-2xl font-bold text-blue-700">CollabPro</div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-700 font-semibold hover:underline"
            >
              Dashboard
            </button>
            <button
              onClick={handleSignout}
              className="btn btn-outline border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
            >
              Sign Out
            </button>
          </div>
        </nav>
      </header>
      <main className="flex-1 max-w-3xl mx-auto py-8 px-4 w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-700" id="fileName">
              {file ? file.name : "Loading..."}
            </h1>
            <span className="text-gray-500" id="lastSaved">
              Last saved: {lastSaved}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={showHistoryModal}
              className="btn btn-outline border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-100 flex items-center gap-1"
            >
              <span className="fa fa-history"></span> History
            </button>
            <button
              onClick={downloadFile}
              className="btn btn-outline border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-100 flex items-center gap-1"
            >
              <span className="fa fa-download"></span> Download
            </button>
            <button
              onClick={saveFile}
              className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 transition flex items-center gap-1"
            >
              <span className="fa fa-save"></span> Save
            </button>
          </div>
        </div>
        <div className="toolbar flex items-center gap-2 mb-4 bg-white p-2 rounded shadow">
          <button
            className="tool-btn px-2 py-1 rounded hover:bg-blue-100"
            title="Bold"
            onClick={() => execCommand("bold")}
          >
            {" "}
            <span className="fa fa-bold"></span>{" "}
          </button>
          <button
            className="tool-btn px-2 py-1 rounded hover:bg-blue-100"
            title="Italic"
            onClick={() => execCommand("italic")}
          >
            {" "}
            <span className="fa fa-italic"></span>{" "}
          </button>
          <button
            className="tool-btn px-2 py-1 rounded hover:bg-blue-100"
            title="Underline"
            onClick={() => execCommand("underline")}
          >
            {" "}
            <span className="fa fa-underline"></span>{" "}
          </button>
          <span className="mx-2 border-l h-6"></span>
          <button
            className="tool-btn px-2 py-1 rounded hover:bg-blue-100"
            title="Align Left"
            onClick={() => execCommand("justifyLeft")}
          >
            {" "}
            <span className="fa fa-align-left"></span>{" "}
          </button>
          <button
            className="tool-btn px-2 py-1 rounded hover:bg-blue-100"
            title="Align Center"
            onClick={() => execCommand("justifyCenter")}
          >
            {" "}
            <span className="fa fa-align-center"></span>{" "}
          </button>
          <button
            className="tool-btn px-2 py-1 rounded hover:bg-blue-100"
            title="Align Right"
            onClick={() => execCommand("justifyRight")}
          >
            {" "}
            <span className="fa fa-align-right"></span>{" "}
          </button>
          <span className="mx-2 border-l h-6"></span>
          <select
            className="font-size border rounded px-2 py-1"
            title="Font Size"
            onChange={(e) => execCommand("fontSize", e.target.value)}
            defaultValue={3}
          >
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Extra Large</option>
          </select>
        </div>
        <div
          ref={editorRef}
          id="editor"
          className="editor bg-white rounded shadow p-4 min-h-[300px]"
          contentEditable={true}
        ></div>
      </main>
      {/* History Modal */}
      {showHistory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.classList.contains("bg-black")) closeHistoryModal();
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Version History
            </h2>
            <div className="history-list flex flex-col gap-2">
              {history.length === 0 ? (
                <div className="text-gray-500">No history yet.</div>
              ) : (
                [...history].reverse().map((version, idx) => (
                  <div
                    key={idx}
                    className="history-item border rounded p-2 flex flex-col gap-1"
                  >
                    <div className="history-info flex justify-between items-center">
                      <h4 className="font-semibold">
                        Version by {version.user}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(version.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <button
                      className="btn btn-outline border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-100"
                      onClick={() => restoreVersion(version)}
                    >
                      Restore
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-outline border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
                onClick={closeHistoryModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;

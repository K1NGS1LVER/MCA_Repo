import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("document");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/signin");
      return;
    }
    setCurrentUser(user);
    // Initialize demo files if not exists
    if (!localStorage.getItem("files")) {
      const demoFiles = [
        {
          id: "1",
          name: "Project Proposal",
          type: "document",
          createdAt: new Date().toISOString(),
          content: "This is a sample project proposal document.",
          owner: user.username,
        },
        {
          id: "2",
          name: "Sales Data",
          type: "csv",
          createdAt: new Date().toISOString(),
          content:
            "Product,Price,Quantity\nLaptop,999,50\nMouse,29.99,100\nKeyboard,59.99,75",
          owner: user.username,
        },
      ];
      localStorage.setItem("files", JSON.stringify(demoFiles));
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      const allFiles = JSON.parse(localStorage.getItem("files") || "[]");
      const userFiles = allFiles.filter(
        (file) => file.owner === currentUser.username
      );
      setFiles(userFiles);
    }
  }, [currentUser, showModal]);

  const loadFiles = () => {
    const allFiles = JSON.parse(localStorage.getItem("files") || "[]");
    if (!currentUser) return;
    const userFiles = allFiles.filter(
      (file) => file.owner === currentUser.username
    );
    setFiles(userFiles);
  };

  const handleNewFile = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;
    const newFile = {
      id: Date.now().toString(),
      name: fileName,
      type: fileType,
      createdAt: new Date().toISOString(),
      content:
        fileType === "csv"
          ? "Column1,Column2,Column3"
          : "Enter your content here...",
      owner: currentUser.username,
    };
    const allFiles = JSON.parse(localStorage.getItem("files") || "[]");
    allFiles.push(newFile);
    localStorage.setItem("files", JSON.stringify(allFiles));
    setShowModal(false);
    setFileName("");
    setFileType("document");
    loadFiles();
    // Optionally, navigate to editor page
    // navigate(`/editor/${newFile.id}`);
  };

  const handleSignout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const openFile = (file) => {
    localStorage.setItem("currentFileId", file.id);
    if (file.type === "document") {
      navigate("/editor");
    } else {
      navigate("/csv-editor");
    }
  };

  const deleteFile = (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    let allFiles = JSON.parse(localStorage.getItem("files") || "[]");
    allFiles = allFiles.filter((file) => file.id !== fileId);
    localStorage.setItem("files", JSON.stringify(allFiles));
    loadFiles();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex flex-col">
      <header>
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-b-xl">
          <div className="text-2xl font-bold text-blue-700">CollabPro</div>
          <div className="flex gap-4 items-center">
            <span className="font-semibold text-blue-700">Dashboard</span>
            <Link
              to="/profile"
              className="btn btn-outline border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
            >
              Profile
            </Link>
            <button
              onClick={handleSignout}
              className="btn btn-outline border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
            >
              Sign Out
            </button>
          </div>
        </nav>
      </header>
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-700">My Files</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition flex items-center gap-2"
          >
            <span className="fa fa-plus"></span> New File
          </button>
        </div>
        <div className="file-list grid grid-cols-1 md:grid-cols-2 gap-6">
          {files.length === 0 ? (
            <div className="text-gray-500">No files yet.</div>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="file-card bg-white rounded-lg shadow p-4 relative cursor-pointer hover:ring-2 hover:ring-blue-300 flex flex-col"
                onClick={() => openFile(file)}
              >
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFile(file.id);
                  }}
                >
                  <span className="fa fa-trash"></span>
                </button>
                {/* File type at top left */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`file-icon fa ${
                      file.type === "document" ? "fa-file-alt" : "fa-file-csv"
                    } text-blue-500 text-xl`}
                  ></span>
                  <span className="text-xs font-semibold text-blue-600 uppercase">
                    {file.type === "document" ? "Document" : "CSV"}
                  </span>
                </div>
                {/* Preview below */}
                {file.type === "document" ? (
                  <div className="file-preview mb-2 text-sm text-gray-700 border rounded p-2 bg-blue-50">
                    {file.content
                      .split(/\r?\n/)
                      .slice(0, 5)
                      .map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    {file.content.split(/\r?\n/).length > 5 && (
                      <div className="text-gray-400">...</div>
                    )}
                  </div>
                ) : (
                  <div className="file-preview mb-2 border rounded p-2 bg-blue-50">
                    <table className="preview-table w-full text-xs border border-gray-200">
                      <tbody>
                        {file.content
                          .split("\n")
                          .slice(0, 5)
                          .map((row, i) => (
                            <tr key={i}>
                              {row.split(",").map((cell, j) => (
                                <td key={j} className="border px-1 py-0.5">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        {file.content.split("\n").length > 5 && (
                          <tr>
                            <td colSpan="99" className="text-gray-400">
                              ...
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="file-header flex items-center gap-2 mt-2">
                  <div className="file-info">
                    <h3 className="font-semibold text-blue-700">{file.name}</h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      {/* New File Modal */}
      {showModal && (
        <div
          className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.classList.contains("bg-black")) setShowModal(false);
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Create New File
            </h2>
            <form onSubmit={handleNewFile} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="fileName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  File Name
                </label>
                <input
                  id="fileName"
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  required
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="fileType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  File Type
                </label>
                <select
                  id="fileType"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  required
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="document">Document</option>
                  <option value="csv">CSV Spreadsheet</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  className="btn btn-outline border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

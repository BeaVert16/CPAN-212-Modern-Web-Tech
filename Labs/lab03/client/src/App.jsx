import { useState } from "react";

function App() {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [fetchedSingleFile, setFetchedSingleFile] = useState(null);
  const [fetchedMultipleFiles, setFetchedMultipleFiles] = useState([]);
  const [fetchedRandomDogImage, setFetchedRandomDogImage] = useState(null);

  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const handleMultipleFilesChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);
    try {
      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading single file:", error);
    }
  };

  const uploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    try {
      const response = await fetch("http://localhost:8000/save/multiple", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading multiple files:", error);
    }
  };

  const fetchSingleFile = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/single");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setFetchedSingleFile(url);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple");
      const data = await response.json();
      const fileData = data.files.map((file) => {
        const base64URL = `data:application/octet-stream;base64,${file.data}`;
        return {
          filename: file.filename,
          url: base64URL,
        };
      });
      setFetchedMultipleFiles(fileData);
    } catch (error) {
      console.error("Error fetching multiple files:", error);
    }
  };

  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/randomDog");
      console.log(response)
      const url = await response.json();;
      setFetchedRandomDogImage(url);
      console.log(url)
    } catch (error) {
      console.error("Error fetching Dog Image:", error);
    }
  };

  return (
    <>
      <h1>File Upload and Fetch App</h1>

      <div>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button onClick={uploadSingleFile}>Upload Single File</button>
      </div>

      <div>
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFilesChange} />
        <button onClick={uploadMultipleFiles}>Upload Multiple Files</button>
      </div>

      <div>
        <h2>Fetch Single File</h2>
        <button onClick={fetchSingleFile}>Fetch Single File</button>
        {fetchedSingleFile && (
          <div>
            <h3>Single File</h3>
            <img
              src={fetchedSingleFile}
              alt="Fetched Single"
              style={{ width: "200px", marginTop: "10px" }}
            />
          </div>
        )}
      </div>

      <div>
        <h2>Fetch Multiple Files</h2>
        <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
        {fetchedMultipleFiles.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            {fetchedMultipleFiles.map((file, index) => (
              <div key={index}>
                <img
                  src={file.url}
                  alt={`Fetched File ${index + 1}`}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>Fetch Random Dog Image</h2>
        <button onClick={fetchRandomDogImage}>Fetch Random Dog Image</button>
        {fetchedRandomDogImage && (
          <div>
            <h3>Random Dog Image</h3>
            <img
              src={fetchedRandomDogImage}
              alt="Rando Doggo"
              style={{ width: "200px", marginTop: "10px" }}
            />
          </div>
        )}
      </div>

    </>
  );
}

export default App;

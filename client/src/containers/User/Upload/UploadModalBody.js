import React, { useState, useEffect } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

import propTypes from "prop-types";
/* 
  Code adapted from tutorial found at https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929
  Tutorial author = Egor Egorov
  Date Used: 01/03/2020
*/
const UploadModalBody = props => {
  // eslint-disable-next-line no-unused-vars
  const [projectID, setProjectID] = useState(props.projectID);
  const [fileList, setFileList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [drag, setDrag] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [uploadRef, setUploadRef] = useState(React.createRef());
  const [waitingResponse, setWaiting] = useState(false);

  // Error Tags
  const [fileError, setFileError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [projectIdError, setProjectIDError] = useState(false);

  // Upload Tags
  const [uploaded, setUploaded] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDrag = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  /*
    handleDragIn function
    This will recognise the user is dragging data into the box, and will check the the data have atleast 1 item.
    If it does, the drag effect is turned on.
  */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDragIn = event => {
    event.preventDefault();
    event.stopPropagation();
    setDragCount(dragCount + 1); // test
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0)
      setDrag(true);
  };

  /*
    handleDragOut function
    This function manages the user draggin files that were going to be uploaded, out of the upload box.
    The dragging out action by the user is passed into the function.
    When the function is called, it states that the user is no longer dragging items and stops the capability.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDragOut = event => {
    event.preventDefault();
    event.stopPropagation();
    setDragCount(dragCount - 1); // TODO
    if (dragCount === 0) setDrag(false);
  };

  /*
    This function is used to get all the files entries from a directory and put them into an array 
  */
  const getEntries = async data => {
    // eslint-disable-next-line no-return-await
    return await new Promise((res, rej) => data.readEntries(res, rej));
  };

  /*
    This function is used to get a list of files from a stored array of file entries
  */
  const getFilesFromEntries = async (entries, fl) => {
    const fileEntries = entries;
    // eslint-disable-next-line no-shadow
    const fileList = fl;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fileEntries.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res, rej) => fileEntries[i].file(res, rej)).then(
        file => {
          fileList.push(file);
        }
      );
    }

    return fileList;
  };

  /*
    This is used to get a file from a single entry
  */
  // eslint-disable-next-line consistent-return
  const getFile = async entry => {
    let f;
    await new Promise((res, rej) => entry.file(res, rej)).then(file => {
      f = file;
    });
    if (f) return f;
  };
  /* 
    HandleTransfer function
    The handleTransfer function takes in the event/action that triggers the function, in this case dropping files (See componentDidMount and componentWillUnmount)
    Onces the data is received from the drop event, it ensures that there are files that exists, and will loop through each file adding it the new file list array
    The file list state is then saved as the new array, all the files from the drop data transfer are cleared, and the drag affect is turned off.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTransfer = async event => {
    event.preventDefault();
    event.stopPropagation();

    let fl = fileList;

    setDrag(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const items = Array.from(event.dataTransfer.items);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < items.length; i++) {
        const data = items[i].webkitGetAsEntry();
        if (data.isDirectory) {
          // eslint-disable-next-line no-await-in-loop
          const entries = await getEntries(data.createReader());
          // eslint-disable-next-line no-await-in-loop
          fl = await getFilesFromEntries(entries, fl);
        } else {
          // eslint-disable-next-line no-await-in-loop
          const file = await getFile(data);
          fl.push(file);
        }
      }
      setFileList(fl);
      event.dataTransfer.clearData();
      setDragCount(0);
    }
  };

  /* 
    This will send the images to the server.
    All the images and the projectID that is saved in state are taken into variables in the function.
    These are them assigned to a FormData type, allowing for the images and text to be sent via an axios post.
  */
  const sendImagesToServer = id => {
    const fl = fileList;
    // eslint-disable-next-line no-shadow
    const projectID = id;

    if (projectID) {
      setProjectIDError(false);
      if (fileList.length !== 0) {
        setFileError(false);
        const formData = new FormData();

        formData.set("projectID", projectID);

        fl.forEach((file, index) => {
          formData.append(index, file);
        });
        setWaiting(true);
        axios
          .post("http://localhost:3000/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          // eslint-disable-next-line no-unused-vars
          .then(resp => {
            setWaiting(false);
          });
        setUploaded(true);
      } else {
        setFileError(true);
      }
    } else {
      setProjectIDError(true);
    }
  };

  const showUploaded = () => {
    return <p>Files have been uploaded</p>;
  };
  const noFilesError = () => {
    return <p>PLEASE UPLOAD SOME FILES BEFORE YOU CLICK UPLOAD</p>;
  };

  const displayLoadingResponse = () => {
    return (
      <div className="loading">
        <div className="loading__animation"></div>
        <p className="loading__text">Files are uploading</p>
      </div>
    );
  };

  useEffect(() => {
    let uploadBox = uploadRef.current;
    try {
      uploadBox.addEventListener("dragenter", handleDragIn);
      uploadBox.addEventListener("dragleave", handleDragOut);
      uploadBox.addEventListener("dragover", handleDrag);
      uploadBox.addEventListener("drop", handleTransfer);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      uploadBox = uploadRef.current;
      try {
        uploadBox.removeEventListener("dragenter", handleDragIn);
        uploadBox.removeEventListener("dragleave", handleDragOut);
        uploadBox.removeEventListener("dragover", handleDrag);
        uploadBox.removeEventListener("drop", handleTransfer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
  }, [handleDragIn, handleDragOut, handleDrag, handleTransfer, uploadRef]);
  return (
    <div>
      <div className="dragAndDropBox" ref={uploadRef}>
        Drag and Drop files
      </div>
      <ListGroup>
        {fileList.map(file => (
          <ListGroupItem key={file.name} className="upload__list--item">
            {file.name}
          </ListGroupItem>
        ))}
      </ListGroup>
      {fileError === true ? noFilesError() : ""}
      {waitingResponse === true ? displayLoadingResponse() : ""}
      {uploaded === true ? showUploaded() : ""}
      <Button color="primary" onClick={() => sendImagesToServer(projectID)}>
        Upload Images
      </Button>
    </div>
  );
};

UploadModalBody.propTypes = {
  projectID: propTypes.string
};

export default UploadModalBody;

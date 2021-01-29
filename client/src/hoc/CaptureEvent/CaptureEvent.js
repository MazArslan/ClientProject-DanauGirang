import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import CaptureEventForm from "../../containers/User/CaptureEventForm/CaptureEventForm";
import useHttp from "../../hooks/http";

/**
 * Higher order component to wrap the Capture Event Form component
 * Enables the capture Event Form to be accessed by the user statically
 */
const CaptureEvent = () => {
  const { projectId, captureEventId } = useParams();
  const { error, data, sendRequest } = useHttp();
  const [tags, setTags] = useState();

  useEffect(() => {
    sendRequest(`http://localhost:3000/api/project/${projectId}/tags`, "GET");
  }, [projectId, sendRequest]);

  useEffect(() => {
    if (data !== null && !error) {
      setTags(data.projectTags);
    }
  }, [data, error, setTags]);

  let captureEventForm = <Spinner />;
  if (tags) {
    captureEventForm = (
      <CaptureEventForm tags={tags} captureEventId={captureEventId} />
    );
  }

  return <div>{captureEventForm}</div>;
};

export default CaptureEvent;

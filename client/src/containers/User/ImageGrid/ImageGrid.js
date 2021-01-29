import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHttp from "../../../hooks/http";

import classes from "./ImageGrid.css";
import { updateObject } from "../../../shared/utility";
import ImageThumbnail from "../../../components/ImageGrid/ImageThumbnail/imageThumbnail";
import Spinner from "../../../components/UI/Spinner/Spinner";
import PageCount from "../../../components/ImageGrid/PageCount/pageCount";
import Filters from "../../../components/ImageGrid/Filters/Filters";
import ImageCardModal from "../ImageCardModal/ImageCardModal";

/**
 * ImageGrid component
 * Displays a paginated view of all of the images for a particular project
 */
const ImageGrid = () => {
  const [captureEvents, setCaptureEvents] = useState([]);
  const [captureEventsId, setCaptureEventsId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCaptureEvents, setTotalCaptureEvents] = useState(0);
  const [project, setProject] = useState();
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(6);

  const [showFilters, setShowFilters] = useState(false);
  const [filterChoice, setFilterChoice] = useState({
    createdOnDate: "",
    completionStatus: "empty"
  });
  const [filter, setFilter] = useState({
    createdOnDate: "",
    completionStatus: "empty"
  });
  const [selectedCard, setSelectedCard] = useState({ cardId: "" });
  const [showCard, setShowCard] = useState(false);
  const [modal, setModal] = useState(true);
  const { isLoading, error, data, sendRequest } = useHttp();

  const { projectId } = useParams();

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const { createdOnDate, completionStatus } = filter;
    const query = `?pageNo=${currentPage}&projectId=${projectId}&completionStatus=${completionStatus}&createdOnDate=${createdOnDate}&pageSize=${pageSize}`;
    sendRequest(
      `http://localhost:3000/api/captureEvent/imageGrid${query}`,
      "GET"
    );
  }, [currentPage, filter, sendRequest, projectId, pageSize]);

  // Assigns the card an id used for ImageCard pagination
  const assignCardId = useCallback(
    captureEventArray => {
      let count = (currentPage - 1) * pageSize;
      captureEventArray.forEach(event => {
        // eslint-disable-next-line no-param-reassign
        event.cardId = count + 1;
        count += 1;
      });
      return captureEventArray;
    },
    [currentPage, pageSize]
  );

  useEffect(() => {
    if (data !== null) {
      setProject(data.project);
      setTotalPages(data.totalPages);
      setTotalCaptureEvents(data.totalCaptureEvents);
      const captureEventThumbnails = assignCardId(data.captureEvents);
      setCaptureEvents(captureEventThumbnails);
      const captureEventsIdArray = [];
      // eslint-disable-next-line array-callback-return
      data.captureEvents.map(captureEvent => {
        captureEventsIdArray.push(captureEvent._id);
      });
      setCaptureEventsId(captureEventsIdArray);
    }
  }, [data, assignCardId, captureEvents]);

  // Pagination bar click handlers
  const handleNumberClick = useCallback((event, index) => {
    event.preventDefault();
    setCurrentPage(index + 1);
  }, []);
  const handleArrowClick = useCallback((event, index) => {
    event.preventDefault();
    setCurrentPage(index);
  }, []);

  const handleThumbnailClick = useCallback(
    (event, cardId) => {
      event.preventDefault();
      const updatedSelectedCard = updateObject(selectedCard, {
        cardId
      });
      setSelectedCard(updatedSelectedCard);
      setModal(true);
      setShowCard(true);
    },
    [selectedCard]
  );

  const toggleModal = useCallback(
    e => {
      e.preventDefault();
      setModal(!modal);
    },
    [modal]
  );

  let imagesGrid = <Spinner />;
  if (!isLoading && captureEvents) {
    imagesGrid = (
      <React.Fragment>
        {captureEvents.map(captureEvent => {
          return (
            <Col xs="6" sm="4" key={captureEvent._id}>
              <div className="card-wrapper">
                <button
                  className="card-button"
                  onClick={event =>
                    handleThumbnailClick(event, captureEvent.cardId)
                  }
                >
                  <ImageThumbnail
                    id={captureEvent._id}
                    image={captureEvent.thumbnailImage}
                    cardId={captureEvent.cardId}
                    dateTime={captureEvent.createdOnDateTime}
                    isComplete={captureEvent.isComplete}
                  />
                </button>
              </div>
            </Col>
          );
        })}
      </React.Fragment>
    );
  }
  let paginationBar = error ? <p>Images cannot be loaded</p> : <Spinner />;
  if (captureEvents) {
    paginationBar = (
      <div className={classes.paginationWrapper}>
        <Pagination aria-label="Page navigation">
          {/* Pagination bar left arrow */}
          <PaginationItem disabled={currentPage <= 1} className="navigate-back">
            <PaginationLink
              onClick={event => handleArrowClick(event, currentPage - 1)}
              previous
              href="#"
            />
          </PaginationItem>
          {/* Pagination bar numbers */}
          {[...Array(totalPages)].map((page, i) => (
            <PaginationItem active={i + 1 === currentPage} key={i + 1}>
              <PaginationLink
                onClick={event => handleNumberClick(event, i)}
                href="#"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* Pagination bar right arrow */}
          <PaginationItem
            disabled={currentPage >= totalPages - 1}
            className="navigate-forward"
          >
            <PaginationLink
              onClick={event => handleArrowClick(event, currentPage + 1)}
              next
              href="#"
            />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }

  let card = null;
  if (showCard && project) {
    card = (
      <ImageCardModal
        cardId={selectedCard.cardId}
        projectId={projectId}
        totalCaptureEvents={totalCaptureEvents}
        pageNumber={currentPage}
        tags={project.tags}
        captureEventsId={captureEventsId}
        pageSize={pageSize}
        isOpen={modal}
        toggle={toggleModal}
      />
    );
  }

  // Functions for the filter state handling logic
  const handleFilterChoiceChange = useCallback(
    (e, type) => {
      const updatedFilter = updateObject(filterChoice, {
        [type]: e.target.value
      });
      setFilterChoice(updatedFilter);
    },
    [filterChoice]
  );

  const handleFiltering = useCallback(
    e => {
      e.preventDefault();
      const updatedFilter = updateObject(filter, {
        createdOnDate: filterChoice.createdOnDate,
        completionStatus: filterChoice.completionStatus
      });
      setFilter(updatedFilter);
    },
    [filter, filterChoice]
  );

  const handleClearFilters = useCallback(
    e => {
      e.preventDefault();
      const updatedFilter = updateObject(filterChoice, {
        createdOnDate: "",
        completionStatus: "empty"
      });
      setFilterChoice(updatedFilter);
      setFilter(updatedFilter);
    },
    [filterChoice]
  );

  const handleShowFilters = useCallback(
    e => {
      e.preventDefault();
      setShowFilters(!showFilters);
    },
    [showFilters]
  );

  let filterComponent = null;
  if (showFilters) {
    filterComponent = (
      <Filters
        filterChoice={filterChoice}
        dateChange={e => handleFilterChoiceChange(e, "createdOnDate")}
        statusChange={e => handleFilterChoiceChange(e, "completionStatus")}
        applyFilters={e => handleFiltering(e)}
        clearFilters={e => handleClearFilters(e)}
      />
    );
  }

  let header = null;
  if (project) {
    header = (
      <Col xs="10">
        <h2>{project.name}</h2>
      </Col>
    );
  }

  return (
    <React.Fragment>
      <Container>
        {card}
        <div className="image-grid">
          <div className="title">
            <Row>
              {header}
              <Col xs="2">
                <PageCount
                  currentPage={currentPage.toString()}
                  totalPages={totalPages.toString()}
                />
              </Col>
            </Row>
          </div>
          <Button
            className="filter-button"
            color="info"
            onClick={e => handleShowFilters(e)}
          >
            <FontAwesomeIcon icon={faFilter} />
          </Button>
          {filterComponent}
          <Row>{imagesGrid}</Row>
          <Row>
            <Col className="text-center">{paginationBar}</Col>
          </Row>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ImageGrid;

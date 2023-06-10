import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Spinner from "../shared/Spinner";
import useFetch from "../../hooks/useFetch";
import { BOOKS_URL, COVERS_URL, GENERAL_DATA_MAPPER, NO_COVER_URL } from "../../utils/constants";
import styles from "./BookDetails.module.css";

const propMapper = (prop) => prop?.value || prop;

const BookDetails = forwardRef(({}, ref) => {
  const [bookDetails, isFetchingBookDetails, fetchBookDetails, , clearBookDetails] = useFetch();
  const [authorDetails, isFetchingAuthorDetails, fetchAuthorDetails, , clearAuthorDetails] = useFetch();
  const [cover, isFetchingCover, , fetchCover, clearCover] = useFetch();
  const [book, setBook] = useState();

  const isLoading = useMemo(
    () => isFetchingCover || isFetchingBookDetails || isFetchingAuthorDetails,
    [isFetchingCover, isFetchingBookDetails, isFetchingAuthorDetails]
  );

  const fetchCoverInternal = ({ cover_i }) => {
    if (!cover_i) return;
    const coverUrl = `${COVERS_URL}/${cover_i}-L.jpg`;
    fetchCover(coverUrl, GENERAL_DATA_MAPPER);
  };

  const fetchAuthorDetailsInternal = ({ author_key }) => {
    if (!author_key) return;
    const authorUrl = `${BOOKS_URL}/authors/${author_key[0].replace(/ /g, "+")}.json`;
    fetchAuthorDetails(authorUrl, GENERAL_DATA_MAPPER);
  };

  const fetchBookDetailsInternal = ({ key }) => {
    if (!key) return;
    const bookUrl = `${BOOKS_URL}${key}.json`;
    fetchBookDetails(bookUrl, GENERAL_DATA_MAPPER);
  };

  const showModal = (item) => {
    setBook(item);
    fetchCoverInternal(item);
    fetchAuthorDetailsInternal(item);
    fetchBookDetailsInternal(item);
  };

  const hideModal = () => {
    setBook(null);
    clearAuthorDetails(null);
    clearBookDetails(null);
    clearCover(null);
  };

  useImperativeHandle(ref, () => {
    return {
      showModal: showModal,
    };
  });

  const handleBackgroundClick = (e) => {
    if (e.target.id !== "background") {
      e.stopPropagation();
      return;
    }
    hideModal();
  };

  return (
    <>
      {book && (
        <div id="background" className={styles.modal} onClick={handleBackgroundClick}>
          <div className={styles.modalInnerContainer}>
            {isLoading ? (
              <Spinner classes={styles.spinner} />
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <h1>{propMapper(bookDetails?.title) || "Untitled"}</h1>
                  <IoCloseSharp className={styles.closeIcon} onClick={hideModal} />
                </div>
                <div className={styles.modalContent}>
                  <div className={styles.coverContainer}>
                    <img src={cover ? cover : NO_COVER_URL} alt="Cover" className={styles.cover} />
                    <div className={styles.individualContent}>
                      <span className={styles.subtitle}>First Publish Date </span>{" "}
                      <span>{propMapper(bookDetails?.first_publish_date) || "No date available"}</span>
                    </div>
                  </div>
                  <div className={styles.contentContainer}>
                    <div className={styles.individualContent}>
                      <span className={styles.subtitle}>Description</span>
                      <span className={styles.text}>{propMapper(bookDetails?.description) || "No description available"}</span>
                    </div>
                    <div className={styles.individualContent}>
                      <span className={styles.subtitle}>Author</span> <span>{propMapper(authorDetails?.name) || "No author available"}</span>
                    </div>
                    <div className={styles.individualContent}>
                      <span className={styles.subtitle}>Author Bio</span>{" "}
                      <span className={styles.text}>{propMapper(authorDetails?.bio) || "No author bio available"}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default BookDetails;

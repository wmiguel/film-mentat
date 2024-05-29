import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FilmResultCard from "./FilmResultCard";

const FilmSearchResults = ({
  fetchPage,
  pagination,
  resultsList,
  openSearchDetails,
  toggleOff,
}) => {
  const { page, totalPages } = pagination;

  // call next page
  const fetchNextPage = () => {
    fetchPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={resultsList.length}
      next={fetchNextPage}
      hasMore={page !== totalPages}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      scrollableTarget="scrollableDiv"
    >
      <>
        {resultsList.map((film, index) => (
          <FilmResultCard
            key={index}
            film={film}
            openSearchDetails={openSearchDetails}
            toggleOff={toggleOff}
          />
        ))}
      </>
    </InfiniteScroll>
  );
};

export default FilmSearchResults;
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchCard from "./SearchCard";

const SearchResults = ({
  fetchPage,
  pages,
  searchResults,
  openSearchDetails,
  toggleOff,
}) => {
  const { page, totalPages } = pages;
  const fetchNextPage = () => {
    fetchPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={searchResults.length}
      next={fetchNextPage}
      hasMore={page !== totalPages}
      loader={<h4>Loading...</h4>}
      endMessage={
        <div className="search-end">
          <p>End of Search Results</p>
        </div>
      }
      scrollableTarget="scrollableDiv"
    >
      {searchResults.map((result, index) => (
        <SearchCard
          key={index}
          result={result}
          openSearchDetails={openSearchDetails}
          toggleOff={toggleOff}
        />
      ))}
    </InfiniteScroll>
  );
};

export default SearchResults;
import React from "react";
import Searchresults from "../../components/search/Searchresults";
import Navbar from "../../components/navbar/Navbar";

const SearchPage = () => {
  return (
    <div>
      <Navbar />
      <div className="sm:h-[60px]" />
      <Searchresults />
    </div>
  );
};

export default SearchPage;

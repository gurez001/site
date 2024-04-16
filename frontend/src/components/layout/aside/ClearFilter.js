import React from "react";

const ClearFilter = ({ clearFilterHeandler }) => {
  return (
    <div className="filter-ac">
      <button onClick={() => clearFilterHeandler()}>Clear All Filter</button>
    </div>
  );
};

export default ClearFilter;

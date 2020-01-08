import React from "react";
import { connect } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const Filter = props => {
  // const { filter } = props.filter;

  // console.log("filter", filter.length);
  const handleChange = event => {
    event.preventDefault();
    const value = event.target.value;
    props.filterAnecdotes(value);
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterAnecdotes
};

export default connect(
  null,
  mapDispatchToProps
)(Filter);

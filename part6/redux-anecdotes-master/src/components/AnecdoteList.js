import React from "react";
import { connect } from "react-redux";
import Anecdote from "./Anecdote";
import Filter from "./Filter";
import { setNotification } from "../reducers/notificationReducer";
import { voteFor, mostPopularAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteList = props => {
  return (
    <div>
      <Filter />
      <ul>
        {rows(props)
          .sort(mostPopularAnecdotes)
          .map(anecdote => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => {
                props.voteFor(anecdote.id);
                props.setNotification(`You voted for ${anecdote.content}`, 3);
              }}
            />
          ))}
      </ul>
    </div>
  );
};

const rows = ({ anecdotes, filter }) => {
  // console.log("anecdotes rows", anecdotes, "filter", filter);
  if (filter === undefined || filter.filter === "") return anecdotes;
  else
    return anecdotes.filter(
      a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
};

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdote,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  voteFor,
  setNotification
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;

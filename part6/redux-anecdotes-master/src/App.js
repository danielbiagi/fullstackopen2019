import React, { useEffect } from "react";
import { connect } from "react-redux";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = props => {
  useEffect(() => {
    props.initializeAnecdotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="notification">
        <Notification />
      </div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default connect(
  null,
  { initializeAnecdotes }
)(App);

import React, { Component } from 'react';
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import axios from "axios";

import './App.css';

class App extends React.Component {
  state = {
    todos: [],
    isLoading:false
  };

  componentDidMount() {
    const context = this
    this.setState({isLoading: true}, () => 
    axios
    .get("https://evening-mountain-35471.herokuapp.com/todos")
    .then(res => {
      context.setState({
        todos: res.data,
        isLoading: false
      });
      console.log(res.data)
      console.log(this.state)
    }
      )
    )
  }

  // toggle complete
  markComplte = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo._id === id) {
          todo.status = !todo.status;
        }
        return todo;
      })
    });
  };

  // Add Todo
  AddTodo = kegiatan => {
    axios
    .post("https://evening-mountain-35471.herokuapp.com/todos", {
      kegiatan,
      status: false
    })
    .then(res => 
      this.setState({
        todos: [...this.state.todos, res.data]
      })
      );
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddTodo AddTodo = {this.AddTodo} />{" "}
          {this.state.isLoading? <div>Lagi loading...</div>: <Todo
          todos={this.state.todos}
        markComplete={this.markComplete}
        />}
        </div>{" "}
      </div>
    );
  }
}

export default App;

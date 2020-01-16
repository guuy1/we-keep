import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import Title from "./Title";
import Menu from "./Menu";
import "./ShoppingList.css";
import "font-awesome/css/font-awesome.min.css";

const ShoppingList = () => (
  <div>
    <Shopping />
  </div>
);
class ShoppingListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      tasks: []
    };
  }

  componentDidMount() {
    this.setState({ task: "" });
    // this.props.firebase.lists().on('value', () => {
    // });
    this.setState({ tasks: [] });
  }

  componentWillUnmount() {
    this.props.firebase.lists().off();
  }
  render() {
    const { tasks, task } = this.state;
    const handleAdd = e => {
      e.preventDefault();
      if (!task) return; // don't add empty task to array
      this.setState({ tasks: [...tasks, { task, isComplete: false }] });
      this.setState({ task: "" });
    };

    const handleComplete = index => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1, {
        task: tasks[index].task,
        isComplete: !tasks[index].isComplete
      });
      this.setState({ tasks: newTasks });
    };

    const handleUpdateTask = e => {
      this.setState({ task: e.target.value });
    };

    const handleUpdateTasks = index => e => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1, {
        task: e.target.value,
        isComplete: tasks[index].isComplete
      });
      this.setState({ tasks: newTasks });
    };

    const handleDelete = index => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      this.setState({ tasks: newTasks });
    };

    return (
      <div className="shopping-list">
        <div className="taskContainer">
          <Title />
          {tasks.map((item, index) => (
            <form onSubmit={handleAdd} className="tasksForm" key={index}>
              <div>
                <i
                  className={
                    item.isComplete
                      ? "far fa-check-square m-1"
                      : "far fa-square m-1"
                  }
                  onClick={() => handleComplete(index)}
                />
                <input
                  type="text"
                  value={item.task}
                  onChange={handleUpdateTasks(index)}
                  style={{ textDecoration: item.isComplete && "line-through" }}
                />
              </div>
              <i className="fas fa-times" onClick={() => handleDelete(index)} />
            </form>
          ))}

          <form onSubmit={handleAdd} className="taskForm">
            <i className="fas fa-plus m-1" />
            <input
              type="text"
              value={task}
              onChange={handleUpdateTask}
              placeholder="List Item"
            />
          </form>
          <hr />
          <Menu />
        </div>
      </div>
    );
  }
}
const Shopping = withFirebase(ShoppingListComp);
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ShoppingList);

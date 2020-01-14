import React, { useState } from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import Title from './Title'
import Menu from './Menu'
import './ShoppingList.css'
import 'font-awesome/css/font-awesome.min.css'

const ShoppingList = () => {
  // const [search, setSearch] = useState("");

  // function validateForm() {
  //   return search.length > 0;
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  // }

  // function showImg() {
  //   var idd = document.getElementById("image");
  //   idd.remove();
  //   const url =
  //     "https://m.pricez.co.il/ProductPictures/200x/" + search + ".jpg";
  //   var img = document.createElement("img");
  //   img.src = url;
  //   img.id = "image";
  //   var id = document.getElementById("showImage");
  //   id.appendChild(img);
  //   setSearch("");
  // }

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const handleAdd = e => {
    e.preventDefault()
    if (!task) return // don't add empty task to array
    setTasks([...tasks, { task, isComplete: false }])
    setTask('')
  }

  const handleComplete = index => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1, {
      task: tasks[index].task,
      isComplete: !tasks[index].isComplete
    })
    setTasks(newTasks)
  }

  const handleUpdateTask = e => setTask(e.target.value)

  const handleUpdateTasks = index => e => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1, {
      task: e.target.value,
      isComplete: tasks[index].isComplete
    })
    setTasks(newTasks)
  }

  const handleDelete = index => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }
  return (
    <div className="shopping-list">
      <div className="taskContainer">
        <Title />

        {tasks.map((item, index) => (
          <form onSubmit={handleAdd} className="tasksForm" key={index}>
            <div>
              <i
                className={
                  item.isComplete ? 'far fa-check-square' : 'far fa-square'
                }
                onClick={() => handleComplete(index)}
              />
              <input
                type="text"
                value={item.task}
                onChange={handleUpdateTasks(index)}
                style={{ textDecoration: item.isComplete && 'line-through' }}
              />
            </div>
            <i className="fas fa-times" onClick={() => handleDelete(index)} />
          </form>
        ))}

        <form onSubmit={handleAdd} className="taskForm">
          <i className="fas fa-plus"/>
          <input
            type="text"
            value={task}
            onChange={handleUpdateTask}
            placeholder="List Item"
          />
        </form>

        <Menu />
      </div>
    </div>);
};
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ShoppingList);


import { useState } from 'react'
import './ToDo-List.css'

const ToDoList = () => {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [editId, setEditId] = useState(null)

  const completedTasks = tasks.filter(task => task.completed).length

  let completionRate = 0

  if (tasks.length > 0) {
    completionRate = Math.round((completedTasks / tasks.length) * 100)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const enteredTask = taskInput.trim()

    if (enteredTask === '') return

    if (editId !== null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editId) {
          return { ...task, title: enteredTask }
        }

        return task
      })

      setTasks(updatedTasks)
      setEditId(null)
    } else {
      const newTask = {
        id: Date.now(),
        title: enteredTask,
        completed: false,
      }

      setTasks([...tasks, newTask])
    }

    setTaskInput('')
  }

  const editTask = (task) => {
    setTaskInput(task.title)
    setEditId(task.id)
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => task.id !== id)

    setTasks(remainingTasks)

    if (editId === id) {
      setEditId(null)
      setTaskInput('')
    }
  }

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  return (
    <div className="TD-Page">
      <div className="TD-Container">

        <div className="TD-Header">
          <p className="TD-Header-Label">STAY ORGANIZED</p>

          <h1>
            My <span className="TD-Header-Accent">Todo List.</span>
          </h1>

          <p className="TD-Header-Subtitle">
            Plan your day. Get things done.
          </p>
        </div>

        <form className="TD-Form" onSubmit={handleSubmit}>
          <input
            className="TD-Input"
            type="text"
            placeholder="What needs to be done?"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />

          <button type="submit" className="TD-Submit-Button">
            {editId !== null ? 'Update' : '+ Add Task'}
          </button>
        </form>

        <div className="TD-List">

          <div className="TD-List-Heading">
            <h2>Your Tasks</h2>
            <span>
              {tasks.length} total · {completedTasks} completed
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="TD-Empty">
              <p>No tasks yet!</p>
              <span>Add your first task to get started.</span>
            </div>
          ) : (
            tasks.map((task) => (
              <div className="TD-Item" key={task.id}>

                <label className="TD-Item-Content">
                  <input
                    className="TD-Checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span className={task.completed ? 'TD-Item-Completed' : 'TD-Item-Text'}>
                    {task.title}
                  </span>
                </label>

                <div className="TD-Item-Actions">
                  <button
                    type="button"
                    className="TD-Edit-Button"
                    onClick={() => editTask(task)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="TD-Delete-Button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}

        </div>

        <div className="TD-Summary">

          <div className="TD-Summary-Heading">
            <span>Your progress</span>
            <strong>{completionRate}%</strong>
          </div>

          <div className="TD-Summary-Track">
            <div
              className="TD-Summary-Fill"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <p className="TD-Summary-Text">
            You've completed {completedTasks} out of {tasks.length} tasks.
          </p>

        </div>

        <div className="TD-Footer">
          Made for better productivity.
        </div>

      </div>
    </div>
  )
}

export default ToDoList

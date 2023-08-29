import './index.css';
import { useState, useEffect } from 'react'

alert("Bienvenido a TaskApp, Aca podras añadir, completar y eliminar las tareas que tengas pendientes sin necesidad a que se eliminen cuando reinices la pagina. Sebastian Ruiz.")

function App() {
  const [task, setTask] = useState('')
  const [input, setInput] = useState('') // Nuevo estado para el input
  const [taskItem, setTaskItem] = useState([])

  useEffect(() => {
    let data = localStorage.getItem("task")
    if (data) {
      setTaskItem(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskItem))
  }, [taskItem])

  const handleSubmit = (e) => {
    e.preventDefault()
    setTask("")
    createTask(task)
  }

  const createTask = (taskName) => {
    if (!taskItem.find(task => task.name === taskName)) {
      setTaskItem([...taskItem, { name: taskName, done: false }])
    } else {
      alert("Esa tarea no se puede agendar o ya se encuentra agendada.")
    }
  }

  const toggleTask = (task) => {
    setTaskItem(
      taskItem.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    )
  }

  const taskTableRow = (doneVal) => {
    return (
      taskItem
        .filter(task => task.done === doneVal)
        .map(taskItem => (
          <tr key={taskItem.name}>
            <td>
              <li>
                {taskItem.name}
                <label class="cl-checkbox">
                  <input checked={taskItem.done} type="checkbox" onChange={() => toggleTask(taskItem)} key={task.name} />
                  <span></span>
                </label>
              </li>
            </td>
          </tr>
        ))
    )
  }

  const deleteCompletedTask = () => {
    const updatedTask = taskItem.filter(task => !task.done)
    setTaskItem(updatedTask)
  }

  const handleCounter = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setInput(value);
    }
  }
  return (
    <div class="card">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="card-inner">
        <div className="App">
          <form onSubmit={handleSubmit}>
            <input
              id='text'
              maxLength="50"
              type='text'
              placeholder='Por favor ingrese una tarea por hacer'
              onChange={(e) => {handleCounter(e); setTask(e.target.value)}}
              value={task}
            />
            <button type='submit'>Enter</button>
          </form>
          <p id='counter'>{input.length} / 50</p> {/* Mostrar contador en la etiqueta <p> */}
          <div className='task'>
            <span>Tareas por hacer:</span>
            <table>
              <tbody>
                {
                  taskTableRow(false)
                }
              </tbody>
            </table>
          </div>
          <div className='delete'>
            <button onClick={deleteCompletedTask}>
              <i className="fa-solid fa-trash-can" />
            </button>
          </div>
          <div className="completed-task">
            <span>Tareas completadas:</span>
            <table>
              <tbody>
                <s>
                  {
                    taskTableRow(true)
                  }
                </s>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
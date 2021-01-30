import './App.css';
import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { TasksList } from './components/list-tasks';
import {API} from './api-service'

function App() {

  document.title = 'Tasks';
  
  const [token, setToken, deleteToken] = useCookies(['token']);

  const [userID, setUserID, deleteUserID] = useCookies(['id']);

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('');

  const user = tasks[0]
  
  useEffect(() => {
    if(!token['token']) window.location.href = '/'
  }, [token])

  const logoutUser = () => {
    deleteToken(['token']);
    deleteUserID(['id']);
  }

  useEffect(() => {
    API.getTasks(token['token']).then(resp => setTasks(resp))
  }, [])

  const updateTaskListAction = task =>{
    const updatedTaskList = tasks.filter(tsk => tsk.id !== task.id)
    setTasks(updatedTaskList)
  }

  const addNewTask = () => {
    if (newTask.length >200){
      alert('Task length cannot be greater than 200.')
    }
    else if (newTask.length === 0){
      alert('Empty task cannot be added!')
    }
    else{
      const newTaskAdded = [...tasks, newTask]
      setTasks(newTaskAdded)
      API.addTask({task: newTask, user: userID['id']},token['token']).catch(error => console.log(error))
      // API.getTasks(token['token']).then(resp => setTasks(resp))
      setNewTask('')
    }
  }
  
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className='Logout_NewTask_Nav'>
          <h2>To-Do</h2>
          <FontAwesomeIcon icon={faSignOutAlt} className="Icons" onClick={logoutUser}/>
        </div>
      </nav>
      <div>
        <TasksList 
          tasks={tasks}
          updateTaskList={updateTaskListAction}/>
      </div>
      <div className='addTaskComponent'>
        <input type="text" placeholder='New Task' value={newTask} onChange={evnt => setNewTask(evnt.target.value)}/>
        <button className='btn btn-success' onClick={addNewTask}>Add New Task</button>
      </div>
    </div>
  );
}

export default App;
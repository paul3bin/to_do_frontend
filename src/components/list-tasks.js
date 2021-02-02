import React from 'react';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { API } from '../api-service';

function TasksList(props){

    const [token] = useCookies(['token'])

    const removeTask = task => {
        API.deleteTask(task.id, token['token'])
        .then(() => props.updateTaskList(task))
        .catch(error => console.log(error))
    }

    return (
        <div className='Task-List'>
            {props.tasks && props.tasks.map(task => {
              return (
                  <div key={task.id} className='Task-Item'>
                      <h2>{task.task}</h2>
                      <p>{task.date.slice(0,10).split("-").reverse().join("/")}</p>
                      <FontAwesomeIcon icon={faTrash} onClick={() => removeTask(task)} className="Icons"/>
                  </div>
              )
            })}
        </div>
    )

}

export { TasksList };
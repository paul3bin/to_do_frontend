import React from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import FlipMove from "react-flip-move";

import { API } from "../api-service";

function TasksList(props) {
  const [token] = useCookies(["token"]);

  const removeTask = (task) => {
    API.deleteTask(task.id, token["token"])
      .then(() => props.updateTaskList(task))
      .catch((error) => console.log(error));
  };

  const taskItem =
    props.tasks &&
    props.tasks.map((task) => {
      return (
        <div key={task.id} className="Task-Item">
          <p>{task.task}</p>
          <p>{task.date.slice(0, 10).split("-").reverse().join("/")}</p>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => removeTask(task)}
            className="Icons"
          />
        </div>
      );
    });

  return (
    <div className="Task-List">
      <FlipMove duration={300} easing="ease-in-out">
        {taskItem}
      </FlipMove>
    </div>
  );
}

export { TasksList };

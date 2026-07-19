import { memo } from "react";

const TaskRow = memo(({ task }) => {

    const statoClassName = task.status.replace(" ", "").toLowerCase();
  return (
    <tr>
      <td>{task.title}</td>
      <td className={statoClassName}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  )
});

export default TaskRow
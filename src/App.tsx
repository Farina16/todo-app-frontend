import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TASK, DELETE_TASK, TASKLIST, UPDATE_TASK } from './query';
interface ITask {
  _id: number;
  name: string;
  status: string;
}

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const {data, refetch} = useQuery(TASKLIST);
  const [addTask] = useMutation(ADD_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleAddTask = () => {
    if (task) {
      addTask({
        variables: {
          payload: {
            name: task,
            status: 'pending'
          }
        }
      }).then((res: any) => {
        refetch();
        console.log(res);
      })
    }
    // task && setTasks([...tasks, { id: tasks?.length + 1 || 1, name: task, status: 'pending' }])
    setTask('');
  }

  const handleDeleteTask = (id: number) => {
    deleteTask({
      variables: {
        id
      }
    }).then(() => {
      refetch();
    })
  }

  const handleUpdateTask = (task: ITask, isDone: boolean) => {
    updateTask({
      variables:{
        id: task._id,
        payload: {
          name: task.name,
          status: isDone ? 'pending' : 'complete'
        }
      }
    }).then(() => {
      refetch();
    })
  }

  useEffect(() => {
    data?.listTasks?.edges?.length > 0 && setTasks(data?.listTasks?.edges);
  }, [data]);

  return (
    <div className="App">
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-gray-darkest">Todo List</h1>
            <div className="flex mt-4">
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-darker" 
                  value={task} 
                  onChange={(e) => setTask(e.target.value)} 
                  placeholder="Add Todo" 
                />
                <button onClick={handleAddTask} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:bg-teal">Add</button>
            </div>
          </div>
          <div>
            { tasks?.length > 0 &&  tasks?.map((_task: ITask) => (
              <div key={_task._id} className="flex mb-4 items-center">
                <p className="w-full text-gray-darkest">{_task?.name}</p>
                {_task?.status === 'pending' ? (
                  <button onClick={() => handleUpdateTask(_task, false)} className="flex-no-shrink p-2 ml-4 mr-2 border-2 w-40 rounded text-gray border-gray hover:bg-gray">Not Done</button>
                ) : (
                  <button onClick={() => handleUpdateTask(_task, true)} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-green border-green hover:bg-green">Done</button>
                )}
                <button onClick={() => handleDeleteTask(_task._id)} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-red">Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

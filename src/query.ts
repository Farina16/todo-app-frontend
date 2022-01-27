import { gql } from "@apollo/client";

const TASKLIST = gql`
  query ListTasks {
    listTasks {
      edges{
        name
        status
        _id
      }
    }
  }
`;

const ADD_TASK = gql`
    mutation AddTask($payload: TaskInput!){
        addTask(payload: $payload) {
            _id
            status
            name
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($id: String){
        deleteTask(where: {id: $id}){
            edges{
                status
                name
                _id
            }
        }
    }
`;

const UPDATE_TASK = gql`
    mutation UpdateTask($id: String, $payload: TaskInput!){
        updateTask(where: {id: $id}, payload: $payload){
          edges {
            status
            name
            _id
          }
        }
      }
`;

export {
    TASKLIST,
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK
}
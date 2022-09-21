import React, {useEffect, useState} from "react";
import TodoList from "../../Components/TodoList/TodoList";
import "../Dashboard/Dashboard.css";
import {connect, useSelector} from "react-redux";
import axios from "axios";
import { Container, Col } from "react-bootstrap";
import AddTodo from "../AddTodo/AddTodo";


function Dashboard() 
{
    const [todoData, setTodoData] = useState([]);
    const [err, setError]= useState("");
    
  
    //onload screen
    useEffect(() => {
      axios.get("https://dummyjson.com/todos?limit=10")
      .then((response) => {
        console.log("hooo...", response.data);
        setTodoData(response.data.todos)
      })
      .catch(err => setError(err.message))
    }, []);

return (
    <div>
      <AddTodo/>
      <Container>
        <Col>
          {
            todoData.map((td,index) => <TodoList key={index} id={td.id} todo={td.todo} completed={td.completed} />)
          }
        </Col>
      </Container>
    </div>
  );
}

export default Dashboard;
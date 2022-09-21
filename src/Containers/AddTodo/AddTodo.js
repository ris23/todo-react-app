import {useState} from "react";
import TodoList from "../../Components/TodoList/TodoList";
import "../Dashboard/Dashboard.css";


//import actions
import {connect, useSelector} from "react-redux";
import {addTodo} from "../../Actions/action";

import {Container, Row, Col, Button, Form, Modal} from "react-bootstrap";



function AddTodo({onAddTodo})
{
    const [todoVal, setTodoVal] = useState([]);

    const todoData = useSelector((state) => state.todo.data);
    const[modalText, setModalText] = useState("");
    const [show, setShow] = useState(false);

    const [userId, setUserId] = useState(100);
    const [completed, setCompleted] = useState(false);

    function addNewPressed()
    {
        if (todoVal !== "")
        {
            const data = {
                todo : todoVal,
                completed : false,
                userId : 100,
            };
            
            onAddTodo(data); 
            AddOnTask(data);
            
            console.log("DATA: ",data);
            //reset todoVal
            setTodoVal("");
        }
        else
        {
            setShow(true);
            setModalText("Please, fill your task");
           
        }
        
    }

    function AddOnTask()
    {   
        fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: todoVal,
            completed: completed,
            userId: userId,
        })
    })
        .then(res => res.json())
        .then(console.log);
    }

    return(
        <div>
            <div id="container">
                    <input style={{width : '50%', alignItems: 'center'}} type="text"  
                        onChange={(text) => setTodoVal(text.target.value)} 
                        value={todoVal}>
                    </input>
                <Button variant="dark" onClick={() => addNewPressed()}>Add Task</Button>
            </div>
            
            <Container>
                <Row>
                    { todoData.map((list, index) => (
                        <TodoList key={index} id={list.id} todo={list.todo} completed={list.completed}/>
                    ))}
                </Row>
            </Container>

            <Modal show={show}>
                <Modal.Header><h1>Opps!</h1></Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                <Button variant="text" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = {
    onAddTodo: addTodo, 
}

export default connect(null,mapDispatchToProps)(AddTodo);

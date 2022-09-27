
import React , {useState}from "react";
import "../../Components/TodoList/TodoList.css";
import {Modal} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {removeTodo} from "../../Actions/action";
import {connect} from "react-redux";
import Checkbox from '@mui/material/Checkbox';

function TodoList({id, todo, completed, onDeleteTask, updateTask}) {

    const [show, setShow] = useState(false);
    const [line, setLine] = useState(false);
    const [check, setCheck] = useState(true);

    function showDetails()
    {
        Modal ? setShow(true) : setShow(false);
    }

    function deletePressed(data)
    {
        if(data)
        {
            DeleteTask(data);
        }
        onDeleteTask(data);
    }

    function trueStatus(id,completed)
    {
        completed = false;
        updateTaskClick(id, completed);
    }

    function falseStatus(id,completed)
    {
        completed = true;
        updateTaskClick(id, completed);
    }

    function completedTask(id,completed)
    {
        setLine(true);
        completed ?  trueStatus(id,completed) : falseStatus(id,completed) 
    }

    function DeleteTask (id) 
    {    
        fetch(`https://dummyjson.com/todos/${id}`, {
            method: 'DELETE',
          })
          .then(res => res.json())
          .then(console.log);      
    };

    function updateTaskClick(id,completed)
    {
        fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            completed: completed,
        })
        })
        .then(res => res.json())
        .then(console.log);
    }

    function changeCheckBox(completed) {
       setCheck(completed);
    }

    return(
        <div>
            <div className="todo_list" >
                <div onClick={() => showDetails()}>
                    <h6 style={{textDecoration: line ? "line-through" : "none"}}>{todo}</h6>
                </div>
                <div id="del_div">
                    <div id="cb_div" onClick={() => completedTask(id,completed)}>
                    <Checkbox color="secondary"/>
                        </div>
                    <IconButton aria-label="delete" color="secondary" onClick={() => deletePressed(id)}>
                    <DeleteIcon />
                    </IconButton>
                </div>
            </div>
           
            <Modal show={show}>
                <Modal.Header><h1>To Do Details</h1></Modal.Header>
                <Modal.Body>{todo}</Modal.Body>
                <Modal.Footer>
                <Button variant="text" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = 
{
    onDeleteTask : removeTodo
}

export default connect(null, mapDispatchToProps)(TodoList);
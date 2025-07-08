import { useState } from 'react'
import { isStringEmpty } from '../utils'

export function TodoCard(props) {
    const { todo, todoIndex, handleDeleteTodo, handleCompleteTodo, handleEditTodo } = props
    const [editing, setEditing] = useState(false)
    const [editValue, setEditValue] = useState(todo.input)

    return (
        <div className="card todo-item">
            <div>
                {editing ? (  // Decision if there will be displayed editing input
                    <div className="input-container">
                        <input value={editValue} onChange={(e) => {
                            setEditValue(e.target.value)
                        }} />
                        <button onClick={() => {
                            if (isStringEmpty(editValue)) {
                                setEditValue(todo[1].input)
                            } else {
                                handleEditTodo(todoIndex, editValue, todo[1].complete)
                            }
                            setEditing(false)
                        }}>
                            <h6>Ok</h6>
                        </button>
                    </div>
                ) : (
                    <p>{todo[1].input}</p>
                )}
            </div>
            <div className="todo-buttons">
                <button onClick={() => {
                    handleCompleteTodo(todo[0])
                }} disabled={todo[1].complete}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => {
                    setEditing(true)
                }}>
                    <h6>Edit</h6>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(todo[0])
                }}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    )
}
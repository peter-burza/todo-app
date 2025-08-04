import { useState } from 'react'
import { handleKeyDown } from '../utils'

export function TodoInput(props) {
    const { handleAddTodo } = props
    const [inputValue, setInputValue] = useState('')

    function addTodo() {
        if (!inputValue) return
        handleAddTodo(inputValue)
        setInputValue('')
    }

    return (
        <div className="input-container">
            <input value={inputValue} onKeyDown={(event) => {handleKeyDown(event, addTodo)}} onChange={(e) => {
                setInputValue(e.target.value)
            }} placeholder="Add task" />
            <button onClick={addTodo}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}
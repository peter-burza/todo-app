import { TodoCard } from "./TodoCard";

export function TodoList(props) {
    const { todos } = props

    const tab = 'All'
    const filteredTodosList = tab === 'All' ?
        todos :
        tab === 'Open' ?
            todos.filter(val => !val.complete) :
            todos.filter(val => val.complete)

    return (
        <>
            {filteredTodosList.map((todo, todoIndex) => {
                return (
                    <TodoCard
                        key={todoIndex}
                        todo={todo}
                    />
                )
            })}
        </>
    )
}
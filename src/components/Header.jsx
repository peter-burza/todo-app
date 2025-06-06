export function Header(props) {
    const { todos } = props
    // const todoLength = todos.length
    const openedTodosLength = todos.filter(val => !val.complete).length

    const isTasksPlural = openedTodosLength != 1

    const taskOrTasks = isTasksPlural ? 'tasks' : 'task'

    return (
        <header>
            <h1 className="text-gradient">You have {openedTodosLength} open {taskOrTasks}.</h1>
        </header>
    )
}
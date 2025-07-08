export function Header(props) {
    const { todos, setShowModal } = props
    
    const openedTodosLength = todos.filter(val => !val.complete).length
    const isTasksPlural = openedTodosLength != 1
    const taskOrTasks = isTasksPlural ? 'tasks' : 'task'

    return (
        <header>
                <h1 className="text-gradient">You have {openedTodosLength} open {taskOrTasks}.</h1>
                <button className="login-button" onClick={() => {setShowModal(true)}}>
                    <p className="login-text">Login</p>
                    <i className="fa-solid fa-user login-icon"></i>
                </button>
        </header>
    )
}
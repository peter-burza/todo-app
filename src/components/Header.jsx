import { useAuth } from "../context/AuthContext"
import AccountMenu from "./AccountMenu"

export function Header(props) {
    const { globalDataEntries, setShowModal } = props
    const { globalUser } = useAuth()

    const openedTodosLength = globalDataEntries.filter(todo => !todo[1].complete).length
    const isTasksPlural = openedTodosLength != 1
    const taskOrTasks = isTasksPlural ? 'tasks' : 'task'


    return (
        <header>
            <h1 className="text-gradient">You have {openedTodosLength} open {taskOrTasks}.</h1>
            {globalUser ? (
                // <button className="login-button" onClick={() => { setShowModal(true) }}>
                    // <p className="login-text">{screenWidth < 600 ?
                    //     `${globalUser.email.slice(0, 6)}...`
                    //     : globalUser.email}</p>
                    // <i className="fa-solid fa-bars login-icon"></i>
                // </button>
                <AccountMenu />
            ) : (
                <button className="login-button" onClick={() => { setShowModal(true) }}>
                    <p className="login-text">Login</p>
                    <i className="fa-solid fa-bars login-icon"></i>
                </button>
            )}
        </header>
    )
}
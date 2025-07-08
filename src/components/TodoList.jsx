import { useAuth } from "../context/AuthContext";
import { TodoCard } from "./TodoCard";

export function TodoList(props) {
    const { globalDataEntries, selectedTab } = props
    /* 
    The globalDataEntries look like this: 
      [
        "1688802093843",
        { input: "Buy milk", complete: false }
      ],
      [
        "1688802156780",
        { input: "Clean the house", complete: false }
      ]
    ]
    */

    const filteredTodosList = selectedTab === 'All' ?
        globalDataEntries :
        selectedTab === 'Open' ?
            globalDataEntries.filter(todo => !todo[1].complete) :
            globalDataEntries.filter(todo => todo[1].complete)

    return (
        <>
            {filteredTodosList.map((todo) => {
                return (
                    <TodoCard
                        key={todo[0]} // timestamp
                        todoIndex={globalDataEntries.findIndex(val => val[1].input == todo[1].input)}
                        {...props}
                        todo={todo}
                    />
                )
            })}
        </>
    )
}
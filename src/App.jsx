import Authentication from "./components/Authentication"
import { Header } from "./components/Header"
import Modal from "./components/Modal"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { isStringEmpty } from './utils'
import { useState } from 'react'
import { useAuth } from "./context/AuthContext"
import { doc, setDoc, updateDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'

function App() {
  const timestamp = Date.now()
  const [selectedTab, setSelectedTab] = useState('Open')
  const [showModal, setShowModal] = useState(false)
  const { globalUser, globalData, setGlobalData } = useAuth()
  const globalDataEntries = globalData ? Object.entries(globalData) : [];

  async function handleAddTodo(newTodoInput) {
    if (isStringEmpty(newTodoInput)) return

    try {
      const newTodoList = {
        ...(globalData || {})
      }
      console.log(newTodoList)
      const newTodo = {
        input: newTodoInput,
        complete: false
      }
      newTodoList[timestamp] = newTodo
      console.log(timestamp, newTodo)

      saveDataOnFirestore(newTodoList, timestamp, newTodo)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCompleteTodo(timestamp) {
    try {
      let newTodoList = { ...globalData }
      let completedTodo = globalData[timestamp]
      completedTodo.complete = true
      newTodoList[timestamp] = completedTodo

      saveDataOnFirestore(newTodoList, timestamp, completedTodo)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteTodo(timestamp) {
    try {
      const newTodoList = { ...globalData }
      delete newTodoList[timestamp]

      // update globalData
      setGlobalData(newTodoList)
      if (!globalUser) return

      //persist the data in the firebase firestore
      const userRef = doc(db, 'users', globalUser.uid)
      await updateDoc(userRef, {
        [timestamp]: deleteField()
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEditTodo(timestamp, newValue, isComplete) {
    const newTodoList = { ...globalData }
    const editedTodo = { input: newValue, complete: isComplete }
    newTodoList[timestamp] = editedTodo

    saveDataOnFirestore(newTodoList, timestamp, editedTodo)
  }

  async function saveDataOnFirestore(todoList, timeStamp, todo) {

    // update globalData
    setGlobalData(todoList)
    if (!globalUser) return

    //persist the data in the firebase firestore
    const userRef = doc(db, 'users', globalUser.uid)
    await setDoc(userRef, {
      [timeStamp]: todo
    }, { merge: true })
  }

  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  return (
    <>
      <Header globalDataEntries={globalDataEntries} setShowModal={setShowModal} />
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} globalDataEntries={globalDataEntries} />
      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} selectedTab={selectedTab} globalDataEntries={globalDataEntries} />
      <TodoInput handleAddTodo={handleAddTodo} />
      {globalUser && (
        <section id="profile-section" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="">Profile</h2>
            <hr />
          </div>
          <div className="flex items-center gap-4">
            <h3>Email: </h3>
            <p>{globalUser.email}</p>
          </div>
        </section>
      )}
    </>
  )
}

export default App

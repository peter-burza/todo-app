import Authentication from "./components/Authentication"
import { Header } from "./components/Header"
import Modal from "./components/Modal"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { isStringEmpty } from './utils'
import { useState, useEffect } from 'react'
import { useAuth } from "./context/AuthContext"
import { doc, setDoc, updateDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'

function App() {
  const timestamp = Date.now()
  const [todos, setTodos] = useState({
    timestamp: { input: 'Hello! Add your first todo!', complete: false }
  })
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

      // update globalData
      setGlobalData(newTodoList)

      //persist the data in the firebase firestore
      const userRef = doc(db, 'users', globalUser.uid)
      await setDoc(userRef, {
        [timestamp]: newTodo
      }, { merge: true })
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

      // update globalData
      setGlobalData(newTodoList)

      //persist the data in the firebase firestore
      const userRef = doc(db, 'users', globalUser.uid)
      await setDoc(userRef, {
        [timestamp]: completedTodo
      }, { merge: true })
    } catch (error) {
      console.log(error)
    }
    // setTodos(newTodoList)
    // handleSaveData(newTodoList)
  }

  async function handleDeleteTodo(timestamp) {
    try {
      const newTodoList = { ...globalData }
      delete newTodoList[timestamp]

      // update globalData
      setGlobalData(newTodoList)

      //persist the data in the firebase firestore
      const userRef = doc(db, 'users', globalUser.uid)
      await updateDoc(userRef, {
        [timestamp]: deleteField()
      })
    } catch (error) {
      console.log(error)
    }

    // setTodos(newTodoList)
    // handleSaveData(newTodoList)
  }

  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
  }

  function handleEditTodo(index, newValue, isComplete) {
    const newTodoList = [...todos]
    const editedTodo = { input: newValue, complete: isComplete }
    newTodoList[index] = editedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) return
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])

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
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import './props.css'
import router from './router'
import AppContext from './Appcontext'
import axiosInstance from './axios'
import { useDispatch } from 'react-redux'
import { getUser } from './redux/slices/userSlice'

function App() {
  const [id, setId] = useState()
  const dispatch = useDispatch()
  dispatch(getUser(id))

  useEffect(() => {
    const getId = async () => {
      try {
        const res = await axiosInstance.get('/jwtid', { withCredentials: true })
        setId(res.data.id)
      } catch (error) {
        console.log(error)
      }
    }

    getId()
  }, [id])
  return (
    <AppContext.Provider value={{ id }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

export default App

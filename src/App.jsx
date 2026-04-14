import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import AddEvent from './pages/AddEvent'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-event' element={<AddEvent />} />
      </Routes>
    </>
  )
}

export default App
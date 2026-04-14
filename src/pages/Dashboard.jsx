import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'
import './Dashboard.css'

function Dashboard() {

  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [myEvents, setMyEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        const bookingsRes = await API.get('/bookings/my')
        setBookings(bookingsRes.data.data)

        if (user?.role === 'organizer' || user?.role === 'admin') {
          const eventsRes = await API.get('/events')
          const filtered = eventsRes.data.data.filter(
            (e) => e.organizer._id === user.id
          )
          setMyEvents(filtered)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await API.delete(`/events/${id}`)
        setMyEvents(myEvents.filter((e) => e._id !== id))
        alert('Event deleted successfully')
      } catch (error) {
        alert(error.response?.data?.message || 'Error!')
      }
    }
  }

  if (loading)
    return (
      <div className='text-center mt-5'>
        <div className='spinner-border text-primary'></div>
      </div>
    )

  return (
    <div className='container my-5'>

      {/* HEADER */}
      <div className='dashboard-header'>
        <h2>
          <i className='bi bi-person-circle me-2'></i>
          Hello, {user?.name}!
        </h2>

        <p className='mb-0'>
          <i className='bi bi-person-badge me-2'></i>
          Role: {user?.role}
        </p>

        {(user?.role === 'organizer' || user?.role === 'admin') && (
          <Link to='/add-event' className='btn btn-light mt-3'>
            <i className='bi bi-plus-circle me-2'></i>
            Add Event
          </Link>
        )}
      </div>

      {/* MY EVENTS */}
      {(user?.role === 'organizer' || user?.role === 'admin') && (
        <div className='bookings-card mt-4'>
          <h4>
            <i className='bi bi-card-list me-2'></i>
            My Events ({myEvents.length})
          </h4>

          {myEvents.length === 0 ? (
            <p>No events found</p>
          ) : (
            <div className='row g-3'>
              {myEvents.map((event) => (
                <div key={event._id} className='col-md-3'>
                  <div className='card booking-item'>
                    <h5>
                      <i className='bi bi-calendar-event me-2'></i>
                      {event.title}
                    </h5>

                    <p>
                      <i className='bi bi-calendar3 me-2'></i>
                      Date: {new Date(event.date).toLocaleDateString()}
                    </p>

                    <p>
                      <i className='bi bi-geo-alt me-2'></i>
                      City: {event.location.city}
                    </p>

                    <p>
                      <i className='bi bi-cash me-2'></i>
                      {event.price === 0 ? 'Free' : `${event.price} EUR`}
                    </p>

                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handleDelete(event._id)}
                    >
                      <i className='bi bi-trash me-2'></i>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOOKINGS */}
      <div className='bookings-card mt-4'>
        <h4>
          <i className='bi bi-ticket-perforated me-2'></i>
          My Bookings ({bookings.length})
        </h4>

        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} className='card p-3 mb-2'>
              <h5>
                <i className='bi bi-calendar-event me-2'></i>
                {b.event?.title}
              </h5>

              <p>
                <i className='bi bi-calendar3 me-2'></i>
                Date: {new Date(b.event?.date).toLocaleDateString()}
              </p>

              <p>
                <i className='bi bi-geo-alt me-2'></i>
                City: {b.event?.location?.city}
              </p>

              <span>
                <i className='bi bi-info-circle me-2'></i>
                {b.status}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Dashboard
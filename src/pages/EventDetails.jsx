import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import API from '../api/axios'
import './EventDetails.css'

function EventDetails() {
  const { id } = useParams()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [event, setEvent] = useState(null)
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [stars, setStars] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, ratingsRes] = await Promise.all([
          API.get(`/events/${id}`),
          API.get(`/ratings/${id}`)
        ])
        setEvent(eventRes.data.data)
        setRatings(ratingsRes.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleBooking = async () => {
    try {
      await API.post('/bookings', { eventId: id })
      alert('Booking confirmed!')
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed')
    }
  }

  const handleRating = async (e) => {
    e.preventDefault()
    try {
      await API.post('/ratings', { eventId: id, stars, comment })
      alert('Rating submitted!')
      window.location.reload()
    } catch (error) {
      alert(error.response?.data?.message || 'Rating failed')
    }
  }

  if (loading) return (
    <div className='text-center mt-5'>
      <div className='spinner-border text-primary'></div>
    </div>
  )

  if (!event) return (
    <div className='text-center mt-5'>
      <p>Event not found</p>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div 
        className='event-details-header'
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className='overlay'></div>

        <div className='container position-relative'>
          <span className='badge bg-white text-primary event-badge'>
            <i className="bi bi-tag-fill me-1"></i>
            {event.category}
          </span>

          <h1 className='mt-3'>
            <i className="bi bi-calendar-event me-2"></i>
            {event.title}
          </h1>
        </div>
      </div>

      <div className='container mb-5'>
        <div className='row'>
          <div className='col-md-8'>

            {/* Event Details */}
            <div className='card event-details-card p-4 mb-4'>
              <p className='text-muted'>{event.description}</p>
              <hr />

              <div className='event-info'>
                <p>
                  <i className="bi bi-calendar-event me-2"></i>
                  {new Date(event.date).toLocaleDateString()}
                  <i className="bi bi-clock ms-3 me-2"></i>
                  {event.time}
                </p>

                <p>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  {event.location.city} - {event.location.address}
                </p>

                <p>
                  <i className="bi bi-person-fill me-2"></i>
                  Organized by: {event.organizer?.name}
                </p>

                <p className='fw-bold text-primary fs-5'>
                  {event.price === 0 ? (
                    <>
                      <i className="bi bi-gift-fill me-2"></i>
                      Free
                    </>
                  ) : (
                    <>
                      <i className="bi bi-cash-stack me-2"></i>
                      {event.price} EUR
                    </>
                  )}
                </p>
              </div>

              {isAuthenticated && (
                <button className='btn btn-reserve mt-2' onClick={handleBooking}>
                  <i className="bi bi-ticket-perforated-fill me-2"></i>
                  Book Now
                </button>
              )}
            </div>

            {/* Ratings */}
            <div className='card ratings-card p-4 mb-4'>
              <div className='d-flex align-items-center gap-3 mb-3'>
                <h4 className='mb-0'>
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  Reviews ({ratings.total || 0})
                </h4>
                <span className='average-badge'>
                  {ratings.average || 0} / 5
                </span>
              </div>

              <hr />

              {ratings.data?.map((r) => (
                <div key={r._id} className='rating-item'>
                  <strong>{r.user?.name}</strong>
                  <span className='ms-2 text-warning'>
                    {[...Array(r.stars)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </span>
                  <p className='text-muted small mb-0'>{r.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Rating */}
            {isAuthenticated && (
              <div className='card rating-form-card p-4'>
                <h4>
                  <i className="bi bi-pencil-square me-2"></i>
                  Leave a Review
                </h4>

                <form onSubmit={handleRating}>
                  <div className="star-rating mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <i
                        key={s}
                        className={`bi ${s <= stars ? "bi-star-fill active" : "bi-star"}`}
                        onClick={() => setStars(s)}
                      ></i>
                    ))}
                  </div>

                  <div className='mb-3'>
                    <textarea
                      className='form-control'
                      rows={3}
                      placeholder="Write your comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <button type='submit' className='btn btn-submit-rating w-100'>
                    <i className="bi bi-send-fill me-2"></i>
                    Submit
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
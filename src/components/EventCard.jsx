import { Link } from 'react-router-dom'
import './EventsCard.css'

function EventCard({ event }) {
  return (
    <div className='card h-100 event-card'>
      {event.image ? (
        <img
          src={event.image}
          className='event-card-img w-100'
          alt={event.title}
        />
      ) : (
        <div className='event-card-placeholder text-white d-flex align-items-center justify-content-center'>
          <i className='bi bi-calendar-event' style={{ fontSize: '3rem' }}></i>
        </div>
      )}

      <div className='card-body'>
        <span className='badge event-card-badge mb-2'>{event.category}</span>

        <h5 className='event-card-title'>{event.title}</h5>

        <p className='event-card-info mb-1'>
          <i className='bi bi-calendar3 me-1'></i>
          {new Date(event.date).toLocaleDateString()}
          <span className='mx-2'>|</span>
          <i className='bi bi-clock me-1'></i>
          {event.time}
        </p>

        <p className='event-card-info mb-2'>
          <i className='bi bi-geo-alt me-1'></i>
          {event.location.city}
        </p>

        <p className='event-card-price mb-0'>
          {event.price === 0
            ? <><i className='bi bi-gift me-1'></i>Free</>
            : <><i className='bi bi-cash me-1'></i>{event.price} EUR</>
          }
        </p>
      </div>

      <div className='card-footer bg-white border-0 pb-3'>
        <Link
          to={`/events/${event._id}`}
          className='btn btn-details w-100'
        >
          <i className='bi bi-eye me-2'></i>
          View Details
        </Link>
      </div>
    </div>
  )
}

export default EventCard
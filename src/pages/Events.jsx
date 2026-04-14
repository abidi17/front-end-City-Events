import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import API from '../api/axios'
import EventCard from '../components/EventCard'
import './Events.css'

function Events() {
const [events, setEvents] = useState([])
const [loading, setLoading] = useState(true)
const [searchParams] = useSearchParams()

const category = searchParams.get('category')
const city = searchParams.get('city')

useEffect(() => {
const fetchEvents = async () => {
try {
let url = '/events?'
if (category) url += `category=${category}&`
if (city) url += `city=${city}`

const res = await API.get(url)
setEvents(res.data.data)
} catch (error) {
console.log(error)
} finally {
setLoading(false)
}
}

fetchEvents()
}, [category, city])

if (loading)
return (
<div className='text-center mt-5'>
<div className='spinner-border text-primary'></div>
</div>
)

return (
<div>
{/* 🔥 HEADER */}
<div className={`events-header ${category}`}>
<div className='overlay'>
<div className='container text-center'>
<h2>
<i className='bi bi-calendar-event me-2'></i>
{category ? `${category} Events` : 'All Events'}
</h2>
</div>
</div>
</div>

<div className='container'>
{/* 🔍 SEARCH */}
<div className='filter-section d-flex justify-content-center'>
<input
type='text'
className='search-input'
placeholder='Search events by city...'
onChange={(e) => {
const params = new URLSearchParams(searchParams)
params.set('city', e.target.value)
window.history.replaceState({}, '', `?${params}`)
}}
/>
</div>

{/* 📦 EVENTS */}
{events.length === 0 ? (
<div className='no-events'>
<i className='bi bi-search'></i>
<p>No events found</p>
</div>
) : (
<div className='row g-4'>
{events.map((event) => (
<div className='col-md-4' key={event._id}>
<EventCard event={event} />
</div>
))}
</div>
)}
</div>
</div>
)
}

export default Events
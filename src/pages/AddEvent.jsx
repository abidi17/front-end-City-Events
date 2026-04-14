import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import API from '../api/axios'
import './AddEvent.css'

function AddEvent() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const onSubmit = async (data) => {
    try {
      await API.post('/events', {
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
        time: data.time,
        location: {
          city: data.city,
          address: data.address
        },
        price: data.price,
        image: data.image
      })
      alert('Event added successfully!')
      navigate('/events')
    } catch (error) {
      alert(error.response?.data?.message || 'Error!')
    }
  }

  return (
    <div className='addevent-wrapper'>
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card addevent-card p-4'>
              <h2 className='text-center mb-4'>
                <i className='bi bi-calendar-plus me-2'></i>
                Add Event
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Title */}
                <div className='mb-3'>
                  <label className='form-label'>
                    <i className='bi bi-fonts me-2'></i>Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    {...register('title', { required: 'Title is required' })}
                  />
                  {errors.title && <small className='text-danger'>{errors.title.message}</small>}
                </div>

                {/* Description */}
                <div className='mb-3'>
                  <label className='form-label'>
                    <i className='bi bi-text-paragraph me-2'></i>Description
                  </label>
                  <textarea
                    className='form-control'
                    rows={3}
                    {...register('description', { required: 'Description is required' })}
                  />
                  {errors.description && <small className='text-danger'>{errors.description.message}</small>}
                </div>

                {/* Category */}
                <div className='mb-3'>
                  <label className='form-label'>
                    <i className='bi bi-grid me-2'></i>Category
                  </label>

                  <select
                    className='form-select'
                    {...register('category', { required: true })}
                  >
                    <option value='music'>Music</option>
                    <option value='sport'>Sport</option>
                    <option value='workshop'>Workshop</option>
                    <option value='education'>Education</option>
                    <option value='other'>Other</option>
                  </select>
                </div>

                {/* Date + Time */}
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label className='form-label'>
                      <i className='bi bi-calendar me-2'></i>Date
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      {...register('date', { required: 'Date is required' })}
                    />
                    {errors.date && <small className='text-danger'>{errors.date.message}</small>}
                  </div>

                  <div className='col-md-6 mb-3'>
                    <label className='form-label'>
                      <i className='bi bi-clock me-2'></i>Time
                    </label>
                    <input
                      type='time'
                      className='form-control'
                      {...register('time', { required: 'Time is required' })}
                    />
                    {errors.time && <small className='text-danger'>{errors.time.message}</small>}
                  </div>
                </div>

                {/* City + Address */}
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label className='form-label'>
                      <i className='bi bi-geo-alt me-2'></i>City
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && <small className='text-danger'>{errors.city.message}</small>}
                  </div>

                  <div className='col-md-6 mb-3'>
                    <label className='form-label'>
                      <i className='bi bi-signpost me-2'></i>Address
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <small className='text-danger'>{errors.address.message}</small>}
                  </div>
                </div>

                {/* Image URL */}
                <div className='mb-3'>
                  <label className='form-label'>
                    <i className='bi bi-image me-2'></i>Image URL
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='https://example.com/image.jpg'
                    {...register('image')}
                  />
                </div>

                {/* Price */}
                <div className='mb-4'>
                  <label className='form-label'>
                    <i className='bi bi-cash me-2'></i>Price (EUR)
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    defaultValue={0}
                    {...register('price')}
                  />
                </div>

                <button type='submit' className='btn btn-addevent w-100'>
                  <i className='bi bi-plus-circle me-2'></i>
                  Add Event
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'
import './Register.css'

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await API.post('/auth/register', data)
      alert('✅ Registration successful!')
      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className='register-wrapper'>
      <div className='register-card p-4'>

        <h2 className='text-center mb-4'>
          <i className="bi bi-person-plus-fill me-2"></i>
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input
              type='text'
              className='form-control'
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <small className='text-danger'>{errors.name.message}</small>
            )}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <small className='text-danger'>{errors.email.message}</small>
            )}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <small className='text-danger'>{errors.password.message}</small>
            )}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Role</label>
            <select className='form-select' {...register('role')}>
              <option value='user'>User</option>
              <option value='organizer'>Organizer</option>
            </select>
          </div>

          <button type='submit' className='btn btn-register text-white w-100'>
            Register
          </button>

          <p className='text-center mt-3'>
            Déjà un compte? <Link to='/login'>Login</Link>
          </p>

        </form>

      </div>
    </div>
  )
}

export default Register
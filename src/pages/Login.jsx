import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginSuccess } from '../redux/authSlice'
import API from '../api/axios'
import './Login.css'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/auth/login', data)
      dispatch(loginSuccess(res.data))
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='login-wrapper'>
      <div className='login-card p-4'>

        <h2 className='text-center mb-4'>
          <i className="bi bi-box-fill me-2"></i>
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

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

          <button type='submit' className='btn btn-login text-white w-100'>
            Login
          </button>

          <p className='text-center mt-3'>
            Pas de compte? <Link to='/register'>Register</Link>
          </p>

        </form>

      </div>
    </div>
  )
}

export default Login
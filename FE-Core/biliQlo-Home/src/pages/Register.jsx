import '../css/style.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { solidDoubleRed } from '../assets/logo/assets_logo';

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('') 
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    setErrorMessage('')
    
    if (!username || !email || !password) {
      setErrorMessage('Please fill out all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('access_token')

      const response = await axios.post(
        // 'https://biliqlo.my.id/add-user'
        `http://localhost:3000/register`
        , {
        username,
        email,
        password,        
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      // console.log(response.data, "<<<<< response data")
      if (response.data.message === 'User registered successfully') {
        navigate('/pub/products')
      } else {
        setErrorMessage('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setErrorMessage('An error occurred while registering. Please try again.')
    } finally {
      setIsSubmitting(false) 
    }
  }

  return (
    <div>
    <section className="container" id="register-section">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mb-3 mt-5">Create an Account</h1>
          <span>Sign up to access and manage your personal data.</span>
        </div>
        <div className="col-12 col-lg-8 offset-lg-2 my-5">
          <div className="row">
            <div className="col-12 col-md-6 border-spacing-y-20 text-left">
              <img src={solidDoubleRed} width="350px" alt="sofa" className="mt-5" />
            </div>
            <div className="col-12 col-md-6 p-5 text-left">
              <div className="form-signin m-auto">
                <form onSubmit={handleSubmit}>
                  <h1 className="h3 mb-3 display-1">Register Your Account</h1>
  
                  {/* Username Input */}
                  <div className="mb-3 mt-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-username">Username</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your username ..."
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      required
                    />
                  </div>
  
                  {/* Email Input */}
                  <div className="mb-3 mt-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-email">Email</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address ..."
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
  
                  {/* Password Input */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-password">Password</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password ..."
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
  
                  {/* Redirect to login */}
                  <div className="mb-3">
                    <div className="form-check">
                      <label className="form-check-label" htmlFor="register-login">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                          Log in here
                        </a>
                      </label>
                    </div>
                  </div>
  
                  {/* Register Button */}
                  <button
                    className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                    type="submit"
                  >
                    Register
                  </button>
                </form>
                <div id="google-signin-btn" className="mt-3"></div> {/* Google Sign-In Button */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  )
}

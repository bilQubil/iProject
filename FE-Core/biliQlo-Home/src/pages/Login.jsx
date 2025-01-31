import '../css/style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { solidDoubleRed } from '../assets/logo/assets_logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem('access_token')) {
      navigate('/pub/products');
    }

    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    // Initialize Google Sign-In
    window.google?.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Replace with your Google Client ID
      callback: handleGoogleSignIn,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      { theme: 'outline', size: 'large' }
    );
  }, [navigate]);

  const handleGoogleSignIn = async (response) => {
    try {
      const googleToken = response.credential;

      // Send Google token to backend
      const backendResponse = await axios.post(
        // 'https://biliqlo.my.id/google-login'
        `http://13.211.190.146/google-login`
        , {
        token: googleToken,
      });

      const { access_token } = backendResponse.data;
      localStorage.setItem('access_token', access_token);
      navigate('/pub/products');
    } catch (error) {
      console.error('Google Sign-In failed:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        // 'https://biliqlo.my.id/login'
        `http://13.211.190.146/login`
        , {
        email: email,
        password: password,
      });

      localStorage.setItem('access_token', response.data.access_token);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Welcome Back!</h1>
            <span>
              Log in and autocomplete your order with your personal data, or sign up to be able to
              edit.
            </span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-spacing-y-20 text-left">
                <img src={solidDoubleRed} width="350px" alt="sofa" className="mt-5" />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 display-1">Log in to your account</h1>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email address ..."
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password ..."
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="login-register">
                            If you don't have an account,{" "}
                            <a href="/register" className="text-blue-500 hover:underline">
                                go to register
                            </a>
                            </label>
                        </div>
                        </div>
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit"
                    >
                      Log In
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
  );
}

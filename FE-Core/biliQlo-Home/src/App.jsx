import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import CollectionsPage from './pages/CollectionPage';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbox from './components/Chatbox';

// import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">      
      <Navbar />
      <Chatbox />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pub/products" element={<Home />} />
          {/* <Route path="/pub/products" element={<div>Home Page Placeholder</div>} /> */}
          <Route path="/pub/products/:id" element={<Detail />} />
          <Route path="/pub/collections" element={<CollectionsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default App;

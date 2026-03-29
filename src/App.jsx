import Home from './pages/Home';
// import './App.css';
import {Routes, Route} from 'react-router-dom';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Shop from './pages/Shop';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Category from './pages/Category';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/enquiry/:productId' element={<h1>Enquiry page</h1>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path="/contact" element={<ContactUs/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/products/:categoryId" element={<Product/>} />
      <Route path='/product-details/:productId' element={<ProductDetails/>}/>
      <Route path="/category/:category_Id" element={<Category/>} />
    </Routes>
      
    </>
  )
}

export default App

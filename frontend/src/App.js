import './App.css';
import Navbar from './components/Navbar/Navbar';
import Searchbar from './components/Searchbar/Searchbar';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  const [search, setSearch]= useState("")
  const [category, setCategory]= useState("All")
  const [showForm, setShowForm]= useState(false)
  const [products,setProducts]= useState([])
  const [editingProduct, setEditingProduct]= useState(null)

  const fetchProducts = async () => {
    try {
        const response = await axios.get(
            process.env.REACT_APP_API_URL
        );
        setProducts(response.data.data);

    }
    catch (error) {
        console.log(error);
    }
  };
  useEffect(()=>{
    fetchProducts()
  },[])

  const filteredProducts= products.filter((product)=>{
    const matchedWithSearch= product.name.toLowerCase().includes(search.toLowerCase());
    const matchedWithCategory= category==="All" || product.category===category;
    return matchedWithSearch && matchedWithCategory;
  })
  return (
    <div>
      <Navbar/>
      <div className='mainbox'>
        <Searchbar search= {search} setSearch={setSearch} category={category} setCategory={setCategory}/>
        <button className='add-product-btn' onClick={()=>setShowForm(true)}> + Add Product</button>
      </div>
      {
        showForm && 
        <ProductForm showForm={showForm} setShowForm={setShowForm} fetchProducts={fetchProducts} editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}/>
      }
      <div className="products-section">
        <ProductList products= {filteredProducts} fetchProducts={fetchProducts} setShowForm={setShowForm} setEditingProduct={setEditingProduct}/>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;

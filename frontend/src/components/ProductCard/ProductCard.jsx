import "./ProductCard.css";
import axios from "axios";
import { toast } from "react-toastify";

function ProductCard({ product , fetchProducts, setShowForm, setEditingProduct }) {

    const handleDelete= async()=>{
        try{
            const response= await axios.delete(`${process.env.REACT_APP_API_URL}/${product._id}`)
            await fetchProducts()
            toast.success(response.data.message)
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
    return (
        <div className="product-card">

            <img
                src={product.image}
                alt={product.name}
                className="product-image"
            />

            <div className="product-info">

                <h3>{product.name}</h3>

                <p className="price">
                    ₹{product.price}
                </p>

                <p className="category">
                    {product.category}
                </p>

            </div>

            <div className="card-buttons">

                <button className="edit-btn" onClick={()=>{
                    setShowForm(true)
                    setEditingProduct(product)
                }}>
                    Edit
                </button>

                <button className="delete-btn" onClick={handleDelete}>
                    Delete
                </button>

            </div>

        </div>
    );
}

export default ProductCard;
import "./ProductForm.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductForm({ showForm, setShowForm, fetchProducts, editingProduct, setEditingProduct }) {
    const [loading, setLoading] = useState(false);
    const isEditing= editingProduct!== null
    const [product,setProduct]= useState({
        image: null,
        name: "",
        price: "",
        category: ""
    })
    useEffect(()=>{
        if(editingProduct){
            setProduct({
            image: null,
            name: editingProduct.name,
            price: editingProduct.price,
            category: editingProduct.category
        })
        }
        else{
            setProduct({
            image: null,
            name: "",
            price: "",
            category: ""
        })
        }
    },[editingProduct])
    const handlechange= (e)=>{
        const {name, value}= e.target
        setProduct((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange= (e)=>{
        setProduct((prev)=>({
            ...prev,
            image: e.target.files[0]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();

        // formData.append("image", product.image);
        if(isEditing){
            if(product.image!==null){
                formData.append("image", product.image)
            }
        }
        else{
            formData.append("image", product.image)
        }
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("category", product.category);


        try {
            let response;
            if(!isEditing){
                response = await axios.post(
                process.env.REACT_APP_API_URL,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            }
            else{
                response = await axios.put(
                `${process.env.REACT_APP_API_URL}/${editingProduct._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            }
            await fetchProducts();
            setProduct({
                image: null,
                name: "",
                price: "",
                category: ""
            })
            setEditingProduct(null)
            setShowForm(false)
            toast.success(response.data.message)
        } 
        
        catch (error) {
            toast.error(error.response?.data.message || "Something went wrong")
        }
        finally{
            setLoading(false)
        }
    };


    return (
        <div className="modal-overlay">

            <form className="product-form" onSubmit={handleSubmit}>

                <h2>{isEditing? "Edit Product" : "Add Product"}</h2>
                {
                    isEditing && 
                    <div className="preview-container" >
                        <label className="preview-label">Current Image</label>
                        <img src={editingProduct.image} alt={product.name} className="preview-image"/>
                    </div>
                    
                }
                <label>{isEditing? "Updated Image" : "Product Image"}</label>
                <input type="file" accept="image/*"  onChange={handleImageChange}/>

                <label>Product Name</label>
                <input
                    type="text"
                    placeholder="Enter product name"
                    name="name"
                    value={product.name}
                    onChange={handlechange}
                />

                <label>Price</label>
                <input
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={product.price}
                    onChange={handlechange}
                />

                <label>Category</label>
                <select
                    name="category"
                    value={product.category}
                    onChange={handlechange}
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothes">Clothes</option>
                    <option value="SkinCare">SkinCare</option>
                    <option value="Footwear">Footwear</option>
                </select>

                

                <div className="button-group">

                    <button
                        type="button"
                        className="cancel-btn"
                        disabled= {loading}
                        onClick={() => {
                            setEditingProduct(null)
                            setShowForm(false)
                        }}
                    >
                        Cancel
                    </button>

                    <button className="submit-btn" disabled={loading}>
                        {loading? "Please wait..." : isEditing? "Update Product" : "Add Product"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default ProductForm;
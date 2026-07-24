import ProductCard from "../ProductCard/ProductCard.jsx";
import "./ProductList.css";

function ProductList({ products, fetchProducts, setShowForm, setEditingProduct }) {
    return (
        <div className="product-list">

            {
                products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        fetchProducts={fetchProducts}
                        setShowForm={setShowForm} 
                        setEditingProduct={setEditingProduct}
                    />
                ))
            }

        </div>
    );
}

export default ProductList;
import { FiSearch } from "react-icons/fi";
import "./Searchbar.css";

function Searchbar({
    search,
    setSearch,
    category,
    setCategory,
}) {
    return (
        <div className="search-filter-container">
            <div className="search-container">
                <FiSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
            >
                <option value="All">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothes">Clothes</option>
                <option value="SkinCare">SkinCare</option>
                <option value="Footwear">Footwear</option>
            </select>
        </div>
    );
}

export default Searchbar;
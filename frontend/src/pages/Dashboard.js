import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AddProduct from "./AddProduct";
import PriceGraph from "../components/PriceGraph";
import "../App.css";
import ComparisonGraph from "../components/ComparisonGraph";
function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
const [comparisonData, setComparisonData] = useState([]);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProducts(data);
      } catch {
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, [navigate, setIsLoggedIn]);

  // ADD PRODUCT
  const addProduct = async (product) => {
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(product),
    });

    const res = await fetch("http://localhost:5000/api/products", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    setProducts(data);
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // SELECT PRODUCT
  const selectProduct = async (product) => {
    setSelectedProduct(product);

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/comparison/${product.productGroup}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await res.json();
      setComparisonData(data);
    } catch {
      console.log("No comparison data");
    }
  };
const amazon =
  Array.isArray(comparisonData)
    ? comparisonData.find((p) => p.platform === "amazon")?.history || []
    : [];

const flipkart =
  Array.isArray(comparisonData)
    ? comparisonData.find((p) => p.platform === "flipkart")?.history || []
    : [];

console.log("comparisonData:", comparisonData);
console.log("amazon:", amazon);
console.log("flipkart:", flipkart);
    
  return (
    <div className="dashboard-page">
      {/* Top Actions */}
      <div className="top-actions">
        <button className="alert-btn" onClick={() => navigate("/alerts")}>
          Alerts
        </button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <h2 className="page-title">Tracked Products</h2>

      <div className="dashboard-card">

        {/* PRODUCT LIST */}
        <h3>Tracked Products</h3>

        {products.length === 0 ? (
          <p className="empty-text">No products added yet</p>
        ) : (
          <div className="products-list">
            {products.map((p) => (
              <div
                key={p._id}
                className="product-item"
                onClick={() => selectProduct(p)}
              >
                <div className="product-info">

                  <div>
                    <strong>Product URL</strong>
                    <p className="product-url">{p.url || p.name}</p>
                  </div>

                  <div>
                    <strong>Current Price</strong>
                    <p>₹{p.currentPrice}</p>
                  </div>

                  <div>
                    <strong>Threshold</strong>
                    <p>₹{p.target}</p>
                  </div>

                </div>

                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(p._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ADD PRODUCT */}
        <h3 className="add-title">Add Product</h3>
        <AddProduct onAdd={addProduct} />

        {/* PRICE HISTORY GRAPH */}
        {selectedProduct && (
          <div className="price-history-section">
            <h3>Price History</h3>
            <PriceGraph productId={selectedProduct._id} />
          </div>
        )}

  {/* AMAZON VS FLIPKART COMPARISON */}
{Array.isArray(comparisonData) && comparisonData.length >= 2 && (
  <div className="price-history-section">
    <h3>Amazon vs Flipkart Comparison</h3>

    <ComparisonGraph
      amazon={amazon}
      flipkart={flipkart}
    />
  </div>
)}
      </div>
    </div>
  );
}

export default Dashboard;
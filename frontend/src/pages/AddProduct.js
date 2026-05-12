import React, { useState } from "react";

function AddProduct({ onAdd }) {
  const [url, setUrl] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!url || !target) {
      alert("Please fill all fields");
      return;
    }

    onAdd({ url, target: Number(target) });
    setUrl("");
    setTarget("");
  };

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Threshold Price"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;

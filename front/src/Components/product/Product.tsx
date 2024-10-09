import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { ApiContainer } from '../../Api/Apicontainer';
import { Local } from '../../ApiLocal/ApiLocal';
import { useNavigate } from 'react-router-dom';

const Product = ({iduser}) => {
  const [produit, setProduit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

const Navigate = useNavigate()




  const fetchProducts = async () => {
    try {
      const response = await fetch(`${Local.Api}${ApiContainer.PRODUCT.GET_ALL}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProduit(data);
      console.log("here",data);
      
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${Local.Api}${ApiContainer.CART.ADD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId: iduser }), 
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart.');
      }

      const data = await response.json();
      console.log('Product added to cart:', data);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleNavigate = (productId) => {
    Navigate("/one", { state: { productId } });
    console.log("from", productId);
  };


  return (
<div className="flex flex-col items-center">
  <div className="mt-20 p-4 w-full max-w-6xl">
    <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
    {loading && <p>Loading products...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {produit.length === 0 && !loading && <p>No products found.</p>}
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {produit.map((item) => (
        <div key={item.id} className="border p-4 rounded shadow-md flex flex-col items-center">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-700">{item.desc}</p>
          <p className="font-bold">${item.price}</p>
          <img
            src={item.image}
            className="w-40 h-40 object-cover mb-4" 
          />
          <div className="flex space-x-2"> 
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
             onClick={() => handleNavigate(item.id)}
            >
              View More
            </button>
            <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => addToCart(item.id)} 
                >
                  Add to Cart
                </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Product;

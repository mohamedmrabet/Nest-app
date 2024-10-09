import React, { useEffect, useState } from 'react';
import { ApiContainer } from '../../Api/Apicontainer';
import { Local } from '../../ApiLocal/ApiLocal';
import { useNavigate, useLocation } from 'react-router-dom';

const OneProduct = () => {
  const [one, setOne] = useState(null);
  const Navigate = useNavigate()
  const location = useLocation();
  const { productId } = location.state;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOneProduct = async () => {
    try {
      const response = await fetch(`${Local.Api}${ApiContainer.PRODUCT.GET_BY_ID}/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setOne(data);
      console.log("Fetched product:", data);
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOneProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
const HandleGoback =()=>{
  Navigate('/')
}
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Product Details</h1>
        {one ? (
          <div className="border p-6 rounded shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-2">{one.name}</h2>
            <img
              src={one.image}
              className="w-64 h-64 object-cover mb-4 mx-auto"
              alt={one.name}
            />
            <p className="text-gray-700 mb-2">{one.desc}</p>
            <p className="text-xl font-bold mb-2">${one.price}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600" onClick={HandleGoback}>
              GO BACK
            </button>
          </div>
        ) : (
          <div>No product found.</div>
        )}
      </div>
    </div>
  );
};

export default OneProduct;

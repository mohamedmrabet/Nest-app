import React, { useEffect, useState } from 'react';
import { ApiContainer } from '../../Api/Apicontainer';
import { Local } from '../../ApiLocal/ApiLocal';

const Cart = ({ iduser }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const fetchCart = async () => {
    try {
      const response = await fetch(`${Local.Api}${ApiContainer.CART.GET_BY_ID}/${iduser}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setItems(data);
      console.log('Fetched cart:', data);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.produit.price, 0);
  };

  useEffect(() => {
    fetchCart();
  }, [iduser]);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  const handleDelete = async (cartID) => {
    try {
      const response = await fetch(`${Local.Api}${ApiContainer.CART.DELETE}/${cartID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers needed, such as authorization tokens
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }
  
      const data = await response.json(); 
      console.log('Delete successful:', data);
     setItems((prevItems) => prevItems.filter(item => item.id !== cartID));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };
  
  return (
    <div className="mt-10 p-6 max-w-6xl mx-auto flex">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-md mb-4 flex items-center">
              <img src={item.produit.image} alt={item.produit.name} className="w-24 h-24 object-cover mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{item.produit.name}</h2>
                <p className="text-gray-600">{item.produit.desc}</p>
                <p className="text-lg font-bold">${item.produit.price}</p>
              </div>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>No items in your cart.</div>
        )}
      </div>

      <div className="w-1/3 ml-6 p-4 border rounded-lg shadow-md h-fit">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="text-xl mb-4">
          Total Items: {items.length}
        </div>
        <div className="text-3xl font-bold text-black">
          Total: ${calculateTotal()}
        </div>
      </div>
    </div>
  );
};

export default Cart;

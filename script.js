document.addEventListener('DOMContentLoaded', () => {
  // Example function to fetch products from the backend
  async function fetchProducts() {
    try {
      const response = await fetch('https://your-backend-api.com/products');
      const products = await response.json();
      console.log(products);
      // Update the DOM with the fetched products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // Call the fetchProducts function
  fetchProducts();

  // Example function to handle adding a product to the cart
  async function addToCart(productId) {
    try {
      const response = await fetch(`https://your-backend-api.com/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const result = await response.json();
      console.log(result);
      // Update the DOM or show a message to the user
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  // Add event listeners to the add-to-cart buttons
  document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
    });
  });

  // Add event listener to the form submission
  document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        alert('Data submitted successfully!');
      } else {
        alert('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting data.');
    }
  });
});

// image slider
document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slidesContainer = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".image-box").length;

    slidesContainer.style.width = `${totalSlides * 28}%`;

    function moveSlide(step) {
        currentSlide += step;

        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    document.querySelector(".prev").addEventListener("click", function () {
        moveSlide(-1);
    });

    document.querySelector(".next").addEventListener("click", function () {
        moveSlide(1);
    });

    setInterval(function () {
        moveSlide(1);
    }, 8000);
});

// Cart Management
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the total amount of the cart
    let cartTotal = 0;

    // Function to add the product price to the cart total
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement;
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.getAttribute('data-price'));

            // Add the product to the cart in localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.name === productName);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1; // Increase quantity if product already exists in cart
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 }); // Add new product
            }

            localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage

            // Update the total amount on the page
            cartTotal += productPrice;
            document.getElementById('total-amount').textContent = cartTotal.toFixed(2); // Update displayed total
        });
    });

    // Function to redirect to the checkout page
    function goToCheckout() {
        if (cartTotal > 0) {
            window.location.href = "checkout.html"; // Redirect to the checkout page
        } else {
            alert("Your cart is empty. Please add items to the cart first.");
        }
    }

    // Attach the `goToCheckout` function to the Proceed button
    const proceedButton = document.querySelector('.proceed-btn');
    if (proceedButton) {
        proceedButton.addEventListener('click', goToCheckout);
    }
});


// Function to show toast notifications
function showToast(message) {
    // Create a toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create the toast message
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    // Append the toast and remove it after 3 seconds
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

//checkout
document.addEventListener('DOMContentLoaded', () => {
    // Function to display cart items
    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartTotal = 0; // Initialize total to zero
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = ''; // Clear any existing content

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <p>${item.name} - $${item.price} x ${item.quantity}</p>
                    <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                `;
                cartItemsDiv.appendChild(cartItemDiv);

                // Add the item subtotal to the total
                cartTotal += item.price * item.quantity;
            });

            // Update the total amount on the page
            document.getElementById('total-amount-checkout').textContent = cartTotal.toFixed(2);
        }
    }

    // Function to handle the proceed to payment
    function goToPayment() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0) {
            window.location.href = "payment.html"; // Redirect to payment form if cart is not empty
        } else {
            alert("Your cart is empty. Please add items to the cart.");
        }
    }

    // Function to reset the cart and redirect to the product page
    function cancelOrder() {
        localStorage.removeItem('cart'); // Remove cart data from localStorage
        document.getElementById('total-amount-checkout').textContent = '0'; // Reset the total amount to 0

        // Redirect to the product page
        window.location.href = "product.html";
    }

    // Attach the `goToPayment` function to the Proceed to Payment button
    const paymentButton = document.querySelector('.proceed-to-payment-btn');
    if (paymentButton) {
        paymentButton.addEventListener('click', goToPayment);
    }

    // Attach the `cancelOrder` function to the Cancel button
    const cancelButton = document.querySelector('.cancel-order-btn');
    if (cancelButton) {
        cancelButton.addEventListener('click', cancelOrder);
    }

    // Display the cart items and calculate the total when the DOM is fully loaded
    displayCartItems();
});


//HAMBURGER TOGGLE

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
  
    navLinks.classList.toggle('active');
  
    // Optional: Animate hamburger menu icon
    hamburgerMenu.classList.toggle('open');
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const header = document.querySelector('.header');
  
    if (!header.contains(event.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburgerMenu.classList.remove('open');
    }
  });
  
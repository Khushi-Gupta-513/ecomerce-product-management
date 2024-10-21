document.addEventListener('DOMContentLoaded', function () {
    // Selecting DOM elements
    const sizeDropdown = document.getElementById('size');
    const priceDisplay = document.getElementById('product-price');
    const purchaseButton = document.getElementById('purchase-btn');
    const productList = document.getElementById('product-list');
    const form = document.getElementById('add-product-form');

    // Object mapping sizes to price and stock availability
    const sizePriceMapping = {
        'small': { price: 100, stock: true },
        'medium': { price: 120, stock: true },
        'large': { price: 150, stock: false }
    };

    // Event listener to update price and stock availability when size is selected
    sizeDropdown.addEventListener('change', function () {
        const selectedSize = sizeDropdown.value;
        const sizeDetails = sizePriceMapping[selectedSize];

        // Update price display based on selected size
        priceDisplay.textContent = `$${sizeDetails.price}`;

        // Enable/disable purchase button based on stock availability
        if (sizeDetails.stock) {
            purchaseButton.disabled = false;
        } else {
            purchaseButton.disabled = true;
        }
    });

    // Event listener for the purchase button to handle purchase event
    purchaseButton.addEventListener('click', function () {
        const selectedSize = sizeDropdown.value;
        const sizeDetails = sizePriceMapping[selectedSize];

        // Check if the selected size is in stock and show appropriate message
        if (sizeDetails.stock) {
            alert('Purchase successful!');
        } else {
            alert('Sorry, this product is out of stock.');
        }
    });

    // Event listener to dynamically add new products to the list
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission from refreshing the page

        // Get product details from the form inputs
        const productName = document.getElementById('new-product-name').value;
        const productPrice = document.getElementById('new-product-price').value;
        const productSize = document.getElementById('new-product-size').value;

        // Create new list item for the added product
        const li = document.createElement('li');
        li.textContent = `${productName} - $${productPrice} - Size: ${productSize}`;
        li.dataset.price = productPrice; // Store product price in the data attribute for future use
        productList.appendChild(li);
    });

    // Event delegation to handle clicks on dynamically added product list items
    productList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            // Retrieve the price from the clicked item's data attribute and display it
            const price = event.target.dataset.price;
            alert(`Product price is $${price}`);
        }
    });
});

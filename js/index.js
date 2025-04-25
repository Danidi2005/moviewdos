// Initialize cart array
let cart = [];

// Selectors
const cartTable = document.getElementById("cart-items");
const grandTotal = document.getElementById("grand-total");

//  Add to Cart Function
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".movie-item");
        const name = item.querySelector(".movie-name").textContent.trim();
        const price = parseFloat(item.dataset.price);
        const quantityInput = item.querySelector(".seat-quantity");
        const quantity = parseInt(quantityInput.value);

        if (quantity > 0) {
            const existing = cart.find(i => i.name === name);
            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({ name, price, quantity });
            }

            quantityInput.value = 0; // reset input
            updateCart();
        } else {
            alert("Please select at least 1 seat.");
        }
    });
});

// Update Cart Table
function updateCart() {
    cartTable.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        const totalPerMovie = item.price * item.quantity;
        total += totalPerMovie;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${totalPerMovie.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;

        cartTable.appendChild(row);
    });

    grandTotal.textContent = `$${total.toFixed(2)}`;
}

//  Remove Item from Cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Save as Favourite
document.getElementById("add-to-favorites").addEventListener("click", () => {
    localStorage.setItem("favouriteCart", JSON.stringify(cart));
    alert("Saved to favourites!");
});

//  Apply Favourite
document.getElementById("apply-favorites").addEventListener("click", () => {
    const fav = localStorage.getItem("favouriteCart");
    if (fav) {
        cart = JSON.parse(fav);
        updateCart();
    } else {
        alert("No favourites found.");
    }
});

// Proceed to Checkout
document.getElementById("Proceed-to-Checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        localStorage.setItem("cartData", JSON.stringify(cart));
        window.location.href = "pay.html";
    }
});

// Get elements
const thankYouMsg = document.getElementById("thank-you-message");
const movieTimeSpan = document.getElementById("movie-time");
const seatDetailsSpan = document.getElementById("seat-details");
const bookingRefCode = document.getElementById("booking-ref");
const form = document.getElementById("checkout-form");
const bookingTable = document.querySelector("#booking-summary tbody");
const grandTotalCell = document.getElementById("grand-total");

// Load cart data from local storage
let cart = JSON.parse(localStorage.getItem("cartData")) || [];

// Display booking table
let total = 0;
cart.forEach(item => {
    const row = document.createElement("tr");
    const totalPrice = item.price * item.quantity;
    total += totalPrice;

    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${totalPrice.toFixed(2)}</td>
    `;
    bookingTable.appendChild(row);
});
grandTotalCell.textContent = `$${total.toFixed(2)}`;

// Pay button click
document.getElementById("pay-button").addEventListener("click", () => {
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const section = document.getElementById("section").value;
    const seatType = document.getElementById("seat-type").value;
    const aislePref = document.getElementById("aisle-pref").value;
    const cardName = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expDate = document.getElementById("exp-date").value;

    // Check required fields
    if (
        name && email && phone && section && seatType &&
        cardName && cardNumber && expDate
    ) {
        // Generate dummy movie time and booking ref
        const time = "7:00 PM";
        const seats = `${seatType} - ${section} (${aislePref || "No preference"})`;
        const ref = "TKT-" + Math.floor(Math.random() * 1000000);

        // Show message
        movieTimeSpan.textContent = time;
        seatDetailsSpan.textContent = seats;
        bookingRefCode.textContent = ref;

        form.style.display = "none";
        thankYouMsg.style.display = "block";

        // Clear cart
        localStorage.removeItem("cartData");
    } else {
        alert("Please fill in all required fields.");
    }
});

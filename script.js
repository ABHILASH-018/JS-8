const services = [
    {
        id: 1,
        name: "House Cleaning",
        price: 800
    },
    {
        id: 2,
        name: "Plumbing",
        price: 1200
    },
    {
        id: 3,
        name: "Electrician",
        price: 1000
    },
    {
        id: 4,
        name: "Wall Painting",
        price: 2500
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

const serviceContainer = document.getElementById("serviceContainer");
const addedServices = document.getElementById("addedServices");
const totalAmount = document.getElementById("totalAmount");
const bookingForm = document.getElementById("bookingForm");
const addCartBtn = document.getElementById("addCart");
const bookBtn = document.getElementById("bookService");
const logoutBtn = document.getElementById("logoutBtn");

function displayServices() {

    serviceContainer.innerHTML = "";

    services.forEach((service) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div class="imagePlaceholder">
                🛠️
            </div>

            <div class="card-body">

                <h3>${service.name}</h3>

                <p class="price">₹${service.price}</p>

                <div class="buttons">

                    <button class="addBtn" onclick="addService(${service.id})">
                        Add Item
                    </button>

                    <button class="skipBtn" onclick="skipService('${service.name}')">
                        Skip Item
                    </button>

                </div>

            </div>

        `;

        serviceContainer.appendChild(card);

    });

}

function addService(id) {

    const service = services.find((item) => item.id === id);

    cart.push(service);

    updateCart();

    alert(service.name + " added successfully!");

}

function skipService(name) {

    alert(name + " skipped.");

}

function updateCart() {

    addedServices.innerHTML = "";

    total = 0;

    if (cart.length === 0) {

        addedServices.innerHTML = "<li>No services added.</li>";

        totalAmount.textContent = 0;

        localStorage.setItem("cart", JSON.stringify(cart));

        return;
    }

    cart.forEach((service, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${service.name} - ₹${service.price}
            <button onclick="removeItem(${index})">
                Remove
            </button>
        `;

        addedServices.appendChild(li);

        total += service.price;

    });

    totalAmount.textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));

}

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

addCartBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Please add at least one service.");

        return;

    }

    alert("Services added to cart successfully.");

});

bookBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    bookingForm.scrollIntoView({

        behavior: "smooth"

    });

});

bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    if (cart.length === 0) {

        alert("Please add a service before booking.");

        return;

    }

    alert(
        "Booking Successful!\n\n" +
        "Name: " + name +
        "\nEmail: " + email +
        "\nTotal Amount: ₹" + total
    );

    cart = [];

    updateCart();

    localStorage.removeItem("cart");

    bookingForm.reset();

});

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        alert("Logged Out Successfully.");

        location.reload();

    }

});

displayServices();

updateCart();

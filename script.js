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

// I save the cart so it stays after refreshing the page.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

const serviceContainer = document.getElementById("serviceContainer");
const addedServices = document.getElementById("addedServices");
const totalAmount = document.getElementById("totalAmount");
const bookingForm = document.getElementById("bookingForm");

// Show all services
function displayServices() {

    serviceContainer.innerHTML = "";

    for (let i = 0; i < services.length; i++) {

        let service = services[i];

        let card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${service.name}</h3>

            <p class="price">Price : ₹${service.price}</p>

            <button onclick="addService(${service.id})">
                Add
            </button>

            <button onclick="skipService('${service.name}')">
                Skip
            </button>
        `;

        serviceContainer.appendChild(card);
    }
}

// Add service into cart
function addService(id) {

    let service = services.find(function(item){
        return item.id == id;
    });

    cart.push(service);

    updateCart();

    alert(service.name + " added.");
}

// Skip button
function skipService(name){

    alert(name + " skipped.");

}

// Update cart list
function updateCart(){

    addedServices.innerHTML = "";

    total = 0;

    if(cart.length == 0){

        addedServices.innerHTML = "<li>No services added.</li>";

        totalAmount.innerText = 0;

        localStorage.setItem("cart", JSON.stringify(cart));

        return;
    }

    for(let i=0;i<cart.length;i++){

        let item = cart[i];

        total = total + item.price;

        let li = document.createElement("li");

        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="removeItem(${i})">
                Remove
            </button>
        `;

        addedServices.appendChild(li);
    }

    totalAmount.innerText = total;

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove item
function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

// Booking button
document.getElementById("bookService").addEventListener("click",function(){

    if(cart.length==0){

        alert("Please add a service first.");

        return;
    }

    bookingForm.scrollIntoView({
        behavior:"smooth"
    });

});

// Booking form
bookingForm.addEventListener("submit",function(e){

    e.preventDefault();

    if(cart.length==0){

        alert("Cart is empty.");

        return;
    }

    let name = document.getElementById("name").value;

    let email = document.getElementById("email").value;

    alert(
        "Booking Successful!\n\n" +
        "Name : " + name +
        "\nEmail : " + email +
        "\nTotal : ₹" + total
    );

    cart = [];

    localStorage.removeItem("cart");

    bookingForm.reset();

    updateCart();

});

// Logout button
document.getElementById("logoutBtn").addEventListener("click",function(){

    let answer = confirm("Do you want to logout?");

    if(answer){

        alert("Logged out.");

        location.reload();

    }

});

// Start program
displayServices();

updateCart();
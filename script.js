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

let cart = [];
let total = 0;

const serviceContainer = document.getElementById("serviceContainer");

function displayServices() {

    serviceContainer.innerHTML = "";

    services.forEach(service => {

        serviceContainer.innerHTML += `

        <div class="card">

            <div class="imagePlaceholder">
                🛠️
            </div>

            <div class="card-body">

                <h3>${service.name}</h3>

                <p class="price">₹${service.price}</p>

                <div class="buttons">

                    <button class="addBtn"
                    onclick="addService(${service.id})">
                        Add Item
                    </button>

                    <button class="skipBtn"
                    onclick="skipService('${service.name}')">
                        Skip Item
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

displayServices();

function addService(id){

    const service = services.find(service => service.id === id);

    cart.push(service);

    alert(service.name + " added successfully!");

}

function skipService(name){

    alert(name + " skipped!");

}
const addedServices = document.getElementById("addedServices");
const totalAmount = document.getElementById("totalAmount");
function updateCart() {

    addedServices.innerHTML = "";

    total = 0;

    if (cart.length === 0) {

        addedServices.innerHTML = "<li>No services added.</li>";

        totalAmount.textContent = 0;

        return;

    }

    cart.forEach(service => {

        const li = document.createElement("li");

        li.textContent = `${service.name} - ₹${service.price}`;

        addedServices.appendChild(li);

        total += service.price;

    });

    totalAmount.textContent = total;

}
function addService(id) {

    const service = services.find(service => service.id === id);

    cart.push(service);

    updateCart();

    alert(service.name + " added successfully!");

}
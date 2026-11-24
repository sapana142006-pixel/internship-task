
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Classic Running Shoes",
        price: 74.50,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Minimalist Backpack",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Smart Fitness Watch",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Ceramic Coffee Mug",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Polarized Sunglasses",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80"
    }
];


let cart = [];


const productsGrid = document.getElementById("productsGrid");
const productCountLabel = document.getElementById("productCountLabel");
const noResultsMsg = document.getElementById("noResultsMsg");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");

const navCartCount = document.getElementById("navCartCount");
const cartItemCount = document.getElementById("cartItemCount");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");


function renderProducts(list) {
    productsGrid.innerHTML = "";

    if (list.length === 0) {
        noResultsMsg.classList.remove("hidden");
        productCountLabel.textContent = "Showing 0 products";
        return;
    }

    noResultsMsg.classList.add("hidden");
    productCountLabel.textContent = `Showing ${list.length} product${list.length === 1 ? "" : "s"}`;

    list.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const body = document.createElement("div");
        body.className = "product-body";

        const title = document.createElement("h3");
        title.className = "product-title";
        title.textContent = product.name;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = `$${product.price.toFixed(2)}`;

        const addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.className = "add-btn";
        addBtn.textContent = "Add to Cart";
        addBtn.addEventListener("click", () => addToCart(product.id));

        body.appendChild(title);
        body.appendChild(price);
        body.appendChild(addBtn);

        card.appendChild(img);
        card.appendChild(body);
        productsGrid.appendChild(card);
    });
}


function addToCart(productId) {
    const selectedProduct = products.find((item) => item.id === productId);
    if (!selectedProduct) return;

    cart.push({
        cartItemId: Date.now() + Math.random(),
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price
    });

    updateCartUI();
}


function removeFromCart(cartItemId) {
    cart = cart.filter((item) => item.cartItemId !== cartItemId);
    updateCartUI();
}

function updateCartUI() {
    const count = cart.length;
    navCartCount.textContent = count;
    cartItemCount.textContent = count;

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceEl.textContent = `$${total.toFixed(2)}`;

    checkoutBtn.disabled = count === 0;
    cartItemsContainer.innerHTML = "";

    if (count === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "empty-cart-msg";
        emptyMsg.textContent = "Your cart is currently empty.";
        cartItemsContainer.appendChild(emptyMsg);
        return;
    }

    cart.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const name = document.createElement("span");
        name.className = "cart-item-name";
        name.textContent = item.name;

        const price = document.createElement("span");
        price.className = "cart-item-price";
        price.textContent = `$${item.price.toFixed(2)}`;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => removeFromCart(item.cartItemId));

        info.appendChild(name);
        info.appendChild(price);
        row.appendChild(info);
        row.appendChild(removeBtn);
        cartItemsContainer.appendChild(row);
    });
}


function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}


searchInput.addEventListener("input", filterProducts);

clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    renderProducts(products);
    searchInput.focus();
});

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    alert(`Thank you for shopping at ShopEase! Your total is $${total}.`);
    cart = [];
    updateCartUI();
});

renderProducts(products);
updateCartUI();
let productsArray = [];
const container = document.querySelector("#products");
const input = document.querySelector("#title");
const sortTitle = document.querySelector("#sortTitle");
const sortPrice = document.querySelector("#sortPrice");

// Fetch product data from API
fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    productsArray = data.products;
    displayProducts(productsArray);
  });

// Display function
function displayProducts(products) {
  container.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded shadow w-60 text-center hover:scale-105 transition-transform";

    card.innerHTML = `
          <img src="${product.images[0]}" alt="${product.title}" class="h-40 w-full object-contain mb-2 rounded" />
          <h2 class="text-sm font-semibold h-12 overflow-hidden">${product.title}</h2>
          <p class="text-gray-600 font-medium">₹${product.price}</p>
        `;
    container.appendChild(card);
  });
}

// Search filter
input.addEventListener("input", () => {
  filterAndSort();
});

// Sorting
sortTitle.addEventListener("change", () => {
  filterAndSort();
});

sortPrice.addEventListener("change", () => {
  filterAndSort();
});

// Combined search + sort logic
function filterAndSort() {
  let filtered = [...productsArray];
  const keyword = input.value.toLowerCase();

  if (keyword) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(keyword));
  }

  // Sort by Title
  const titleSort = sortTitle.value;
  if (titleSort === "az") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (titleSort === "za") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Sort by Price
  const priceSort = sortPrice.value;
  if (priceSort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

// E-Shop Explorer Dynamic Functionality

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const productGrid = document.getElementById('productGrid');
    const searchBox = document.getElementById('searchBox');
    const searchBtn = document.getElementById('searchBtn');
    const sortDropdown = document.getElementById('sortDropdown');
    const interestForm = document.getElementById('interestForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const productInput = document.getElementById('product');
    const contactSection = document.getElementById('contact' );
    const productsSection = document.getElementById('products');

    let allProducts = [];
    let filteredProducts = [];

    // --- GREETING FROM STORAGE ---
    function greetUser() {
        const storedName = localStorage.getItem('eshop_name') || sessionStorage.getItem('eshop_name');
        const storedProduct = localStorage.getItem('eshop_product') || sessionStorage.getItem('eshop_product');
        if (storedName && storedProduct) {
            const greetDiv = document.createElement('div');
            greetDiv.className = 'bg-green-100 text-green-800 p-4 rounded mb-4 text-center';
            greetDiv.textContent = `Welcome back, ${storedName}! You were interested in ${storedProduct}.`;
            contactSection.insertBefore(greetDiv, contactSection.firstChild);
        }
    }
    greetUser();

    // --- GEOLOCATION ---
    function showLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const locDiv = document.createElement('div');
                    locDiv.className = 'bg-blue-100 text-blue-800 p-2 rounded mb-4 text-center';
                    locDiv.textContent = `Your location: Latitude ${latitude.toFixed(4)}, Longitude ${longitude.toFixed(4)}`;
                    document.body.insertBefore(locDiv, document.body.firstChild);
                },
                (err) => {
                    // Permission denied or error
                }
            );
        }
    }
    showLocation();

    // --- FETCH PRODUCTS ---
    async function fetchProducts() {
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            allProducts = data.slice(0, 8);
            filteredProducts = [...allProducts];
            renderProducts(filteredProducts);
        } catch (e) {
            productGrid.innerHTML = '<div class="col-span-4 text-red-600">Failed to load products.</div>';
        }
    }

    function renderProducts(products) {
        if (!products.length) {
            productGrid.innerHTML = '<div class="col-span-4 text-gray-500">No products found.</div>';
            return;
        }
        productGrid.innerHTML = products.map(prod => `
            <div class="flex flex-col items-center bg-white rounded-lg shadow p-4 transition hover:shadow-lg">
                <img src="${prod.image}" alt="${prod.title}" class="h-32 object-contain mb-2">
                <h3 class="font-semibold text-center text-gray-800 text-sm mb-1">${prod.title}</h3>
                <p class="text-blue-600 font-bold mb-2">$${prod.price}</p>
            </div>
        `).join('');
    }

    // --- SEARCH ---
    function handleSearch() {
        const query = searchBox.value.trim().toLowerCase();
        filteredProducts = allProducts.filter(prod => prod.title.toLowerCase().includes(query));
        handleSort(); // sort after filtering
    }

    // Real-time search as you type
    searchBox.addEventListener('input', handleSearch);
    
    // Keep button click for accessibility
    searchBtn.addEventListener('click', handleSearch);

    // --- SORT ---
    function handleSort() {
        const sortVal = sortDropdown.value;
        let prods = [...filteredProducts];
        if (sortVal === 'low') {
            prods.sort((a, b) => a.price - b.price);
        } else if (sortVal === 'high') {
            prods.sort((a, b) => b.price - a.price);
        }
        renderProducts(prods);
    }
    sortDropdown.addEventListener('change', handleSort);

    // --- FORM VALIDATION & STORAGE ---
    interestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simple validation
        if (!nameInput.value.trim() || !emailInput.value.trim() || !productInput.value.trim()) {
            alert('Please fill in all fields.');
            return;
        }
        // Store in localStorage (or sessionStorage)
        localStorage.setItem('eshop_name', nameInput.value.trim());
        localStorage.setItem('eshop_product', productInput.value.trim());
        alert('Thank you for your interest!');
        interestForm.reset();
        // Optionally, show greeting immediately
        greetUser();
    });

    // --- INITIAL FETCH ---
    fetchProducts();
});

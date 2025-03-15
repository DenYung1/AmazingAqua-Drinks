// Product data
const products = [
    {
        id: 1,
        name: "Classic Espresso",
        price: 3.49,
        description: "Rich and intense single shot of our signature espresso blend. Bold flavor with a perfect crema.",
        image: "images/Amazing drinks.jpg",
        category: "coffee",
        popular: true,
        orderUrl: "https://www.google.com/",
    },
    {
        id: 2,
        name: "Caramel Macchiato",
        price: 4.99,
        description: "Espresso with steamed milk, vanilla syrup, and a caramel drizzle topping.",
        image: "images/Amazing drinks.jpg",
        category: "coffee",
        popular: true,
        orderUrl: "https://facebook.com",
    },
    {
        id: 3,
        name: "Chai Tea Latte",
        price: 4.49,
        description: "Spiced black tea blended with milk, honey, and aromatic spices for a warming experience.",
        image: "images/Amazing drinks.jpg",
        category: "tea",
        isNew: true,
        orderUrl: "https://twitter.com",
    },
    {
        id: 4,
        name: "Green Tea",
        price: 3.29,
        description: "Premium Japanese green tea with a clean, refreshing taste and subtle grassy notes.",
        image: "images/Amazing drinks.jpg",
        category: "tea",
        orderUrl: "https://linkedin.com",
    },
    {
        id: 5,
        name: "Berry Blast Smoothie",
        price: 5.99,
        description: "A refreshing blend of strawberries, blueberries, and raspberries with Greek yogurt and honey.",
        image: "images/Amazing drinks.jpg",
        category: "smoothies",
        orderUrl: "https://pinterest.com",
    },
    {
        id: 6,
        name: "Tropical Paradise Smoothie",
        price: 5.99,
        description: "A tropical blend of mango, pineapple, and banana that will transport you to an island getaway.",
        image: "images/Amazing drinks.jpg",
        category: "smoothies",
        popular: true,
        orderUrl: "https://instagram.com",
    },
    {
        id: 7,
        name: "Fresh Orange Juice",
        price: 4.49,
        description: "Freshly squeezed orange juice, packed with vitamin C and natural sweetness.",
        image: "images/Amazing drinks.jpg",
        category: "juices",
        orderUrl: "https://youtube.com",
    },
    {
        id: 8,
        name: "Green Detox Juice",
        price: 5.99,
        description: "A revitalizing blend of kale, cucumber, green apple, celery, and lemon. Perfect for a healthy boost.",
        image: "images/Amazing drinks.jpg",
        category: "juices",
        isNew: true,
        orderUrl: "https://tiktok.com",
    }
];

// Global variables
let cart = [];
let currentProductId = null;
let selectedCustomizations = {};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the products display
    displayProducts();
    
    // Set up event listeners
    setupEventListeners();
});

// Add this code to close mobile navbar when clicking nav links
document.addEventListener('DOMContentLoaded', function() {
    // Get all nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    // Get the navbar toggler button
    const navbarToggler = document.querySelector('.navbar-toggler');
    // Get the collapse element
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Add click event listener to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if navbar is expanded (mobile view)
            if (navbarCollapse.classList.contains('show')) {
                // Trigger click on navbar toggler to close the menu
                navbarToggler.click();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    // Get the navbar toggler button
    const navbarToggler = document.querySelector('.navbar-toggler');
    // Get the navbar collapse element
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Add click event listener to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if the link has a hash/anchor
            const hash = link.getAttribute('href');
            if (hash && hash.startsWith('#') && hash !== '#') {
                e.preventDefault();
                
                // Close mobile menu
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // Scroll to section after a slight delay to allow menu to close
                setTimeout(() => {
                    const targetElement = document.querySelector(hash);
                    if (targetElement) {
                        targetElement.scrollIntoView();
                    }
                }, 250);
            }
        });
    });
});

// Scroll to Top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show button when scrolling down
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('d-none');
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
            setTimeout(() => {
                if (!scrollToTopBtn.classList.contains('show')) {
                    scrollToTopBtn.classList.add('d-none');
                }
            }, 300);
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Display products in the menu section
function displayProducts(filteredProducts = products) {
    const menuItemsContainer = document.getElementById('menuItems');
    const coffeeItemsContainer = document.getElementById('coffeeItems');
    const teaItemsContainer = document.getElementById('teaItems');
    const smoothieItemsContainer = document.getElementById('smoothieItems');
    const juiceItemsContainer = document.getElementById('juiceItems');
    
    // Clear existing content
    menuItemsContainer.innerHTML = '';
    coffeeItemsContainer.innerHTML = '';
    teaItemsContainer.innerHTML = '';
    smoothieItemsContainer.innerHTML = '';
    juiceItemsContainer.innerHTML = '';
    
    // Display filtered products
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        
        // Add to All category
        menuItemsContainer.appendChild(productCard.cloneNode(true));
        
        // Add to specific category
        switch(product.category) {
            case 'coffee':
                coffeeItemsContainer.appendChild(productCard.cloneNode(true));
                break;
            case 'tea':
                teaItemsContainer.appendChild(productCard.cloneNode(true));
                break;
            case 'smoothies':
                smoothieItemsContainer.appendChild(productCard.cloneNode(true));
                break;
            case 'juices':
                juiceItemsContainer.appendChild(productCard.cloneNode(true));
                break;
        }
    });
}

// Update the createProductCard function
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-3 mb-4';
    col.innerHTML = `
        <div class="card h-100 product-card" data-product-id="${product.id}">
            <div class="position-relative">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="card-img-top"
                     onerror="this.src='images/placeholder.jpg'">
                ${product.isNew ? '<span class="badge-custom badge-new">New</span>' : ''}
                ${product.popular ? '<span class="badge-custom badge-popular">Popular</span>' : ''}
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-truncate">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">$${product.price.toFixed(2)}</h6>
                    <a href="${product.orderUrl}" target="_blank" class="btn btn-sm btn-primary order-now-btn">
                        Order Now
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Update the event listener in setupEventListeners function
function setupEventListeners() {
    // Remove the order button click events since we're using direct links


    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        showSuccessMessage();
        this.reset();
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showSuccessMessage() {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-3';
        alert.textContent = 'Thank you! Your message has been sent successfully.';
        
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(alert, form.nextSibling);
        
        setTimeout(() => alert.remove(), 5000);
    }
    
    // Search and filter functionality
    const searchInput = document.getElementById('searchMenu');
    const menuContainer = document.getElementById('menuItems');

    // Search functionality
    searchInput.addEventListener('input', debounce((e) => {
        const searchQuery = e.target.value.toLowerCase().trim();
        
        if (searchQuery === '') {
            displayProducts(); // Show all products if search is empty
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery) || 
            product.description.toLowerCase().includes(searchQuery)
        );

        displayProducts(filteredProducts);
    }, 300));

    // Filter functionality
    document.querySelectorAll('#menuTabs .nav-link').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            filterMenu(category);
        });
    });
}

// Open product modal with details
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Set modal content
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productImage').src = product.image;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = product.description;
    
    // Show modal
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

// Filter menu items
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
            setTimeout(() => item.classList.add('visible'), 10);
        } else {
            item.classList.add('hidden');
            item.classList.remove('visible');
        }
    });
}

// Add loader functionality
document.body.classList.add('loading');

window.addEventListener('load', function() {
    // Simulate loading time (remove this setTimeout in production if not needed)
    setTimeout(function() {
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
    }, 1600); // Shows loader for 1.5 seconds
});

// Debounce function to prevent excessive searching
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


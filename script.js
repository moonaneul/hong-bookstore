// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Header scroll behavior
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-content, .contact-content').forEach(element => {
    observer.observe(element);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Portfolio item hover effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.portfolio-overlay').style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.portfolio-overlay').style.transform = 'translateY(100%)';
    });
});

// Add active class to current navigation item
function setActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
}

setActiveNavItem();

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Marketplace functionality
const searchInput = document.querySelector('.search-input');
const filterSelects = document.querySelectorAll('.filter-select');
const bookGrid = document.querySelector('.book-grid');

// Sample book data (replace with actual data from backend)
const books = [
    {
        id: 1,
        title: 'Introduction to Computer Science',
        author: 'John Smith',
        price: 25.99,
        condition: 'Like New',
        category: 'textbook',
        image: 'https://via.placeholder.com/200x300'
    },
    // Add more sample books here
];

function renderBooks(books) {
    bookGrid.innerHTML = books.map(book => `
        <div class="book-card">
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p class="price">$${book.price}</p>
            <p class="condition">${book.condition}</p>
            <button class="cta-button primary">View Details</button>
        </div>
    `).join('');
}

// Filter and search functionality
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryFilter = filterSelects[0].value;
    const conditionFilter = filterSelects[1].value;

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || book.category === categoryFilter;
        const matchesCondition = !conditionFilter || book.condition === conditionFilter;

        return matchesSearch && matchesCategory && matchesCondition;
    });

    renderBooks(filteredBooks);
}

searchInput.addEventListener('input', filterBooks);
filterSelects.forEach(select => select.addEventListener('change', filterBooks));

// Chatbot functionality
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.send-button');

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate bot response (replace with actual AI integration)
        setTimeout(() => {
            addMessage('I am an AI assistant. How can I help you with school information?');
        }, 1000);
    }
}

sendButton.addEventListener('click', handleUserMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Map functionality
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.5665, lng: 126.9780 }, // Default to Seoul
        zoom: 13
    });

    // Add click listener for adding new spots
    const addSpotButton = document.querySelector('.add-spot-button');
    addSpotButton.addEventListener('click', () => {
        // Implement spot addition functionality
        alert('Spot addition feature coming soon!');
    });

    // Add spot filter functionality
    const spotFilters = document.querySelectorAll('.spot-filters input');
    spotFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            // Implement spot filtering functionality
            console.log('Filter changed:', filter.checked);
        });
    });
}

// My Page functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContent = document.querySelector('.tab-content');

function switchTab(tabName) {
    // Remove active class from all tabs
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Add active class to clicked tab
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    activeButton.classList.add('active');

    // Update content (replace with actual content loading)
    tabContent.innerHTML = `<h3>${tabName} Content</h3><p>This is the ${tabName} section.</p>`;
}

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        switchTab(button.textContent);
    });
});

// Authentication State Management
let isAuthenticated = false;

// Check authentication state on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    setupAuthListeners();
    setupProfilePhotoUpload();
    loadProfilePhoto();
    setupMyPageSettings();
    loadSavedData();
});

function checkAuthState() {
    // Check if user is logged in (you would typically check a token or session)
    const token = localStorage.getItem('authToken');
    isAuthenticated = !!token;
    updateAuthUI();
}

function updateAuthUI() {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const logoutBtn = document.querySelector('.logout-btn');

    if (isAuthenticated) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

function setupAuthListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Logout button click
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // SNS login buttons
    const naverBtn = document.querySelector('.sns-btn.naver');
    const kakaoBtn = document.querySelector('.sns-btn.kakao');

    if (naverBtn) {
        naverBtn.addEventListener('click', () => handleSNSLogin('naver'));
    }
    if (kakaoBtn) {
        kakaoBtn.addEventListener('click', () => handleSNSLogin('kakao'));
    }
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you would typically make an API call to your backend
    // For demo purposes, we'll simulate a successful login
    console.log('Login attempt:', { username, password });
    
    // Simulate successful login
    localStorage.setItem('authToken', 'demo-token');
    isAuthenticated = true;
    updateAuthUI();
    window.location.href = 'index.html';
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Here you would typically make an API call to your backend
    // For demo purposes, we'll simulate a successful registration
    console.log('Register attempt:', { username, email, password });
    
    // Simulate successful registration
    localStorage.setItem('authToken', 'demo-token');
    isAuthenticated = true;
    updateAuthUI();
    window.location.href = 'index.html';
}

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('authToken');
    isAuthenticated = false;
    updateAuthUI();
    window.location.href = 'index.html';
}

function handleSNSLogin(provider) {
    // Here you would typically implement OAuth flow for the selected provider
    console.log(`SNS login attempt with ${provider}`);
    
    // Simulate successful SNS login
    localStorage.setItem('authToken', 'demo-token');
    isAuthenticated = true;
    updateAuthUI();
    window.location.href = 'index.html';
}

// Profile Photo Upload Functionality
function setupProfilePhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    const profilePhoto = document.getElementById('profilePhoto');

    if (photoUpload && profilePhoto) {
        photoUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                // Check if the file is an image
                if (!file.type.startsWith('image/')) {
                    alert('Please select an image file.');
                    return;
                }

                // Check file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Image size should be less than 5MB.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    // Create a temporary image to check dimensions
                    const img = new Image();
                    img.onload = function() {
                        // Check if image dimensions are too small
                        if (img.width < 200 || img.height < 200) {
                            alert('Image dimensions should be at least 200x200 pixels.');
                            return;
                        }

                        // Update profile photo
                        profilePhoto.src = e.target.result;
                        
                        // Save to localStorage (in a real app, you would upload to a server)
                        localStorage.setItem('profilePhoto', e.target.result);
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Load saved profile photo on page load
function loadProfilePhoto() {
    const profilePhoto = document.getElementById('profilePhoto');
    const savedPhoto = localStorage.getItem('profilePhoto');
    
    if (profilePhoto && savedPhoto) {
        profilePhoto.src = savedPhoto;
    }
}

// My Page Settings Functionality
function setupMyPageSettings() {
    // Email Change
    const editEmailBtn = document.querySelector('.edit-email-btn');
    const emailForm = document.querySelector('.email-form');
    const saveEmailBtn = document.querySelector('.save-email-btn');
    const cancelEmailBtn = document.querySelector('.cancel-email-btn');

    if (editEmailBtn && emailForm) {
        editEmailBtn.addEventListener('click', () => {
            emailForm.style.display = 'flex';
        });

        cancelEmailBtn.addEventListener('click', () => {
            emailForm.style.display = 'none';
        });

        saveEmailBtn.addEventListener('click', () => {
            const newEmail = document.getElementById('newEmail').value;
            if (validateEmail(newEmail)) {
                document.getElementById('currentEmail').textContent = newEmail;
                emailForm.style.display = 'none';
                // Here you would typically make an API call to update the email
                localStorage.setItem('userEmail', newEmail);
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Student Verification
    const verifyStudentBtn = document.querySelector('.verify-student-btn');
    const verificationForm = document.querySelector('.verification-form');
    const submitVerificationBtn = document.querySelector('.submit-verification-btn');
    const cancelVerificationBtn = document.querySelector('.cancel-verification-btn');

    if (verifyStudentBtn && verificationForm) {
        verifyStudentBtn.addEventListener('click', () => {
            verificationForm.style.display = 'flex';
        });

        cancelVerificationBtn.addEventListener('click', () => {
            verificationForm.style.display = 'none';
        });

        submitVerificationBtn.addEventListener('click', () => {
            const studentId = document.getElementById('studentId').value;
            const studentIdCard = document.getElementById('studentIdCard').files[0];

            if (validateStudentId(studentId) && studentIdCard) {
                // Here you would typically make an API call to verify student status
                document.getElementById('verificationStatus').textContent = 'Verified';
                verificationForm.style.display = 'none';
                localStorage.setItem('studentVerified', 'true');
            } else {
                alert('Please enter a valid Hongik University student ID and upload your ID card');
            }
        });
    }

    // Location Management
    const addLocationBtn = document.querySelector('.add-location-btn');
    const locationForm = document.querySelector('.location-form');
    const saveLocationBtn = document.querySelector('.save-location-btn');
    const cancelLocationBtn = document.querySelector('.cancel-location-btn');
    const locationList = document.getElementById('locationList');

    if (addLocationBtn && locationForm) {
        addLocationBtn.addEventListener('click', () => {
            locationForm.style.display = 'flex';
        });

        cancelLocationBtn.addEventListener('click', () => {
            locationForm.style.display = 'none';
        });

        saveLocationBtn.addEventListener('click', () => {
            const locationName = document.getElementById('locationName').value;
            const locationAddress = document.getElementById('locationAddress').value;

            if (locationName && locationAddress) {
                addLocationToList(locationName, locationAddress);
                locationForm.style.display = 'none';
                // Clear form
                document.getElementById('locationName').value = '';
                document.getElementById('locationAddress').value = '';
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Password Change
    const changePasswordBtn = document.querySelector('.change-password-btn');
    const passwordForm = document.querySelector('.password-form');
    const savePasswordBtn = document.querySelector('.save-password-btn');
    const cancelPasswordBtn = document.querySelector('.cancel-password-btn');

    if (changePasswordBtn && passwordForm) {
        changePasswordBtn.addEventListener('click', () => {
            passwordForm.style.display = 'flex';
        });

        cancelPasswordBtn.addEventListener('click', () => {
            passwordForm.style.display = 'none';
        });

        savePasswordBtn.addEventListener('click', () => {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (validatePasswordChange(currentPassword, newPassword, confirmPassword)) {
                // Here you would typically make an API call to change the password
                passwordForm.style.display = 'none';
                // Clear form
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
            }
        });
    }

    // Account Deletion
    const deleteAccountBtn = document.querySelector('.delete-account-btn');
    const deleteConfirmation = document.querySelector('.delete-confirmation');
    const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
    const cancelDeleteBtn = document.querySelector('.cancel-delete-btn');

    if (deleteAccountBtn && deleteConfirmation) {
        deleteAccountBtn.addEventListener('click', () => {
            deleteConfirmation.style.display = 'block';
        });

        cancelDeleteBtn.addEventListener('click', () => {
            deleteConfirmation.style.display = 'none';
        });

        confirmDeleteBtn.addEventListener('click', () => {
            const password = document.getElementById('deletePassword').value;
            if (password) {
                // Here you would typically make an API call to delete the account
                localStorage.clear();
                window.location.href = 'index.html';
            } else {
                alert('Please enter your password to confirm deletion');
            }
        });
    }
}

// Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateStudentId(studentId) {
    // Hongik University student ID format validation
    const re = /^[A-Za-z]\d{8}$/;
    return re.test(studentId);
}

function validatePasswordChange(currentPassword, newPassword, confirmPassword) {
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields');
        return false;
    }

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return false;
    }

    if (newPassword.length < 8) {
        alert('New password must be at least 8 characters long');
        return false;
    }

    return true;
}

function addLocationToList(name, address) {
    const locationList = document.getElementById('locationList');
    const li = document.createElement('li');
    
    const locationInfo = document.createElement('div');
    locationInfo.innerHTML = `
        <strong>${name}</strong>
        <span>${address}</span>
    `;

    const locationActions = document.createElement('div');
    locationActions.innerHTML = `
        <button class="set-current-btn" onclick="setCurrentLocation('${name}', '${address}')">Set as Current</button>
        <button class="delete-location-btn" onclick="deleteLocation(this)">Delete</button>
    `;

    li.appendChild(locationInfo);
    li.appendChild(locationActions);
    locationList.appendChild(li);

    // Save to localStorage
    const locations = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    locations.push({ name, address });
    localStorage.setItem('savedLocations', JSON.stringify(locations));
}

function setCurrentLocation(name, address) {
    document.getElementById('currentLocation').textContent = `${name} - ${address}`;
    localStorage.setItem('currentLocation', JSON.stringify({ name, address }));
}

function deleteLocation(button) {
    const li = button.parentElement.parentElement;
    const name = li.querySelector('strong').textContent;
    const address = li.querySelector('span').textContent;

    // Remove from localStorage
    const locations = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    const updatedLocations = locations.filter(loc => 
        !(loc.name === name && loc.address === address)
    );
    localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));

    // Remove from UI
    li.remove();
}

// Load saved data on page load
function loadSavedData() {
    // Load email
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        document.getElementById('currentEmail').textContent = savedEmail;
    }

    // Load verification status
    const isVerified = localStorage.getItem('studentVerified');
    if (isVerified === 'true') {
        document.getElementById('verificationStatus').textContent = 'Verified';
    }

    // Load locations
    const savedLocations = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    savedLocations.forEach(loc => {
        addLocationToList(loc.name, loc.address);
    });

    // Load current location
    const currentLocation = JSON.parse(localStorage.getItem('currentLocation') || 'null');
    if (currentLocation) {
        document.getElementById('currentLocation').textContent = 
            `${currentLocation.name} - ${currentLocation.address}`;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(books);
    addMessage('Hello! How can I help you with school information?');
}); 
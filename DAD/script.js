// Smooth scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Basic Add to Cart functionality
let cart = [];
function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    alert(`${itemName} added to cart! Total items: ${cart.length}`);
    console.log('Cart:', cart);
}

// Fetch Google Maps Reviews
function fetchGoogleReviews() {
    const placeId = 'ChIJtYLNh52dyzsRGbOjooMkyNk'; // Shree RK Studio Place ID
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({
        placeId: placeId,
        fields: ['reviews', 'rating']
    }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            const reviewContainer = document.getElementById('review-container');
            reviewContainer.innerHTML = ''; // Clear existing content

            place.reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review');
                reviewElement.innerHTML = `
                    <p><strong>${review.author_name}</strong></p>
                    <p class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                    <p>${review.text}</p>
                    <p><small>${review.relative_time_description}</small></p>
                `;
                reviewContainer.appendChild(reviewElement);
            });
        } else {
            console.error('Failed to fetch reviews:', status);
            document.getElementById('review-container').innerHTML = '<p>No reviews available at this time.</p>';
        }
    });
}

// Load reviews when the page loads
window.onload = fetchGoogleReviews;
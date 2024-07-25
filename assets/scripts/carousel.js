document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const totalItems = items.length;
    const displayCount = 3; // Number of items displayed at a time
    let currentIndex = 0;
    let intervalId;

    function updateCarousel() {
        const offset = -currentIndex * (100 / displayCount); // Calculate the offset
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    function showNext() {
        currentIndex++;
        if (currentIndex > totalItems - displayCount) {
            // Reset index to start the chain again
            currentIndex = 0;
        }
        updateCarousel();
    }

    function startCarousel() {
        intervalId = setInterval(showNext, 3000); // Rotate images every 3 seconds
    }

    function stopCarousel() {
        clearInterval(intervalId); // Stop the rotation
    }

    // Initialize carousel rotation
    startCarousel();

    // Event listeners for hover
    carouselInner.addEventListener('mouseover', stopCarousel);
    carouselInner.addEventListener('mouseout', startCarousel);
    
    // Event listeners for buttons
    document.querySelector('.carousel-control.next').addEventListener('click', () => {
        showNext(); // Show next image
    });

    document.querySelector('.carousel-control.prev').addEventListener('click', () => {
        showPrev(); // Show previous image
    });
});

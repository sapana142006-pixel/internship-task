// Gallery Image Data (At least 4 images with URLs and Captions)
const galleryData = [
    {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        caption: "1. Misty Pine Forest in the Morning"
    },
    {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        caption: "2. Tropical Beach with Crystal Clear Water"
    },
    {
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
        caption: "3. Snow-covered Mountain Peak under Blue Sky"
    },
    {
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
        caption: "4. Sunrays Piercing through Green Forest Trees"
    }
];

// Current Index tracker
let currentIndex = 0;
let slideshowInterval = null;
let isPlaying = false;

// DOM Elements
const galleryImage = document.getElementById('galleryImage');
const imageCaption = document.getElementById('imageCaption');
const imageCounter = document.getElementById('imageCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const dotsContainer = document.getElementById('dotsContainer');

// Function to update the image, caption, counter, and active dot
function updateGallery() {
    const currentItem = galleryData[currentIndex];
    
    galleryImage.src = currentItem.url;
    imageCaption.textContent = currentItem.caption;
    imageCounter.textContent = `Image ${currentIndex + 1} of ${galleryData.length}`;

    updateActiveDot();
}

// Function to create navigation dots dynamically
function createDots() {
    dotsContainer.innerHTML = '';
    galleryData.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
        
        // Allow clicking dots to jump directly to an image
        dot.addEventListener('click', function () {
            currentIndex = index;
            updateGallery();
            if (isPlaying) resetSlideshowTimer(); // Reset timer on manual click
        });

        dotsContainer.appendChild(dot);
    });
}

// Function to highlight the current active dot
function updateActiveDot() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Show Next Image (loops back to 0 after the last image)
function nextImage() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateGallery();
}

// Show Previous Image (loops to last image if at 0)
function prevImage() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateGallery();
}

// Event Listeners for Next and Previous buttons
nextBtn.addEventListener('click', function () {
    nextImage();
    if (isPlaying) resetSlideshowTimer();
});

prevBtn.addEventListener('click', function () {
    prevImage();
    if (isPlaying) resetSlideshowTimer();
});

// Optional Challenge: Slideshow Play/Pause Toggle
function toggleSlideshow() {
    if (isPlaying) {
        clearInterval(slideshowInterval);
        playPauseBtn.textContent = 'Play Slideshow';
        playPauseBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        slideshowInterval = setInterval(nextImage, 3000); // Changes image every 3 seconds
        playPauseBtn.textContent = 'Pause Slideshow';
        playPauseBtn.classList.add('playing');
        isPlaying = true;
    }
}

function resetSlideshowTimer() {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(nextImage, 3000);
}

playPauseBtn.addEventListener('click', toggleSlideshow);

// Initialize Gallery on Page Load
createDots();
updateGallery();
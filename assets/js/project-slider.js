
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.project-slider .project');
    const totalSlides = slides.length;
    const visibleSlides = window.innerWidth > 960 ? 3 : 1;
    
    // Show visible slides with active/inactive states
    function updateSlider() {
        // Update all slides first
        slides.forEach((slide, index) => {
            slide.style.display = 'none';
            slide.classList.add('inactive');
        });
        
        // Show current slide and adjacent ones
        for (let i = 0; i < visibleSlides; i++) {
            const index = (currentSlide + i) % totalSlides;
            slides[index].style.display = 'block';
            slides[index].classList.remove('inactive');
            
            if (visibleSlides === 3) {
                slides[index].style.width = '33.33%';
            } else {
                slides[index].style.width = '100%';
            }
            slides[index].style.float = 'left';
        }
    }
    
    // Add navigation buttons
    const sliderContainer = document.querySelector('.project-slider');
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.className = 'slider-nav prev';
    prevButton.setAttribute('aria-label', 'Previous project');
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.className = 'slider-nav next';
    nextButton.setAttribute('aria-label', 'Next project');
    
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    
    // Add pagination indicators
    const pagination = document.createElement('div');
    pagination.className = 'slider-pagination';
    sliderContainer.appendChild(pagination);
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'pagination-dot';
        dot.setAttribute('data-index', i);
        pagination.appendChild(dot);
        
        dot.addEventListener('click', function() {
            currentSlide = parseInt(this.getAttribute('data-index'));
            updateSlider();
            updatePagination();
        });
    }
    
    function updatePagination() {
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Navigation handlers
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        updatePagination();
    });
    
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
        updatePagination();
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextButton.click(); // Swipe left
        } else if (touchEndX > touchStartX + 50) {
            prevButton.click(); // Swipe right
        }
    }
    
    // Initialize the slider
    updateSlider();
    updatePagination();
    
    // Responsive behavior
    window.addEventListener('resize', function() {
        const newVisibleSlides = window.innerWidth > 960 ? 3 : 1;
        if (newVisibleSlides !== visibleSlides) {
            visibleSlides = newVisibleSlides;
            updateSlider();
        }
    });
});

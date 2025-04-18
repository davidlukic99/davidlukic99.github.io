document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slider .testimonial');
    const totalTestimonials = testimonials.length;
    
    // Show only current testimonial
    function updateTestimonialSlider() {
        testimonials.forEach((testimonial, index) => {
            if (index === currentTestimonial) {
                testimonial.style.display = 'block';
                testimonial.classList.add('active');
                testimonial.classList.remove('inactive');
            } else {
                testimonial.style.display = 'none';
                testimonial.classList.remove('active');
                testimonial.classList.add('inactive');
            }
        });
    }
    
    // Add navigation buttons
    const sliderContainer = document.querySelector('.testimonial-slider');
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.className = 'slider-nav prev';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.className = 'slider-nav next';
    nextButton.setAttribute('aria-label', 'Next testimonial');
    
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    
    // Add pagination indicators
    const pagination = document.createElement('div');
    pagination.className = 'slider-pagination';
    sliderContainer.appendChild(pagination);
    
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('span');
        dot.className = 'pagination-dot';
        dot.setAttribute('data-index', i);
        pagination.appendChild(dot);
        
        dot.addEventListener('click', function() {
            currentTestimonial = parseInt(this.getAttribute('data-index'));
            updateTestimonialSlider();
            updatePagination();
        });
    }
    
    function updatePagination() {
        const dots = document.querySelectorAll('.testimonial-slider .pagination-dot');
        dots.forEach((dot, index) => {
            if (index === currentTestimonial) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Navigation handlers
    prevButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateTestimonialSlider();
        updatePagination();
    });
    
    nextButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonialSlider();
        updatePagination();
    });
    
    // Initialize the slider
    updateTestimonialSlider();
    updatePagination();
});

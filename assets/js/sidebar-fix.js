// Completely disable sidebar on mobile
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 960;
    }

    // Function to forcefully remove header-visible class on mobile
    function disableSidebarOnMobile() {
        if (isMobile()) {
            document.body.classList.remove('header-visible');

            // Also set margin-left of main and footer to 0
            document.getElementById('main').style.marginLeft = '0';
            document.getElementById('footer').style.marginLeft = '0';
        }
    }

    // Run on page load
    disableSidebarOnMobile();

    // Run on scroll - this is important to catch any attempts to show the sidebar
    window.addEventListener('scroll', disableSidebarOnMobile);

    // Run on resize
    window.addEventListener('resize', disableSidebarOnMobile);

    // Run every 100ms as a fallback
    setInterval(disableSidebarOnMobile, 100);

    // Override any attempts to add the header-visible class
    const originalAddClass = Element.prototype.classList.add;
    Element.prototype.classList.add = function() {
        if (arguments[0] === 'header-visible' && isMobile()) {
            // Do nothing on mobile
            return;
        }
        return originalAddClass.apply(this, arguments);
    };
});

// Emergency sidebar fix
(function() {
    // Function to check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 960;
    }
    
    // Function to completely disable the sidebar
    function disableSidebar() {
        if (isMobile()) {
            // Remove header-visible class
            document.body.classList.remove('header-visible');
            
            // Force main and footer to take full width
            var main = document.getElementById('main');
            var footer = document.getElementById('footer');
            
            if (main) {
                main.style.marginLeft = '0';
                main.style.width = '100%';
                main.style.transform = 'none';
            }
            
            if (footer) {
                footer.style.marginLeft = '0';
                footer.style.width = '100%';
                footer.style.transform = 'none';
            }
            
            // Hide header and toggle
            var header = document.getElementById('header');
            var headerToggle = document.getElementById('headerToggle');
            
            if (header) {
                header.style.display = 'none';
                header.style.visibility = 'hidden';
                header.style.opacity = '0';
                header.style.pointerEvents = 'none';
            }
            
            if (headerToggle) {
                headerToggle.style.display = 'none';
                headerToggle.style.visibility = 'hidden';
                headerToggle.style.opacity = '0';
                headerToggle.style.pointerEvents = 'none';
            }
        }
    }
    
    // Run immediately
    disableSidebar();
    
    // Run on scroll
    window.addEventListener('scroll', disableSidebar);
    
    // Run on resize
    window.addEventListener('resize', disableSidebar);
    
    // Run on any click
    document.addEventListener('click', disableSidebar);
    
    // Run on any touch
    document.addEventListener('touchstart', disableSidebar);
    document.addEventListener('touchmove', disableSidebar);
    document.addEventListener('touchend', disableSidebar);
    
    // Run periodically as a fallback
    setInterval(disableSidebar, 100);
    
    // Override jQuery functions that might be used to show the sidebar
    if (window.jQuery) {
        var originalJQueryFn = jQuery.fn.addClass;
        jQuery.fn.addClass = function(className) {
            if (className === 'header-visible' && isMobile()) {
                return this;
            }
            return originalJQueryFn.apply(this, arguments);
        };
    }
    
    // Override classList methods
    var originalAddClass = Element.prototype.classList.add;
    Element.prototype.classList.add = function() {
        if (arguments[0] === 'header-visible' && isMobile()) {
            return;
        }
        return originalAddClass.apply(this, arguments);
    };
    
    // Disable any transitions that might be causing issues
    var style = document.createElement('style');
    style.innerHTML = '@media screen and (max-width: 960px) { * { transition: none !important; } }';
    document.head.appendChild(style);
    
    // Disable any scroll events that might be triggering the sidebar
    window.addEventListener('scroll', function(e) {
        if (isMobile()) {
            if (document.body.classList.contains('header-visible')) {
                document.body.classList.remove('header-visible');
            }
        }
    }, true);
    
    // Disable any panel functionality on mobile
    if (window.jQuery && jQuery.fn.panel && isMobile()) {
        jQuery.fn.panel = function() {
            return this;
        };
    }
})();

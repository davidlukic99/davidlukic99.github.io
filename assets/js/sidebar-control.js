// Clean sidebar control script
(function($) {
    $(document).ready(function() {
        // Ensure sidebar is closed by default
        $('body').removeClass('header-visible');
        
        // Handle toggle button click
        $('#headerToggle .toggle').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle sidebar visibility
            $('body').toggleClass('header-visible');
        });
        
        // Close sidebar when clicking on navigation links
        $('#nav a').on('click', function() {
            $('body').removeClass('header-visible');
        });
        
        // Close sidebar when clicking outside
        $(document).on('click', function(e) {
            if ($('body').hasClass('header-visible') && 
                !$(e.target).closest('#header').length && 
                !$(e.target).closest('#headerToggle').length) {
                $('body').removeClass('header-visible');
            }
        });
        
        // Prevent clicks inside the sidebar from closing it
        $('#header').on('click', function(e) {
            e.stopPropagation();
        });
        
        // Override the panel behavior to prevent auto-opening
        if ($.fn.panel) {
            var originalPanel = $.fn.panel;
            $.fn.panel = function(options) {
                // Modify options to prevent auto-opening
                if (options && options.visibleClass === 'header-visible') {
                    options.userInitiated = true;
                }
                return originalPanel.call(this, options);
            };
        }
        
        // Fix for scroll events potentially triggering sidebar
        $(window).on('scroll', function() {
            // Only close if it was opened automatically (not by user click)
            if ($('body').hasClass('header-visible') && !window.sidebarUserOpened) {
                $('body').removeClass('header-visible');
            }
        });
        
        // Track user-initiated sidebar opening
        $('#headerToggle .toggle').on('mousedown', function() {
            window.sidebarUserOpened = true;
        });
        
        // Reset user-initiated flag when sidebar is closed
        $(document).on('click', function() {
            if (!$('body').hasClass('header-visible')) {
                window.sidebarUserOpened = false;
            }
        });
    });
})(jQuery);

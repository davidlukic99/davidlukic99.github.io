/**
 * Mobile Sidebar Control Script
 * Handles the sidebar toggle behavior for mobile devices
 */
(function($) {
    'use strict';

    $(document).ready(function() {
        // Ensure sidebar is closed by default on page load
        $('body').removeClass('header-visible');

        // Add close button to sidebar if it doesn't exist
        if ($('#sidebar-close').length === 0) {
            $('#header').append('<button id="sidebar-close" aria-label="Close sidebar"></button>');
        }

        // Handle toggle button click - toggle sidebar visibility
        $(document).on('click', '#headerToggle .toggle', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle the sidebar
            $('body').toggleClass('header-visible');

            // Prevent scroll on body when sidebar is open (mobile only)
            if ($(window).width() <= 960) {
                if ($('body').hasClass('header-visible')) {
                    $('body').css('overflow', 'hidden');
                } else {
                    $('body').css('overflow', '');
                }
            }
        });

        // Handle close button click in sidebar
        $(document).on('click', '#sidebar-close', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('body').removeClass('header-visible');
            $('body').css('overflow', '');
        });

        // Close sidebar when clicking on navigation links
        $('#nav a').on('click', function(e) {
            // Only close for internal links
            const href = $(this).attr('href');
            if (href && href.charAt(0) === '#') {
                $('body').removeClass('header-visible');
                $('body').css('overflow', '');
            }
        });

        // Close sidebar when clicking outside on mobile (including overlay)
        $(document).on('click', function(e) {
            if ($(window).width() <= 960) {
                if ($('body').hasClass('header-visible') &&
                    !$(e.target).closest('#header').length &&
                    !$(e.target).closest('#headerToggle').length &&
                    !$(e.target).closest('#sidebar-close').length) {
                    $('body').removeClass('header-visible');
                    $('body').css('overflow', '');
                }
            }
        });

        // Prevent clicks inside the sidebar from closing it
        $('#header').on('click', function(e) {
            e.stopPropagation();
        });

        // Handle window resize - reset sidebar state when switching between desktop/mobile
        let resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const width = $(window).width();

                // On desktop, ensure proper layout
                if (width > 960) {
                    $('body').removeClass('header-visible');
                    $('body').css('overflow', '');
                }
                // On mobile, ensure sidebar is hidden
                else {
                    if (!$('body').hasClass('header-visible')) {
                        $('body').css('overflow', '');
                    }
                }
            }, 250);
        });

        // Handle escape key to close sidebar
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $('body').hasClass('header-visible')) {
                $('body').removeClass('header-visible');
                $('body').css('overflow', '');
            }
        });

        // Override any panel behavior that might interfere
        if ($.fn.panel) {
            var originalPanel = $.fn.panel;
            $.fn.panel = function(options) {
                if (options && options.visibleClass === 'header-visible') {
                    options.delayInit = true;
                }
                return originalPanel.call(this, options);
            };
        }

        // Debug: Log sidebar state changes
        $(document).on('headerVisibleChange', function() {
            console.log('Sidebar visibility changed:', $('body').hasClass('header-visible'));
        });
    });

})(jQuery);

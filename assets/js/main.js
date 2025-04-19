/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// IMPORTANT: Make sure sidebar is ALWAYS closed by default
		$body.removeClass('header-visible');

		// Completely override the panel behavior for better control
		$('#headerToggle .toggle').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			// Only open the sidebar, never close it with this button
			if (!$body.hasClass('header-visible')) {
				$body.addClass('header-visible');
			}
		});

		// Handle the close button click - this is the ONLY way to close the sidebar
		$('#sidebar-close').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$body.removeClass('header-visible');
		});

		// Close sidebar when clicking on nav links
		$('#nav a').on('click', function(e) {
			// Only for internal links
			if ($(this).attr('href').charAt(0) === '#') {
				$body.removeClass('header-visible');
			}
		});

		// Prevent clicks inside the sidebar from closing it
		$('#header').on('click', function(e) {
			e.stopPropagation();
		});

		// Close sidebar when clicking anywhere else on the page
		$(document).on('click', function(e) {
			// If sidebar is visible and click is outside the sidebar and toggle
			if ($body.hasClass('header-visible')) {
				$body.removeClass('header-visible');
			}
		});

})(jQuery);

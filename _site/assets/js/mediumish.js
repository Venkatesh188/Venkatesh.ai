/**
 * Main JavaScript file for Venkatesh.ai
 * Enhances the website with interactive elements and functionality
 */

(function($) {
    'use strict';

    // When the DOM is fully loaded
    $(document).ready(function() {
        
        // Mobile menu toggle
        $('.mobile-menu-toggle').on('click', function() {
            $('.site-nav').toggleClass('active');
            $(this).toggleClass('active');
        });

        // Smooth scrolling for anchor links
        $('a[href^="#"]:not([href="#"])').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        });

        // Initialize syntax highlighting
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }

        // Lightbox for images
        $('.post-content img').each(function() {
            if (!$(this).parent('a').length) {
                $(this).wrap('<a href="' + $(this).attr('src') + '" class="lightbox-image"></a>');
            }
        });

        if (typeof SimpleLightbox !== 'undefined') {
            new SimpleLightbox('.lightbox-image', {
                captionsData: 'alt',
                captionDelay: 200
            });
        }

        // Add copy button to code blocks
        $('.post-content pre').each(function() {
            var codeBlock = $(this);
            var copyButton = $('<button class="copy-code">Copy</button>');
            codeBlock.append(copyButton);

            copyButton.on('click', function() {
                var code = codeBlock.find('code').text();
                navigator.clipboard.writeText(code).then(function() {
                    copyButton.text('Copied!');
                    setTimeout(function() {
                        copyButton.text('Copy');
                    }, 2000);
                }).catch(function(err) {
                    console.error('Failed to copy: ', err);
                });
            });
        });

        // Table of contents generation
        if ($('.post-content').length && $('.table-of-contents').length) {
            var toc = '';
            var headings = $('.post-content h2, .post-content h3');
            
            if (headings.length > 2) {
                toc += '<ul>';
                
                headings.each(function(index) {
                    var heading = $(this);
                    var headingText = heading.text();
                    var headingId = 'heading-' + index;
                    
                    heading.attr('id', headingId);
                    
                    if (heading.is('h2')) {
                        toc += '<li><a href="#' + headingId + '">' + headingText + '</a></li>';
                    } else {
                        toc += '<li class="toc-sub"><a href="#' + headingId + '">' + headingText + '</a></li>';
                    }
                });
                
                toc += '</ul>';
                $('.table-of-contents').html('<h4>Table of Contents</h4>' + toc);
            } else {
                $('.table-of-contents').remove();
            }
        }

        // Reading time calculation
        if ($('.post-content').length && $('.reading-time').length) {
            var content = $('.post-content').text();
            var words = content.trim().split(/\s+/).length;
            var readingTime = Math.ceil(words / 200); // Assuming 200 words per minute
            $('.reading-time').text(readingTime + ' min read');
        }

        // Newsletter form submission with validation
        $('#newsletter-form').on('submit', function(e) {
            e.preventDefault();
            
            var email = $('#newsletter-email').val();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                $('.newsletter-message').html('<div class="alert alert-danger">Please enter a valid email address.</div>');
                return;
            }
            
            // Here you would typically make an AJAX call to your newsletter service
            // For demo purposes, we'll just show a success message
            $('.newsletter-message').html('<div class="alert alert-success">Thank you for subscribing!</div>');
            $('#newsletter-form')[0].reset();
        });

        // Contact form submission with validation
        $('#contact-form').on('submit', function(e) {
            e.preventDefault();
            
            var name = $('#contact-name').val();
            var email = $('#contact-email').val();
            var message = $('#contact-message').val();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                $('.contact-message').html('<div class="alert alert-danger">Please fill in all fields.</div>');
                return;
            }
            
            if (!emailRegex.test(email)) {
                $('.contact-message').html('<div class="alert alert-danger">Please enter a valid email address.</div>');
                return;
            }
            
            // Here you would typically make an AJAX call to your form handling service
            // For demo purposes, we'll just show a success message
            $('.contact-message').html('<div class="alert alert-success">Thank you for your message! I\'ll get back to you soon.</div>');
            $('#contact-form')[0].reset();
        });

        // Dark mode toggle
        var darkModeToggle = $('#dark-mode-toggle');
        var isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        if (isDarkMode) {
            $('body').addClass('dark-mode');
            darkModeToggle.addClass('active');
        }
        
        darkModeToggle.on('click', function() {
            $('body').toggleClass('dark-mode');
            var isDarkModeNow = $('body').hasClass('dark-mode');
            localStorage.setItem('darkMode', isDarkModeNow);
            darkModeToggle.toggleClass('active');
        });

        // Initialize search functionality
        var searchForm = $('#search-form');
        var searchResults = $('#search-results');
        
        searchForm.on('submit', function(e) {
            e.preventDefault();
            var searchTerm = $('#search-input').val().toLowerCase();
            
            if (searchTerm.trim() === '') {
                searchResults.html('');
                return;
            }
            
            // Here you would typically make an AJAX call to your search endpoint
            // For demo purposes, we'll just search through the visible content
            var results = [];
            
            $('.card').each(function() {
                var card = $(this);
                var title = card.find('.card-title').text().toLowerCase();
                var text = card.find('.card-text').text().toLowerCase();
                
                if (title.includes(searchTerm) || text.includes(searchTerm)) {
                    results.push({
                        title: card.find('.card-title').text(),
                        url: card.find('a').attr('href'),
                        excerpt: card.find('.card-text').text().substring(0, 100) + '...'
                    });
                }
            });
            
            if (results.length > 0) {
                var resultsHtml = '<h2>Search Results</h2><ul class="search-results-list">';
                
                results.forEach(function(result) {
                    resultsHtml += '<li><h3><a href="' + result.url + '">' + result.title + '</a></h3><p>' + result.excerpt + '</p></li>';
                });
                
                resultsHtml += '</ul>';
                searchResults.html(resultsHtml);
            } else {
                searchResults.html('<h2>Search Results</h2><p>No results found for "' + searchTerm + '".</p>');
            }
        });
    });

})(jQuery); 
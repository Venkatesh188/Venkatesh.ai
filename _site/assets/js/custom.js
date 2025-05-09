/**
 * Custom JavaScript for Vishwakarman AI Blog
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // ------------------------------
    // Dark Mode Toggle Functionality
    // ------------------------------
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved user preference
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode === 'enabled') {
        enableDarkMode();
    }
    
    // Dark mode toggle if element exists
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            // Check current state
            if (htmlElement.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
    
    function enableDarkMode() {
        htmlElement.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.title = 'Switch to Light Mode';
        }
    }
    
    function disableDarkMode() {
        htmlElement.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.title = 'Switch to Dark Mode';
        }
    }
    
    // ------------------------------
    // Reading Time Calculation
    // ------------------------------
    const articleContent = document.querySelector('.article-post');
    const readingTimeElement = document.getElementById('reading-time');
    
    if (articleContent && readingTimeElement) {
        // Get the text content of the article
        const text = articleContent.textContent;
        
        // Calculate reading time
        const wpm = 225; // Average adult reading speed
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        
        // Display reading time
        readingTimeElement.textContent = `${time} min read`;
    }
    
    // ------------------------------
    // Table of Contents Generation
    // ------------------------------
    const tocContainer = document.querySelector('.toc');
    
    if (tocContainer && articleContent) {
        const headings = articleContent.querySelectorAll('h2, h3, h4');
        
        if (headings.length > 0) {
            const tocList = document.createElement('ul');
            tocList.classList.add('toc-list');
            
            headings.forEach((heading, index) => {
                // Create an ID for the heading if it doesn't have one
                if (!heading.id) {
                    heading.id = `heading-${index}`;
                }
                
                const listItem = document.createElement('li');
                listItem.classList.add(`toc-${heading.tagName.toLowerCase()}`);
                
                const link = document.createElement('a');
                link.href = `#${heading.id}`;
                link.textContent = heading.textContent;
                
                listItem.appendChild(link);
                tocList.appendChild(listItem);
                
                // Add click event to smooth scroll to heading
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelector(link.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            tocContainer.appendChild(tocList);
        }
    }
    
    // ------------------------------
    // Image Lightbox
    // ------------------------------
    const articleImages = document.querySelectorAll('.article-post img:not(.no-lightbox)');
    
    articleImages.forEach(image => {
        // Make images clickable
        image.style.cursor = 'pointer';
        
        // Add click event
        image.addEventListener('click', () => {
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');
            
            const lightboxImage = document.createElement('img');
            lightboxImage.src = image.src;
            
            const closeButton = document.createElement('span');
            closeButton.classList.add('lightbox-close');
            closeButton.innerHTML = '&times;';
            
            // Assemble and append to body
            lightboxContent.appendChild(lightboxImage);
            lightboxContent.appendChild(closeButton);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
            
            // Close lightbox on click
            lightbox.addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
        });
    });
    
    // ------------------------------
    // Comment Form Enhancement
    // ------------------------------
    const commentForm = document.getElementById('comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            // Get form data (not preventing default as it's handled by formspree)
            const name = this.querySelector('[name="name"]').value;
            const comment = this.querySelector('[name="comment"]').value;
            
            // Store in localStorage to show user their own comments immediately
            // (This is just for UX, not for actual comment storage)
            const userComments = JSON.parse(localStorage.getItem('userComments') || '[]');
            userComments.push({
                name: name,
                content: comment,
                date: new Date().toISOString().slice(0, 10),
                post: window.location.pathname
            });
            localStorage.setItem('userComments', JSON.stringify(userComments));
        });
        
        // Show user's previously submitted comments
        const userComments = JSON.parse(localStorage.getItem('userComments') || '[]');
        const commentsContainer = document.getElementById('comments-container');
        
        if (commentsContainer) {
            const currentPath = window.location.pathname;
            const relevantComments = userComments.filter(c => c.post === currentPath);
            
            if (relevantComments.length > 0) {
                const yourCommentsHeading = document.createElement('h5');
                yourCommentsHeading.textContent = 'Your Comments';
                yourCommentsHeading.className = 'mt-4 mb-3';
                commentsContainer.appendChild(yourCommentsHeading);
                
                relevantComments.forEach(comment => {
                    const commentEl = document.createElement('div');
                    commentEl.className = 'comment user-comment';
                    commentEl.innerHTML = `
                        <div class="comment-meta">
                            <strong>${comment.name} (You)</strong> | <span>${comment.date}</span>
                        </div>
                        <div class="comment-content">
                            <p>${comment.content}</p>
                        </div>
                        <div class="comment-status">
                            <small>Awaiting moderation</small>
                        </div>
                    `;
                    commentsContainer.appendChild(commentEl);
                });
            }
        }
    }
    
    // ------------------------------
    // Scroll to Top Button
    // ------------------------------
    const scrollToTopBtn = document.getElementById('backToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.parentElement.style.display = 'block';
            } else {
                scrollToTopBtn.parentElement.style.display = 'none';
            }
        });
        
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ------------------------------
    // Sticky Table of Contents
    // ------------------------------
    const sidebar = document.querySelector('.sticky-top-80');
    
    if (sidebar) {
        const initialTopOffset = sidebar.getBoundingClientRect().top + window.pageYOffset;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > initialTopOffset) {
                sidebar.classList.add('sticky');
            } else {
                sidebar.classList.remove('sticky');
            }
        });
    }
    
    // ------------------------------
    // Responsive Tables
    // ------------------------------
    const tables = document.querySelectorAll('.article-post table');
    
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('table-responsive');
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
    
    // ------------------------------
    // External Links Control
    // ------------------------------
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
        // Add external link icon
        link.innerHTML += ' <i class="fas fa-external-link-alt fa-xs"></i>';
        
        // Open in new tab and add security attributes
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // ------------------------------
    // Code Block Copy Button
    // ------------------------------
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-button';
        copyButton.textContent = 'Copy';
        
        // Insert button before code block
        const pre = codeBlock.parentNode;
        pre.style.position = 'relative';
        pre.insertBefore(copyButton, codeBlock);
        
        // Add click event
        copyButton.addEventListener('click', () => {
            const code = codeBlock.textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }, (err) => {
                console.error('Could not copy text: ', err);
                copyButton.textContent = 'Failed!';
            });
        });
    });
}); 
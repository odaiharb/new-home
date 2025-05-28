document.addEventListener('DOMContentLoaded', () => {
    // --- Inquiry Form Submission ---
    const inquiryForm = document.getElementById('inquiryForm');
    const responseMessage = document.getElementById('responseMessage');

    if (inquiryForm) { // Check if the form exists
        inquiryForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(inquiryForm);

            try {
                const response = await fetch('submit_form.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json(); // Assuming PHP returns JSON

                responseMessage.textContent = result.message;
                responseMessage.classList.remove('success', 'error'); // Clear previous classes
                if (result.success) {
                    responseMessage.classList.add('success');
                    inquiryForm.reset(); // Clear the form on success
                } else {
                    responseMessage.classList.add('error');
                }
                responseMessage.style.display = 'block'; // Show the message

                // Optional: Hide message after a few seconds
                setTimeout(() => {
                    responseMessage.style.display = 'none';
                }, 5000);

            } catch (error) {
                console.error('Error:', error);
                responseMessage.textContent = 'An error occurred during submission. Please try again.';
                responseMessage.classList.remove('success');
                responseMessage.classList.add('error');
                responseMessage.style.display = 'block';
                 setTimeout(() => {
                    responseMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for sticky header if needed, or simply scrollIntoView
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- Hero Section Button Smooth Scroll ---
    const exploreButton = document.querySelector('.hero-section .btn-primary');
    if (exploreButton) {
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
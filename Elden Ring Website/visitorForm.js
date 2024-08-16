//This is the first purely Javascript file I've written. In the past projects I was just copying and pasting the same
// code from one html file to the next. By writing this file and importing it into each file it saves space
// and saves me time. Rather than having to type all the code multiple times. This is so much easier. 



const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {
    const themeCSS = document.querySelector('link[href="dark-theme.css"]');

    if (themeCSS) {
        themeCSS.remove();
    } else {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'dark-theme.css';
        document.head.appendChild(link);
    }
});

document.getElementById('log-visit').addEventListener('click', function() {
    document.getElementById('visitor-form').style.display = 'block';
});

document.getElementById('visitor-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate form fields
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (
        firstName.trim() === '' ||
        lastName.trim() === '' ||
        address.trim() === '' ||
        city.trim() === '' ||
        state.trim() === '' ||
        zip.trim() === '' ||
        email.trim() === '' ||
        phone.trim() === ''
    ) {
        alert('Please fill out all fields.');
        return;
    }

    // Validate email format using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Form submission successful, hide the form and display thank you message
    document.getElementById('visitor-form').style.display = 'none';
    document.getElementById('success').style.display = 'block';
});

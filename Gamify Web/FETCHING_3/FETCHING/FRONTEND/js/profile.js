$(document).ready(function() {

    console.log("Email:", localStorage.getItem('email'));

    // Function to fetch user profile data from the server
    function fetchUserProfile() {
        const email = localStorage.getItem('email');

        if (!email) {
            console.error('Email not found in localStorage.');
            return; 
        }

        const url = `http://localhost:911/users/profile?email=${encodeURIComponent(email)}`;

        console.log('Fetching user profile with URL:', url);

        // AJAX request to fetch user profile
        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(userProfile) {
                console.log('Raw response:', userProfile);

                // Check if response is empty
                if (!userProfile) {
                    console.error('Empty response received from server.');
                    alert('Empty response received from server. Please try again later.');
                    return;
                }

                console.log('User profile fetched successfully:', userProfile);

                // Populate user profile data in the HTML
                populateUserProfile(userProfile);
            },
            error: function(xhr, status, error) {
                console.error('Error occurred while fetching user profile:', error);
                console.log('Status:', status);
                console.log('XHR:', xhr);
                if (xhr.status === 401) {
                    alert('Unauthorized. Please log in again.');
                } else if (xhr.status === 404) {
                    alert('User profile not found.');
                } else {
                    alert('An error occurred. Please try again later.');
                }
            }
        });
    }

    // Function to populate user profile data in HTML
    function populateUserProfile(userProfile) {
        console.log('Populating user profile:', userProfile);

        // Check if userProfile is defined and not empty
        if (!userProfile || Object.keys(userProfile).length === 0) {
            console.error('User profile data is empty or undefined');
            // You can show an error message or handle this case appropriately
            return;
        }

        // Populate fields in the HTML
        $('#username').text(userProfile.username || 'N/A');
        $('#profileUsername').text(userProfile.username || 'N/A');
        $('#usernameInput').val(userProfile.username || 'N/A');
        $('#firstName').val(userProfile.firstName || 'N/A');
        $('#lastName').val(userProfile.lastName || 'N/A');
        $('#email').val(userProfile.email || 'N/A');
        // Assuming you should not populate password field for security reasons
        // $('#password').val(userProfile.password || '');

        console.log('User profile populated');
    }

    // Function to handle logout
    function handleLogout() {
        // Clear JWT token and email from localStorage
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('email');
        
        // Redirect to landing page after logout
        window.location.href = "../html/landingpage.html";
    }

    // Call fetchUserProfile function when the document is ready
    fetchUserProfile();

    // Attach logout handler to the logout link
    $('#logoutLink').on('click', function(event) {
        event.preventDefault();
        handleLogout();
    });
});

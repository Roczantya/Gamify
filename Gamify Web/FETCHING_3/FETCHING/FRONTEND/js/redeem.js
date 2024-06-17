document.addEventListener("DOMContentLoaded", function() {
  // DOM elements
  const cardsContainer = document.getElementById('rewards-container');
  const redeemButtons = document.querySelectorAll('.redeem-btn');
  const emailModal = document.getElementById('emailModal');
  const confirmationModal = document.getElementById('confirmationModal');
  const closeButtons = document.querySelectorAll('.close');
  const submitEmailButton = document.getElementById('submitEmail');
  const userEmail = document.getElementById('userEmail');
  const userPointsElement = document.getElementById('user-points'); // Assuming you have an element to display user points

  // Sample card data
  const cardData = [
      { id: 1, image: '../images/amazon.jpg', title: 'Amazon Card', description: 'Rp50.000 Gift Card', points: 50 },
      { id: 2, image: '../images/amazon.jpg', title: 'Amazon Card', description: 'Rp100.000 Gift Card', points: 100 },
      { id: 3, image: '../images/amazon.jpg', title: 'Amazon Card', description: 'Rp150.000 Gift Card', points: 150 },
      { id: 4, image: '../images/amazon.jpg', title: 'Amazon Card', description: 'Rp200.000 Gift Card', points: 200 },
      { id: 5, image: '../images/spotify.jpg', title: 'Spotify Gift Card', description: 'Langganan 1 Bulan', points: 50 },
      { id: 6, image: '../images/spotify.jpg', title: 'Spotify Gift Card', description: 'Langganan 3 Bulan', points: 125 },
      { id: 7, image: '../images/spotify.jpg', title: 'Spotify Gift Card', description: 'Langganan 1 Tahun', points: 400 },
      { id: 8, image: '../images/steam.jpg', title: 'Steam Gift Card', description: 'Rp.50.000 Gift Card', points: 50 },
      { id: 9, image: '../images/steam.jpg', title: 'Steam Gift Card', description: 'Rp.100.000 Gift Card', points: 100 },
      { id: 10, image: '../images/steam.jpg', title: 'Steam Gift Card', description: 'Rp.150.000 Gift Card', points: 100 },
      { id: 11, image: '../images/got.jpg', title: 'Steam Key', description: 'Ghost Of Tsushima', points: 800 },
      { id: 12, image: '../images/ed.jpg', title: 'Steam Key', description: 'Elden Ring', points: 800 },
  ];

  // Function to build reward cards
  function buildCard(cardData) {
      const card = document.createElement('div');
      card.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4');
      card.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h3>${cardData.title}</h3>
                  <p>${cardData.description}</p>
              </div>
              <div class="card-img">
                  <img src="${cardData.image}" alt="${cardData.title}">
              </div>
              <div class="card-body">
                  <h4><strong>${cardData.points} Points</strong></h4>
                  <button class="btn redeem-btn" data-points="${cardData.points}" data-description="${cardData.description}">Redeem</button>
              </div>
          </div>
      `;
      return card;
  }

  // Function to render reward cards
  function renderCards() {
      cardData.forEach(data => {
          const card = buildCard(data);
          cardsContainer.appendChild(card);
      });
  }

  // Function to adjust card heights for consistent layout
  function adjustCardHeights() {
      let maxHeight = 0;
      const cards = document.querySelectorAll('.card');

      cards.forEach(card => {
          card.style.height = 'auto';
          let cardHeight = card.offsetHeight;
          if (cardHeight > maxHeight) {
              maxHeight = cardHeight;
          }
      });

      cards.forEach(card => {
          card.style.height = maxHeight + 'px';
      });
  }

  // Call renderCards and adjustCardHeights on DOMContentLoaded
  renderCards();
  adjustCardHeights();

  // Event listener for redeem buttons
  redeemButtons.forEach(button => {
      button.addEventListener('click', () => {
          emailModal.style.display = "flex";
          const points = button.getAttribute('data-points');
          const description = button.getAttribute('data-description');
          // Additional logic for setting emailModal content if needed
      });
  });

  // Event listener for close buttons in modals
  closeButtons.forEach(button => {
      button.addEventListener('click', () => {
          emailModal.style.display = "none";
          confirmationModal.style.display = "none";
      });
  });

  // Event listener for submit email button
  submitEmailButton.addEventListener('click', () => {
      const enteredEmail = userEmail.value.trim();
      if (enteredEmail !== '') {
          emailModal.style.display = "none";
          confirmationModal.style.display = "flex";
          // Additional logic for email confirmation if needed
      } else {
          alert("Please enter a valid email address");
      }
  });

  // Event listener to close modals when clicking outside
  window.addEventListener('click', (event) => {
      if (event.target === emailModal) {
          emailModal.style.display = "none";
      }
      if (event.target === confirmationModal) {
          confirmationModal.style.display = "none";
      }
  });

  // Event listener to adjust card heights on window resize
  window.addEventListener('resize', adjustCardHeights);

  // Function to fetch user profile from server
  function fetchUserProfile(email) {
      const url = `http://localhost:911/users/profile?email=${encodeURIComponent(email)}`;

      console.log('Fetching user profile with URL:', url);

      // AJAX request to fetch user profile
      fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(userProfile => {
          console.log('User profile fetched successfully:', userProfile);
          // Populate user profile data in HTML
          populateUserProfile(userProfile);
      })
      .catch(error => {
          console.error('Error occurred while fetching user profile:', error);
          alert('An error occurred. Please try again later.');
      });
  }

  // Function to populate user profile data in HTML
  function populateUserProfile(userProfile) {
      console.log('Populating user profile:', userProfile);

      if (!userProfile || Object.keys(userProfile).length === 0) {
          console.error('User profile data is empty or undefined');
          return;
      }

      // Assuming you have elements with IDs for populating user data
      document.getElementById('username').textContent = userProfile.username || 'N/A';
      document.getElementById('profileUsername').textContent = userProfile.username || 'N/A';
      document.getElementById('usernameInput').value = userProfile.username || 'N/A';
      document.getElementById('firstName').value = userProfile.firstName || 'N/A';
      document.getElementById('lastName').value = userProfile.lastName || 'N/A';
      document.getElementById('email').value = userProfile.email || 'N/A';
      userPointsElement.textContent = userProfile.points || 'N/A';

      console.log('User profile populated');
  }

  // Retrieve email from localStorage
  const email = localStorage.getItem('email');
  if (email) {
      // Call fetchUserProfile if email is found in localStorage
      fetchUserProfile(email);
  } else {
      console.error('Email not found in localStorage.');
      // Handle case where email is not found in localStorage
  }
});

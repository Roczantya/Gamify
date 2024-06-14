document.addEventListener("DOMContentLoaded", function () {
    const rewards = [
        { id: 1, image: 'amazon.jpg', title: 'Amazon Card', description: 'Rp50.000 Gift Card', points: 50 },
        { id: 2, image: 'amazon.jpg', title: 'Amazon Card', description: 'Rp100.000 Gift Card', points: 100 },
        { id: 2, image: 'amazon.jpg', title: 'Amazon Card', description: 'Rp150.000 Gift Card', points: 150 },
        { id: 2, image: 'amazon.jpg', title: 'Amazon Card', description: 'Rp200.000 Gift Card', points: 200 },
        { id: 3, image: 'spotify.jpg', title: 'Spotify Gift Card', description: 'Langganan 1 Bulan', points: 50 },
        { id: 4, image: 'spotify.jpg', title: 'Spotify Gift Card', description: 'Langganan 3 Bulan', points: 125 },
        { id: 5, image: 'steam.jpg', title: 'Steam Gift Card', description: 'Rp.50.000 Gift Card', points: 50 },
        { id: 6, image: 'steam.jpg', title: 'Steam Gift Card', description: 'Rp.100.000 Gift Card', points: 100 },
        { id: 6, image: 'steam.jpg', title: 'Steam Gift Card', description: 'Rp.150.000 Gift Card', points: 100 },
        { id: 7, image: 'got.jpg', title: 'Steam Key', description: 'Ghost Of Tsushima', points: 800 },
        { id: 7, image: 'ed.jpg', title: 'Steam Key', description: 'Elden Ring', points: 800 },
    ];

    const rewardsContainer = document.getElementById('rewards-container');
    const userPointsElement = document.getElementById('user-points');

    function fetchUserPoints() {
        fetch('/api/user-points')
            .then(response => response.json())
            .then(data => {
                if (data && typeof data.points === 'number') {
                    userPointsElement.textContent = data.points;
                } else {
                    console.error('Invalid response format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching user points:', error);
            });
    }

    fetchUserPoints();

    rewards.forEach(reward => {
        const rewardCard = document.createElement('div');
        rewardCard.innerHTML = `

    <div class="col">
      <div class="card">
        <div class="card-header">
          <h3>${reward.title}</h3>
          <p>${reward.description}</p>
        </div>
        <div class="card-img">
          <img src="${reward.image}">
        </div>
        <div class="card-details">
          <div class="point">
              <strong>${reward.points} Points</strong>
          </div>
        </div>
        <br>
        <div class="card-footer">
        <button class="btn redeem-btn" data-points="${reward.points}">Redeem</button>
        </div>
      </div>
    </div>

        `;
        rewardsContainer.appendChild(rewardCard);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  searchForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      const query = searchInput.value.trim();

      if (query) {
          // Perform the search action here, e.g., redirect to a search results page
          // For demonstration, we will just log the query to the console
          console.log('Search query:', query);

          // Redirect to a search results page (example)
          window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
      } else {
          alert('Please enter a search term.');
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const redeemButtons = document.querySelectorAll('.redeem-btn');
    const emailModal = document.getElementById('emailModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeButtons = document.querySelectorAll('.close');
    const submitEmailButton = document.getElementById('submitEmail');
    const userEmail = document.getElementById('userEmail');

    redeemButtons.forEach(button => {
        button.addEventListener('click', () => {
            emailModal.style.display = "flex";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            emailModal.style.display = "none";
            confirmationModal.style.display = "none";
        });
    });

    submitEmailButton.addEventListener('click', () => {
        if (userEmail.value) {
            emailModal.style.display = "none";
            confirmationModal.style.display = "flex";
        } else {
            alert("Please enter a valid email address");
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === emailModal) {
            emailModal.style.display = "none";
        }
        if (event.target === confirmationModal) {
            confirmationModal.style.display = "none";
        }
    });
});



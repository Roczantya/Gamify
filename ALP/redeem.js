document.addEventListener("DOMContentLoaded", function() {
    const cardsContainer = document.getElementById('rewards-container');
  
    const cardData = [
        { id: 1, image: 'amazon.jpg', title: 'Amazon Card', description: 'Rp50.000 Gift Card', points: 50 },
        { id: 2, image: 'amazon.jpg', title: 'Amazon Card', description: 'Rp100.000 Gift Card', points: 100 },
        { id: 3, image: 'amazon.jpg', title: 'Amazon Card', description: 'Rp150.000 Gift Card', points: 150 },
        { id: 4, image: 'amazon.jpg', title: 'Amazon Card', description: 'Rp200.000 Gift Card', points: 200 },
        { id: 5, image: 'spotify.jpg', title: 'Spotify Gift Card', description: 'Langganan 1 Bulan', points: 50 },
        { id: 6, image: 'spotify.jpg', title: 'Spotify Gift Card', description: 'Langganan 3 Bulan', points: 125 },
        { id: 6, image: 'spotify.jpg', title: 'Spotify Gift Card', description: 'Langganan 1 Tahun', points: 400 },
        { id: 7, image: 'steam.jpg', title: 'Steam Gift Card', description: 'Rp.50.000 Gift Card', points: 50 },
        { id: 8, image: 'steam.jpg', title: 'Steam Gift Card', description: 'Rp.100.000 Gift Card', points: 100 },
        { id: 9, image: 'steam.jpg', title: 'Steam Gift Card', description: 'Rp.150.000 Gift Card', points: 100 },
        { id: 10, image: 'got.jpg', title: 'Steam Key', description: 'Ghost Of Tsushima', points: 800 },
        { id: 11, image: 'ed.jpg', title: 'Steam Key', description: 'Elden Ring', points: 800 },
    ];
    
    cardData.forEach(data => {
      const card = document.createElement('div');
      card.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'mb-4');
  
      card.innerHTML = `

        <div class="card">
        <div class="card-body">
          <h3>${data.title}</h3>
          <p>${data.description}</p>
        </div>
          <div class="card-img">
            <img src="${data.image}">
          </div>
          <div class="card-body">
            <h4><strong>${data.points} Points</strong></h4>
            <button class="btn redeem-btn" data-points="${data.points}">Redeem</button>
          </div>
        </div>
      `;
  
      cardsContainer.appendChild(card);
    });
  
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
  
    // Initial adjustment
    adjustCardHeights();
  
    // Adjust on window resize
    window.addEventListener('resize', adjustCardHeights);
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
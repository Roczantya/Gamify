document.addEventListener('DOMContentLoaded', function () {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function updateCalendar() {
        document.getElementById('monthButton').innerText = `${monthNames[currentMonth]} ${currentYear}`;
        const calendarElement = document.getElementById('calendar');
        calendarElement.innerHTML = createCalendarHTML(currentMonth, currentYear);
    }

    function createCalendarHTML(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth());

        let calendarHTML = '<table><thead><tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr></thead><tbody><tr>';
        let day = 1;

        for (let i = 0; i < 7; i++) {
            if (i < firstDay) {
                calendarHTML += '<td></td>';
            } else {
                calendarHTML += `<td${isCurrentMonth && day === today.getDate() ? ' class="today"' : ''}>${day}</td>`;
                day++;
            }
        }
        calendarHTML += '</tr>';

        while (day <= daysInMonth) {
            calendarHTML += '<tr>';
            for (let i = 0; i < 7; i++) {
                if (day <= daysInMonth) {
                    calendarHTML += `<td${isCurrentMonth && day === today.getDate() ? ' class="today"' : ''}>${day}</td>`;
                } else {
                    calendarHTML += '<td></td>';
                }
                day++;
            }
            calendarHTML += '</tr>';
        }
        calendarHTML += '</tbody></table>';
        return calendarHTML;
    }

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        if (currentMonth === 11) {
            currentYear--;
        }
        updateCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        if (currentMonth === 0) {
            currentYear++;
        }
        updateCalendar();
    });

    updateCalendar();
});
const players = [
    { name: 'Player 1', points: 500 },
    { name: 'Tino', points: 450 },
    { name: 'Player 3', points: 850 },
    { name: 'Player 4', points: 700 },
    { name: 'Player 5', points: 750 }
];

const currentUserName = 'Tino';
const totalTaskPoints = 100; // Points for completing all tasks
let progress = 0;
let userPoints = players.find(player => player.name === currentUserName).points;

function sortPlayers(players) {
    return players.sort((a, b) => b.points - a.points);
}

function generateLeaderboard(players) {
    const sortedPlayers = sortPlayers(players);
    const leaderboardList = document.getElementById('leaderboard-list');
    const userRankingElement = document.getElementById('user-ranking');
    leaderboardList.innerHTML = ''; // Clear existing content
    let currentUserRank = null;
    let currentUserPoints = null;

    sortedPlayers.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span class="rank">${index + 1}.</span> ${player.name} - ${player.points} points`;
        if (player.name === currentUserName) {
            listItem.classList.add('highlight');
            currentUserRank = index + 1;
            currentUserPoints = player.points;
        }
        leaderboardList.appendChild(listItem);
    });

    if (currentUserRank !== null) {
        userRankingElement.innerText = `Your ranking: ${currentUserRank} - ${currentUserPoints} points`;
    } else {
        userRankingElement.innerText = `Your ranking: ${currentUserRank} - ${currentUserPoints} points`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateLeaderboard(players);
    document.getElementById('totalPoints').textContent = totalTaskPoints; // Display total points for completing all tasks
    updateUserPoints(userPoints); // Initialize user points on page load
});

function updateUserPoints(newPoints) {
    userPoints = newPoints;
    document.getElementById('userPoints').textContent = userPoints;
    players.find(player => player.name === currentUserName).points = userPoints;
    generateLeaderboard(players);
}

function verifyTask(button) {
    const taskItem = button.closest('li');
    const inputContainer = taskItem.querySelector('.input-container');

    // Hide the input container and button
    inputContainer.style.display = 'none';

    // Add the "Task Done" text and icon
    const taskDone = document.createElement('span');
    taskDone.className = 'task-done';
    taskDone.innerHTML = 'Task Done <i class="bi bi-check-lg"></i>';
    taskItem.appendChild(taskDone);

    // Update progress
    const totalTasks = document.querySelectorAll('.task-list li').length;
    const completedTasks = document.querySelectorAll('.task-done').length;

    progress = (completedTasks / totalTasks) * 100;
    document.querySelector('.progress').style.width = progress + '%';
    document.querySelector('.percent').textContent = 'Progress: ' + progress.toFixed(0) + '%';

    // Check if progress is 100%
    if (progress >= 100) {
        document.getElementById('claimButton').style.display = 'block';
    }

    // Show modal
    openModal('verifyModal');
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function claimPoints() {
    updateUserPoints(userPoints + totalTaskPoints); // Add points for completing all tasks

    // Show no mission message
    document.querySelector('.content-container').style.display = 'none';
    document.querySelector('.progress-bar').style.display = 'none';
    document.querySelector('.percent').style.display = 'none';
    document.querySelector('.task-list').style.display = 'none';
    document.querySelector('.task-points').style.display = 'none';
    document.querySelector('.button-container').style.display = 'none';
    document.getElementById('noMission').style.display = 'block';
    
    openModal('claimModal');
}

// Get the modal and initialize the close event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.progress').style.width = progress + '%';
    document.querySelector('.percent').textContent = 'Progress: ' + progress.toFixed(0) + '%';

    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    });

    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(closeButton => {
        closeButton.onclick = function() {
            closeButton.closest('.modal').style.display = 'none';
        }
    });
});


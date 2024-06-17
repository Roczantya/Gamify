package website.ALP.Service.Leaderboard.impl;

import website.ALP.Service.Leaderboard.LeaderboardService;
import website.ALP.model.Leaderboard;
import website.ALP.model.Users;
import website.ALP.Repository.LeaderboardRepo;
import website.ALP.Repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LeaderboardServiceImpl implements LeaderboardService {

    @Autowired
    private LeaderboardRepo leaderboardRepo;

    @Autowired
    private UserRepo usersRepo;

    @Override
    public List<Leaderboard> getTopLeaderboard() {
        return leaderboardRepo.findTopLeaderboardByPointsDesc();
    }
    @Override
    @Transactional
    public Users addPoints(Long userId, int points) {
        Users user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPoints(user.getPoints() + points);
        usersRepo.save(user);
        return user; // Return the updated user
    }
    
    @Override
    @Transactional
    public Users subtractPoints(Long userId, int points) {
        Users user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    
        // Check if user has enough points to subtract
        if (user.getPoints() < points) {
            throw new RuntimeException("User does not have enough points to subtract");
        }
    
        user.setPoints(user.getPoints() - points);
        usersRepo.save(user);
        return user; // Return the updated user
    }
    
    @Override
    @Transactional
    public void addQuestCompleted(Long userId) {
        Users user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    
        Leaderboard leaderboard = leaderboardRepo.findByUser(user);
        if (leaderboard != null) {
            leaderboard.setQuestsCompleted(leaderboard.getQuestsCompleted() + 1);
        } else {
            leaderboard = new Leaderboard(user, 1); // Create new leaderboard entry if not found
        }
    
        leaderboardRepo.save(leaderboard); // Save using leaderboardRepo
    }
    
    @Override
    public Users findUserByEmailOrId(String emailOrId) {
        try {
            Long userId = Long.parseLong(emailOrId); // Try parsing as ID
            return usersRepo.findById(userId).orElse(null);
        } catch (NumberFormatException e) {
            // If cannot parse as ID, search by email
            return usersRepo.findByEmail(emailOrId).orElse(null);
        }
    }


    @Override
    @Transactional
    public void subtractAllUserPoints() {
        List<Users> allUsers = usersRepo.findAll();
        for (Users user : allUsers) {
            user.setPoints(0); 
            usersRepo.save(user);
        }
    }
    
}

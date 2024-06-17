package website.ALP.Controller;

import website.ALP.Service.Leaderboard.LeaderboardService;
import website.ALP.model.Leaderboard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Leaderboard")
public class LeaderboardController {

    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping("/Top")
    public List<Leaderboard> getTopLeaderboard() {
        return leaderboardService.getTopLeaderboard();
    }


}

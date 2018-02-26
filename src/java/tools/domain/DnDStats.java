/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;

/**
 *
 * @author Mathias
 */
public class DnDStats implements Stats{
    private Map<String, Integer> stats;
    private Random rand = new Random();
        
    public DnDStats(Map<String, Integer> stats)
    {
        this.stats = stats;
        rollStats();
    }
    
    @Override
    public Map<String, Integer> getStats() {
        return stats;
    }

    @Override
    public void rollStats() {
        stats.entrySet().forEach((pair) -> {
            int stat = rollDies();
            stats.replace(pair.getKey(), stat);
        });

    }
    
    private int rollDie()
    {
        return rand.nextInt(5)+1;
    }
    
    private int rollDies()
    {
        List<Integer> rolls = new ArrayList<>();
        for(int i = 0; i<4;i++)
        {
            rolls.add(rollDie());
        }
        
        Collections.sort(rolls);
        Collections.reverse(rolls);
        
        return rolls.get(0)+rolls.get(1)+rolls.get(2);
        
    }
    
}

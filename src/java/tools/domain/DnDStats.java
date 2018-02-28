/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
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
        
    public DnDStats()
    {
        Map <String, Integer> things = new LinkedHashMap<>();
        things.put("STR",0);
        things.put("DEX", 0);
        things.put("CON",0);
        things.put("INT", 0);
        things.put("WIS", 0);
        things.put("CHA",0);
        this.stats = things;
        
    }
    
    @Override
    public Map<String, Integer> getStats() {
        return stats;
    }

    @Override
    public void rollStats() {
        stats.entrySet().forEach((pair) -> {
            int stat = rollDice();
            stats.replace(pair.getKey(), stat);
        });

    }
    
    @Override
    public int getStat(String stat)
    {
        return stats.get(stat);
    }
    
    @Override
    public void setStat(String stat, int value)
    {
        if(stats.containsKey(stat))
        {
            stats.put(stat, value);
        }
    }
    
    private int rollDie()
    {
        return rand.nextInt(5)+1;
    }
    
    private int rollDice()
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

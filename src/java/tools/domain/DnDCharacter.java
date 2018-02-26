/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.domain;

import java.util.Map;

/**
 *
 * @author Mathias
 */
public class DnDCharacter {
    private String name;
    private Stats stats;
    
    public DnDCharacter(String name, String race, String playerClass,  Map<String,Integer> stats)
    {
        this.name = name;
        this.stats = new DnDStats(stats);
        this.stats.rollStats();
    }
    
    public int getStatValue(String stat)
    {
        return stats.getStat(stat);
    }
    
    public Map<String, Integer> getAllStats()
    {
        return stats.getStats();
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.domain;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Mathias
 */
public class DnDCharacter {
    private String name;
    private Stats stats;
    private DnDRace race;
    private DnDRace subRace;
    private DnDClass startingClass;
    private List<DnDClass> multiClass;
    
    public DnDCharacter(String name, DnDRace race, DnDRace subRace, DnDClass playerClass)
    {
        this.name = name;
        this.stats = new DnDStats();
        this.race = race;
        this.subRace = subRace;
        this.startingClass = playerClass;
        this.multiClass = new ArrayList<>();
    }
    
    public int getStatValue(String stat)
    {
        return stats.getStat(stat);
    }
    
    public Map<String, Integer> getAllStats()
    {
        Map<String, Integer> totalStats = stats.getStats();
        
        race.getStatBonus().entrySet().forEach((pair) -> {
            totalStats.put(name, totalStats.get(pair.getKey())+pair.getValue());
        });
        
        subRace.getStatBonus().entrySet().forEach((pair) -> {
            totalStats.put(name, totalStats.get(pair.getKey())+pair.getValue());
        });
        return totalStats;
    }
}

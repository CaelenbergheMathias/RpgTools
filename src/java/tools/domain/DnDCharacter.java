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
    private DnDStats stats;
    
    public DnDCharacter(String name, Map<String,Integer> stats)
    {
        this.name = name;
        this.stats = new DnDStats(stats);
        this.stats.rollStats();
    }
}

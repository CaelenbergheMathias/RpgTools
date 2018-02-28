/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.domain;

import java.util.List;
import java.util.Map;

/**
 *
 * @author Mathias
 */
class DnDRace {
    private String name;
    private Integer speed;
    private String size;
    private Map<String,Integer> statBonus;
    private DnDTraits traits;
    
    public DnDRace(String name, Integer speed, Integer size, Map<String, Integer> statBonus, DnDTraits traits)
    {
        
    }
   
    public String getName() {
        return name;
    }

    public Integer getSpeed() {
        return speed;
    }

    public String getSize() {
        return size;
    }

    public Map<String,Integer> getStatBonus() {
        return statBonus;
    }
    
    public DnDTraits getTraits()
    {
        return traits;
    }
}

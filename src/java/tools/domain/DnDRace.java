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
    private List<String> proficiencies;
    private List<String> traits;
    private List<String> languages;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSpeed() {
        return speed;
    }

    public void setSpeed(Integer speed) {
        this.speed = speed;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Map<String,Integer> getStatBonus() {
        return statBonus;
    }

    public void setStatBonus(Map<String,Integer> statBonus) {
        this.statBonus = statBonus;
    }

    public List<String> getProficiencies() {
        return proficiencies;
    }

    public void setProficiencies(List<String> proficiencies) {
        this.proficiencies = proficiencies;
    }

    public List<String> getTraits() {
        return traits;
    }

    public void setTraits(List<String> traits) {
        this.traits = traits;
    }

    public List<String> getLanguages() {
        return languages;
    }

    public void setLanguages(List<String> languages) {
        this.languages = languages;
    }
    
    
    
}

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
public interface Stats {
    public Map<String, Integer> getStats();
    public void rollStats();
    public int getStat(String stat);
    public void setStat(String stat, int value);
}

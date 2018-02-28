/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.domain.tests;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import tools.domain.DnDStats;

/**
 *
 * @author Mathias
 */
public class DnDStatsTests {
    
    public DnDStatsTests() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    // @Test
    // public void hello() {}
    @Test
    public void testStats()
    {
        DnDStats stats = new DnDStats();
        for(int i = 0; i<100000; i++)
        {
            stats.rollStats();
            stats.getStats().entrySet().forEach((pair) ->{
                assertTrue(pair.getValue()>=3);
                assertTrue(pair.getValue()<=18);
            });
            
        }
    }
}

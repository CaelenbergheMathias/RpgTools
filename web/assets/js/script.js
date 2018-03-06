const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
let char;
class DnDCharacter {
    setRace() {
        let x;
        this.race = races.find(x => x.name === $("#race").val());
        $("#speed").val(this.race.speed);
        loadSubRaces();
        this.setSubRace();
    }
    setSubRace() {
        let x;
        let subrace = subRaces.find(x => x.name === $("#subrace").val());
        console.log(subrace);
        this.subrace = subrace === undefined ? "none" : subrace;
        for (x in this.stats) {
            this.applyValue(x);
        }
    }
    setClass() {
        this.class = classes.find(x => x.name === $("#class").val());
        this.setHitPoints();
    }
    setAC() {
    }
    calculatMod(stat) {
        return Math.floor((stat - 10) / 2);
    }
    constructor(name) {
        this.name = name;
        this.setRace();
        this.stats = {
            STR: 0,
            DEX: 0,
            CON: 0,
            INT: 0,
            WIS: 0,
            CHA: 0
        };
        this.rollStats();
        this.setClass();
        this.setAC();
    }
    rollDice() {
        let numbers = [];
        for (let i = 0; i < 4; i++) {
            numbers.push(dice.rollD6());
        }
        numbers.sort();
        numbers.reverse();
        return numbers[0] + numbers[1] + numbers[2];
    }
    applyValue(x) {
        let value = this.stats[x];
        let index = abilities.indexOf(x);
        let bonus = this.race.ability_bonuses[index];
        if (this.subrace !== "none") {
            bonus += this.subrace.ability_bonuses[index];
        }
        let mod = this.calculatMod(value + bonus);
        $("#" + x).val(value);
        $("#" + x + "BONUS").html("Bonus: " + bonus);
        $("#" + x + "MOD").html("mod: " + mod);
    }
    setHitPoints() {
        let CON = this.stats["CON"];
        let health = this.calculatMod(CON);
        console.log(this.class);
        health += this.class.hit_die;
        console.log(health);
        $("#max_hp").val(health);
    }
    rollStats() {
        let x;
        console.log(this);
        for (x in this.stats) {
            this.stats[x] = this.rollDice();
            this.applyValue(x);
        }
    }
}
function makeOptions(x) {
    return "<option value='" + x.name + "'>" + x.name + "</option>";
}
function loadClasses() {
    let options = "";
    classes.forEach(x => options += makeOptions(x));
    $("#class").html(options);
}
function loadRaces() {
    let options = "";
    races.forEach(x => options += makeOptions(x));
    $("#race").html(options);
}
function loadSubRaces() {
    let options = "<option value='none'>none</option>";
    let index = $("#race :selected").val();
    let race = subRaces.filter(x => x.race.name === index);
    race.forEach((x) => options += makeOptions(x));
    $("#subrace").html(options);
}
function loadSubClasses() {
    let options = "<option value='none'>none</option>";
    let index = $("#class :selected").val();
    let subclass = subclasses.filter(x => x.class.name === index);
    console.log(subclass);
    subclass.forEach((x) => options += makeOptions(x));
    $("#subclass").html(options);
}
function loadData() {
    loadClasses();
    loadSubClasses();
    loadRaces();
    loadSubRaces();
}
function rollStats() {
    char.rollStats();
    char.setHitPoints();
}
function applyRaceChanges() {
    char.setRace();
}
function applySubRaceChanges() {
    char.setSubRace();
}
function applyClassChanges() {
    loadSubClasses();
    char.setClass();
}
$(document).ready(function () {
    loadData();
    char = new DnDCharacter("");
    $("#race").on("change", applyRaceChanges);
    $("#subrace").on("change", applySubRaceChanges);
    $("#class").on("change", applyClassChanges);
    $("fieldset:nth-of-type(2) button").click(rollStats);
});
//# sourceMappingURL=script.js.map
const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
class DnDCharacter {
    getStats() {
        return this.stats;
    }
    calculatMod(stat) {
        return Math.floor((stat - 10) / 2);
    }
    constructor(name) {
        this.name = name;
        this.race = races.find(x => x.name === $("#race").val());
        let subrace = subRaces.find(x => x.name === $("#subrace").val);
        this.subrace = subrace === undefined ? "none" : subrace;
        this.stats = {
            STR: 0,
            DEX: 0,
            CON: 0,
            INT: 0,
            WIS: 0,
            CHA: 0
        };
        this.rollStats();
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
    rollStats() {
        let x;
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
function applyRace() {
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
$(document).ready(function () {
    loadData();
    let char = new DnDCharacter("");
    $("#race").on("change", loadSubRaces);
    $("#class").on("change", loadSubClasses);
    console.log(char);
    $("fieldset:nth-of-type(2) button").on("click", char.rollStats);
});
//# sourceMappingURL=script.js.map
;
const cacheAvaible = 'caches' in self;
const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
let char;
class DnDCharacter {
    constructor() {
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
        this.setLevel();
        this.setSubClass();
        this.setSkills();
    }
    setName() {
        this.name = $("#name").val();
    }
    setSkills() {
        let skillz = [];
        skills.forEach(skill => {
            let name = removeSpaces(skill.name);
            let stat = skill.ability_score.name;
            let index = abilities.indexOf(stat);
            let bonus = this.race.ability_bonuses[index];
            if (this.subrace !== "none") {
                bonus += this.subrace.ability_bonuses[index];
            }
            let mod = this.calculatMod(parseInt($(`#${stat}`).val()) + bonus);
            $(`#${name}`).val(mod);
            skillz.push({ skill: `${name}`, prof: mod, ability_score: stat });
        });
        this.skills = skillz;
    }
    setRace() {
        this.race = races.find(x => x.name === $("#race").val());
        $("#speed").val(this.race.speed);
        loadSubRaces();
        this.setSubRace();
    }
    setSubRace() {
        let subrace = subRaces.find(x => x.name === $("#subrace").val());
        this.subrace = subrace === undefined ? "none" : subrace;
        let x;
        for (x in this.stats) {
            this.applyValue(x);
        }
    }
    setClass() {
        this.class = classes.find(x => x.name === $("#class").val());
        this.setHitPoints();
    }
    setSubClass() {
        let subclass = subclasses.find(x => x.name === $("#subclass").val());
        this.subclass = subclass === undefined ? "none" : subclass;
    }
    setAC() {
    }
    calculatMod(stat) {
        return Math.floor((stat - 10) / 2);
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
        health += this.class.hit_die;
        $("#max_hp").val(health);
    }
    setLevel() {
        this.level = parseInt($("#level").val());
        $("#profbonus").val(Math.floor((this.level + 7) / 4));
    }
    rollStats() {
        let x;
        for (x in this.stats) {
            this.stats[x] = this.rollDice();
            this.applyValue(x);
        }
    }
}
function removeSpaces(string) {
    let newstring = string.split(" ");
    return newstring.join("");
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
    subclass.forEach((x) => options += makeOptions(x));
    $("#subclass").html(options);
}
function loadSkills() {
    let string = "<legend>Skills</legend>";
    skills.forEach(skill => {
        let name = removeSpaces(skill.name);
        let regularname = skill.name;
        let stat = skill.ability_score.name;
        string += `<div><input type="checkbox" id="#${name}checkbox" name="#${name}checkbox"/>`;
        string += `<input disabled="disabled" type='number' name='${name}' id='${name}' />`;
        string += `<label for='${name}'>${regularname} (${stat})</label></div>`;
    });
    $("#skills").html(string);
}
function loadData() {
    loadClasses();
    loadSubClasses();
    loadRaces();
    loadSubRaces();
    loadSkills();
}
function rollStats() {
    char.rollStats();
    char.setHitPoints();
    char.setSkills();
}
function applyRaceChanges() {
    char.setRace();
    char.setSkills();
}
function applySubRaceChanges() {
    char.setSubRace();
    char.setSkills();
}
function applyClassChanges() {
    loadSubClasses();
    char.setClass();
}
function applyLevelChange() {
    char.setLevel();
    char.setSkills();
}
function applySubClassChanges() {
    char.setSubClass();
}
function addToLocalForage(e) {
    e.preventDefault();
    let name = $("#name").val();
    console.log(name);
    char.setName();
    localforage.getItem("chars").then(function (value) {
        if (value === null) {
            let array = [char];
            localforage.setItem("chars", array);
        }
        else {
            let filtered = value.filter(function (x) {
                return x.name === name;
            });
            console.log(filtered.length);
            if (filtered.length <= 0) {
                value.push(char);
            }
            else if (confirm("A Character With this name already exists do you want to overwrite it?")) {
                let index = value.indexOf(filtered[0]);
                value[index] = char;
            }
            localforage.setItem("chars", value);
        }
    });
}
$(document).ready(function () {
    loadData();
    char = new DnDCharacter();
    $("#race").on("change", applyRaceChanges);
    $("#subrace").on("change", applySubRaceChanges);
    $("#level").on("change", applyLevelChange);
    $("#class").on("change", applyClassChanges);
    $("#subclass").on("change", applySubClassChanges);
    $("input[type=submit]").on("click", addToLocalForage);
});
//# sourceMappingURL=DnD.js.map
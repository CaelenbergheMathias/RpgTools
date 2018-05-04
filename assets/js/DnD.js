var set = Reflect.set;
const cacheAvaible = 'caches' in self;
const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
let char;
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
        string += `<div><input type="checkbox" id="${name}checkbox" name="${name}checkbox"/>`;
        string += `<input disabled="disabled" type='number' name='${name}' id='${name}' />`;
        string += `<label for='${name}'>${regularname} (${stat})</label></div>`;
    });
    $("#skills").html(string);
}
function setCharacter(tofindchar) {
    localforage.getItem("dndchars").then(function (value) {
        let otherchar = value.find(function (dndchar) {
            return dndchar.name === tofindchar;
        });
        char.stats = otherchar.stats;
        char.name = otherchar.name;
        char.level = otherchar.level;
        char.race = otherchar.race;
        char.subrace = otherchar.subrace;
        char.class = otherchar.class;
        char.skills = otherchar.skills;
        setStats();
        applyAll();
        console.log(char);
    }).catch(function (err) {
        console.log(err);
    });
}
function loadCharacter() {
    let tofindchar = $("#madechars").val();
    if (tofindchar !== "nc") {
        setCharacter(tofindchar);
    }
}
function setStats() {
    for (let k in char.stats) {
        char.applyStats(k);
    }
}
function loadData() {
    loadClasses();
    loadSubClasses();
    loadRaces();
    loadSubRaces();
    loadSkills();
    localforage.getItem("dndchars").then(function (value) {
        if (value !== null) {
            value.forEach(function (char) {
                $("#madechars").append(`<option value="${char.name}">${char.name}</option>`);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
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
function applyAll() {
    char.setHitPoints();
    char.setClass();
    char.setSubClass();
    char.setRace();
    char.setSubRace();
    char.setSkills();
}
function applyCheck() {
    char.setSkills();
}
function addToLocalForage(e) {
    e.preventDefault();
    let name = $("#name").val();
    console.log(name);
    char.setName();
    localforage.getItem("dndchars").then(function (value) {
        if (value === null) {
            let array = [char];
            localforage.setItem("dndchars", array);
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
            localforage.setItem("dndchars", value);
        }
    });
}
$(document).ready(function () {
    loadData();
    char = new DnDCharacter();
    char.rollStats();
    $("#reroll").on("click", rollStats);
    $("#race").on("change", applyRaceChanges);
    $("#subrace").on("change", applySubRaceChanges);
    $("#level").on("change", applyLevelChange);
    $("#class").on("change", applyClassChanges);
    $("#subclass").on("change", applySubClassChanges);
    $("input[type=checkbox]").on("change", applyCheck);
    $("#madechars").on("change", loadCharacter);
    console.log(char);
    $("input[type=submit]").on("click", addToLocalForage);
});
//# sourceMappingURL=DnD.js.map
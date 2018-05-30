class DnDCharacter {
    constructor() {
        this.hp = [];
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
        this.setStartingAC();
        this.setLevel();
        this.setSubClass();
        this.setSkills();
        this.initiative = this.calculatMod(this.stats["DEX"]);
        $("#initiative").val(this.initiative);
    }
    copyChar(otherchar) {
        this.stats = otherchar.stats;
        this.name = otherchar.name;
        this.level = otherchar.level;
        this.race = otherchar.race;
        this.subrace = otherchar.subrace;
        this.class = otherchar.class;
        this.subclass = otherchar.subclass;
        this.skills = otherchar.skills;
        this.alignment = otherchar.alignment;
        this.hp = otherchar.hp;
        this.speed = otherchar.speed;
        this.initiative = otherchar.initiative;
        this.ac = otherchar.ac;
        this.backstory = otherchar.backstory;
        this.bonds = otherchar.bonds;
        this.flaws = otherchar.flaws;
        this.features = otherchar.features;
        this.ptraits = otherchar.ptraits;
        this.cdescription = otherchar.cdescription;
        this.ideals = otherchar.ideals;
    }
    setAlignment() {
        this.alignment = $("#alignment").val();
    }
    fillAlignement() {
        $("#alignment").val(this.alignment);
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
            let checked = document.getElementById(`${name}checkbox`).checked;
            if (this.subrace !== "none") {
                bonus += this.subrace.ability_bonuses[index];
            }
            let mod = this.calculatMod(parseInt($(`#${stat}`).val()) + bonus);
            if (checked) {
                mod += this.calculateProfBonus();
            }
            $(`#${name}`).val(mod);
            skillz.push({ skill: `${name}`, prof: mod, ability_score: stat, checked });
        });
        this.skills = skillz;
    }
    calculateProfBonus() {
        return Math.floor((this.level + 7) / 4);
    }
    setRace() {
        this.race = races.find(x => x.name === $("#race").val());
        $("#speed").val(this.race.speed);
        loadSubRaces();
        this.setSubRace();
    }
    fillRace() {
        $("#race").val(this.race.name);
        loadSubRaces();
    }
    setRaceTraits() {
        let race = races.find(x => x.name === $("#race").val());
        let traits = "";
        console.log(race.traits);
        race.traits.forEach(x => traits += x.name + "\n");
        console.log(traits);
        this.race.traits = traits;
        this.race.languages = race.language_desc;
        console.log();
        this.fillTraits();
        this.fillLanguages();
    }
    setSubRace() {
        let subrace = subRaces.find(x => x.name === $("#subrace").val());
        this.subrace = subrace === undefined ? "none" : subrace;
        let x;
        for (x in this.stats) {
            this.applyStats(x);
        }
    }
    fillSubrace() {
        if (this.subrace !== "none") {
            $("#subrace").val(this.subrace.name);
        }
        else {
            $("#subrace").val("none");
        }
    }
    changeStats(stat, value) {
        this.stats[stat] = value;
        this.applyStats(stat);
    }
    setClass() {
        this.class = classes.find(x => x.name === $("#class").val());
        this.setHitPoints();
    }
    fillClass() {
        $("#class").val(this.class.name);
    }
    setSubClass() {
        let subclass = subclasses.find(x => x.name === $("#subclass").val());
        this.subclass = subclass === undefined ? "none" : subclass;
    }
    fillSubclass() {
        if (this.subclass !== "none") {
            $("#subclass").val(this.subclass.name);
        }
        else {
            $("#subclass").val("none");
        }
    }
    setAc() {
        this.ac = parseInt($("#ac").val());
    }
    fillAc() {
        $("#ac").val(this.ac);
    }
    setStartingAC() {
        let ac = 10 + this.calculatMod(this.stats["DEX"]);
        if (this.class.name === ("Barbarian" || "Monk")) {
            ac += this.calculatMod(this.stats["CON"]);
        }
        this.ac = ac;
        $("#ac").val(ac);
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
    setInitiative() {
        this.initiative = this.calculatMod(this.stats["DEX"]);
    }
    fillInitiative() {
        $("#initiative").val(this.calculatMod(this.stats["DEX"]));
    }
    setSpeed() {
        this.speed = parseInt($("#speed").val());
    }
    fillSpeed() {
        $("#speed").val(this.speed);
    }
    applyStats(x) {
        let value = this.stats[x];
        let index = abilities.indexOf(x);
        let bonus = this.race.ability_bonuses[index];
        if (this.subrace !== "none") {
            bonus += this.subrace.ability_bonuses[index];
        }
        let mod = this.calculatMod(value + bonus);
        if (x === "DEX") {
            this.initiative = mod;
        }
        $("#" + x).val(value);
        $("#" + x + "BONUS").html("Bonus: " + bonus);
        $("#" + x + "MOD").html("mod: " + mod);
    }
    changeMaxHealth(health) {
        this.hp[0] = health;
    }
    changeCurrentHealth(health) {
        if (health <= this.hp[0]) {
            this.hp[1] = health;
        }
        else {
            $("#cur_hp").val(this.hp[0]);
        }
    }
    setHitPoints() {
        let CON = this.stats["CON"];
        let health = this.calculatMod(CON);
        health += this.class.hit_die;
        this.changeMaxHealth(health);
        this.changeCurrentHealth(health);
        $("#max_hp").val(health);
        $("#cur_hp").val(health);
    }
    fillMaxHP() {
        $("#max_hp").val(this.hp[0]);
    }
    fillCurHP() {
        $("#cur_hp").val(this.hp[1]);
    }
    setLevel() {
        this.level = parseInt($("#level").val());
        $("#profbonus").val(this.calculateProfBonus());
    }
    fillLevel() {
        $("#level").val(this.level);
        $("#profbonus").val(this.calculateProfBonus());
    }
    rollStats() {
        let x;
        for (x in this.stats) {
            this.stats[x] = this.rollDice();
            this.applyStats(x);
        }
    }
    setBackstory() {
        this.backstory = $("#backstory").val();
    }
    fillBackstory() {
        $("#backstory").val(this.backstory);
    }
    setBonds() {
        this.bonds = $("#bonds").val();
    }
    fillBonds() {
        $("#bonds").val(this.bonds);
    }
    setFlaws() {
        this.flaws = $("#flaws").val();
    }
    fillFlaws() {
        $("#flaws").val(this.flaws);
    }
    setIdeals() {
        console.log($("#ideals").val());
        this.ideals = $("#ideals").val();
        console.log(this.ideals);
    }
    fillIdeals() {
        $("#ideals").val(this.ideals);
        console.log(this.ideals);
    }
    setFeatures() {
        this.features = $("#cfeatures").val();
    }
    fillFeatures() {
        $("#cfeatures").val(this.features);
    }
    setLanguages() {
        this.race.languages = $("#languages").val();
    }
    fillLanguages() {
        $("#languages").val(this.race.languages);
    }
    setPersonalityTraits() {
        this.ptraits = $("#personalitytraits").val();
    }
    fillPersonalityTraits() {
        $("#personalitytraits").val(this.ptraits);
    }
    setTraits() {
        this.race.traits = $("#racetraits").val();
    }
    fillTraits() {
        $("#racetraits").val(this.race.traits);
    }
    setCharacterDescription() {
        this.cdescription = $("#description").val();
    }
    fillCharacterDescription() {
        $("#description").val(this.cdescription);
    }
}
//# sourceMappingURL=DnDCharacter.js.map
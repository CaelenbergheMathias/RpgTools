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
//# sourceMappingURL=DnDCharacter.js.map
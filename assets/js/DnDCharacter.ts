class DnDCharacter {
    public name: string;
    public level: number;
    public stats: any;
    public race: any;
    public subrace: any;
    public class: any;
    public subclass: any;
    public skills: any[];
    public alignment: string;
    public hp: number[] = [];
    public speed: number;
    public initiative: number;
    public ac: number;

    public constructor() {

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


    public setName() {
        this.name = $("#name").val();
    }

    public setSkills() {
        let skillz: object[] = [];
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
            skillz.push({skill: `${name}`, prof: mod, ability_score: stat})

        });
        this.skills = skillz;
    }

    public calculateProfBonus(): number {
        return Math.floor((this.level + 7) / 4)
    }

    public setRace() {

        this.race = races.find(x => x.name === $("#race").val());
        $("#speed").val(this.race.speed);
        loadSubRaces();
        this.setSubRace();


    }

    public setSubRace() {

        let subrace = subRaces.find(x => x.name === $("#subrace").val());
        //console.log(subrace)
        this.subrace = subrace === undefined ? "none" : subrace;
        let x: string;
        for (x in this.stats) {

            //console.log(x+": "+this.stats[x]);
            this.applyStats(x);
        }

    }

    public changeStats(stat: string, value: number) {
        this.stats[stat] = value;
        this.applyStats(stat);
    }

    public setClass() {
        this.class = classes.find(x => x.name === $("#class").val());
        this.setHitPoints();

    }

    public setSubClass() {
        let subclass = subclasses.find(x => x.name === $("#subclass").val());

        this.subclass = subclass === undefined ? "none" : subclass;
    }

    public setAc()
    {
        this.ac = parseInt($("#ac").val());
    }

    public setStartingAC() {
        let ac = 10 + this.calculatMod(this.stats["DEX"]);
        if(this.class.name === ("Barbarian" || "Monk" ))
        {
            ac += this.calculatMod(this.stats["CON"]);
        }

        this.ac = ac;
        $("#ac").val(ac);


    }

    private calculatMod(stat: number): number {
        return Math.floor((stat - 10) / 2);
    }

    private rollDice(): number {
        let numbers = [];
        for (let i: number = 0; i < 4; i++) {
            numbers.push(dice.rollD6());
        }
        numbers.sort();
        numbers.reverse();
        return numbers[0] + numbers[1] + numbers[2];

    }

    public setInitiative()
    {
        this.initiative = parseInt($("#initiative").val())
    }

    public applyStats(x: string) {


        let value = this.stats[x];
        //console.log(value);

        let index = abilities.indexOf(x);
        let bonus = this.race.ability_bonuses[index];
        if (this.subrace !== "none") {
            bonus += this.subrace.ability_bonuses[index];
        }
        let mod = this.calculatMod(value + bonus);
        if(x === "DEX")
        {
            this.initiative = mod;
        }
        $("#" + x).val(value);
        $("#" + x + "BONUS").html("Bonus: " + bonus);
        $("#" + x + "MOD").html("mod: " + mod)

    }

    public changeMaxHealth(health: number) {
        this.hp[0] = health;
    }

    public changeCurrentHealth(health: number) {
        if (health <= this.hp[0]) {
            this.hp[1] = health;
        }
        else {
            $("#cur_hp").val(this.hp[0]);
        }
    }

    public setHitPoints() {
        let CON = this.stats["CON"];
        let health = this.calculatMod(CON);

        //console.log(this.class)
        health += this.class.hit_die;
        this.changeMaxHealth(health);
        this.changeCurrentHealth(health);
        //console.log(health);
        $("#max_hp").val(health);
        $("#cur_hp").val(health);
    }

    public setLevel() {
        this.level = parseInt($("#level").val());
        $("#profbonus").val(this.calculateProfBonus());
    }

    public rollStats(): void {


        let x: string;
        //console.log(this);
        for (x in this.stats) {
            this.stats[x] = this.rollDice();
            //console.log(x+": "+this.stats[x]);
            this.applyStats(x);
        }

    }

}
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
    public backstory:string;
    public ptraits:string;
    public bonds:string;
    public ideals:string;
    public flaws:string;
    public features:string;



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

    public copyChar(otherchar:DnDCharacter)
    {
        this.stats = otherchar.stats;
        this.name = otherchar.name;
        this.level =otherchar.level;
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
    }

    public setAlignment()
    {
        this.alignment = $("#alignment").val();
    }

    public fillAlignement()
    {
        $("#alignment").val(this.alignment);
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
            skillz.push({skill: `${name}`, prof: mod, ability_score: stat, checked})

        });
        this.skills = skillz;
    }

    public calculateProfBonus(): number {
        return Math.floor((this.level + 7) / 4)
    }

    public setRace() {


        this.race = races.find(x => x.name === $("#race").val());

        //races.forEach(x => x.name === )
        $("#speed").val(this.race.speed);
        loadSubRaces();
        this.setSubRace();


    }

    public fillRace()
    {
        $("#race").val(this.race.name);
        loadSubRaces();
    }

    public setRaceTraits()
    {
        let race = races.find(x => x.name === $("#race").val());
        let traits = "";
        console.log(race.traits);
        race.traits.forEach(x =>  traits += x.name+ "\n");
        console.log(traits);
        this.race.traits = traits;

        this.race.languages = race.language_desc;
        console.log()
        this.fillTraits();
        this.fillLanguages();
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

    public fillSubrace()
    {
        $("#subrace").val(this.subrace.name);
    }

    public changeStats(stat: string, value: number) {
        this.stats[stat] = value;
        this.applyStats(stat);
    }

    public setClass() {
        this.class = classes.find(x => x.name === $("#class").val());

        this.setHitPoints();

    }

    public fillClass()
    {
        $("#class").val(this.class.name);
    }

    public setSubClass() {
        let subclass = subclasses.find(x => x.name === $("#subclass").val());

        this.subclass = subclass === undefined ? "none" : subclass;
    }

    public fillSubclass(){
        $("#subclass").val(this.subclass.name);
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

    public setBackstory()
    {
        this.backstory = $("#backstory").val();
    }

    public fillBackstory()
    {
        $("#backstory").val(this.backstory);
    }

    public setBonds()
    {
        this.bonds = $("#bonds").val();
    }

    public fillBonds()
    {
        $("#bonds").val(this.bonds);
    }

    public setFlaws()
    {
        this.flaws = $("#flaws").val();
    }

    public fillFlaws()
    {
        $("#flaws").val(this.flaws);
    }

    public setIdeals()
    {
        this.ideals = $("#ideals").val();
    }

    public fillIdeals()
    {
        $("#ideals").val(this.ideals);
    }

    public setFeatures()
    {
        this.features = $("#cfeatures").val();
    }

    public fillFeatures()
    {
        $("#cfeatures").val(this.features);
    }

    public setLanguages()
    {
        this.race.languages = $("#languages").val();
    }

    public fillLanguages()
    {
        $("#languages").val(this.race.languages);
    }

    public setPersonalityTraits()
    {
        this.ptraits = $("#personalitytraits").val();
    }

    public fillPersonalityTraits()
    {
        $("#personalitytraits").val(this.ptraits);
    }

    public setTraits()
    {
        this.race.traits = $("#racetraits").val();
    }

    public fillTraits()
    {
        $("#racetraits").val(this.race.traits);
    }

}
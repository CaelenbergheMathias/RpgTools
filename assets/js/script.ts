/// <reference path ="../typings/jquery/index.d.ts"/>


const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
let char: DnDCharacter;

class DnDCharacter {
    private name: string;
    private level: number;
    private stats: any;
    private race: any;
    private subrace: any;
    private class: any;
    private subclass: any;
    private skills:any[];

    public constructor(name: string) {
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
        this.setLevel();
        this.setSubClass();
        this.setSkills()

    }

    public setSkills()
    {
        let skillz:object[] = [];
        skills.forEach(skill =>{
            let name = removeSpaces(skill.name);
            let stat = skill.ability_score.name;
            let index = abilities.indexOf(stat);
            let bonus = this.race.ability_bonuses[index];
            if (this.subrace !== "none") {
                bonus += this.subrace.ability_bonuses[index];
            }

            let mod = this.calculatMod(parseInt($(`#${stat}`).val()) + bonus);


            $(`#${name}`).val(mod);
            skillz.push({skill: `${name}`, prof: mod, ability_score: stat})

        });
        this.skills = skillz;
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
            this.applyValue(x);
        }

    }

    public setClass() {
        this.class = classes.find(x => x.name === $("#class").val());
        this.setHitPoints();

    }

    public setSubClass() {
        let subclass = subclasses.find(x => x.name === $("#subclass").val());

        this.subclass = subclass === undefined ? "none" : subclass;
    }

    public setAC() {

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

    public applyValue(x: string) {
        let value = this.stats[x];


        let index = abilities.indexOf(x);
        let bonus = this.race.ability_bonuses[index];
        if (this.subrace !== "none") {
            bonus += this.subrace.ability_bonuses[index];
        }
        let mod = this.calculatMod(value + bonus);
        $("#" + x).val(value);
        $("#" + x + "BONUS").html("Bonus: " + bonus);
        $("#" + x + "MOD").html("mod: " + mod)

    }

    public setHitPoints() {
        let CON = this.stats["CON"];
        let health = this.calculatMod(CON);

        //console.log(this.class)
        health += this.class.hit_die;
        //console.log(health);
        $("#max_hp").val(health);
    }

    public setLevel() {
        this.level = parseInt($("#level").val());
        $("#profbonus").val(Math.floor((this.level+7)/4))
    }


    public rollStats(): void {


        let x: string;
        //console.log(this);
        for (x in this.stats) {
            this.stats[x] = this.rollDice();
            //console.log(x+": "+this.stats[x]);
            this.applyValue(x);
        }

    }


}

function removeSpaces(string: string) {
    let newstring: string[] = string.split(" ");

    //console.log(newstring);
    return newstring.join("");

}


function makeOptions(x: any) {
    return "<option value='" + x.name + "'>" + x.name + "</option>";
}

function loadClasses() {

    let options: string = "";
    classes.forEach(x => options += makeOptions(x));
    //console.log(options);
    $("#class").html(options)
}

function loadRaces() {
    let options: string = "";
    races.forEach(x => options += makeOptions(x));
    $("#race").html(options)


}

function loadSubRaces() {
    let options: string = "<option value='none'>none</option>";
    let index: string = $("#race :selected").val();
    let race = subRaces.filter(x => x.race.name === index);
    //console.log(race);
    race.forEach((x: object) => options += makeOptions(x));
    $("#subrace").html(options);

}

function loadSubClasses() {
    let options: string = "<option value='none'>none</option>";
    let index: string = $("#class :selected").val();
    let subclass = subclasses.filter(x => x.class.name === index);
    //console.log(subclass);

    subclass.forEach((x: object) => options += makeOptions(x));
    $("#subclass").html(options);
}

function loadSkills()
{
    let string = "<legend>Skills</legend>";
    skills.forEach(skill => {
        let name = removeSpaces(skill.name);
        let regularname = skill.name;
        let stat = skill.ability_score.name;
        string += `<div><input type="checkbox" id="#${name}checkbox" name="#${name}checkbox"/>`;
        string += `<input disabled="disabled" type='number' name='${name}' id='${name}' />`;
        string += `<label for='${name}'>${regularname} (${stat})</label></div>`;

    });
    //console.log(string);

    $("#skills").html(string)
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
    char.setSkills()
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
    //console.log(char);
}

function applySubClassChanges() {
    char.setSubClass();
    //console.log(char);
}

$(document).ready(function () {

    loadData();
    char = new DnDCharacter("");
    $("#race").on("change", applyRaceChanges);
    $("#subrace").on("change", applySubRaceChanges);
    $("#level").on("change", applyLevelChange);
    $("#class").on("change", applyClassChanges);
    $("#subclass").on("change", applySubClassChanges);
    console.log(char);
    $("fieldset:nth-of-type(2) button").click(rollStats)

});
/// <reference path ="../typings/jquery/index.d.ts"/>
const abilities = ["STR","DEX","CON","INT","WIS","CHA"];

class DnDCharacter {
    private name: string;
    private stats: any;
    private race: any;
    private subrace: any;

    public getStats(): any {
        return this.stats;
    }

    private calculatMod(stat: number): number {
        return Math.floor((stat - 10) / 2);
    }

    public constructor(name: string) {
        this.name = name;
        this.race = races.find(x => x.name === $("#race").val());
        let subrace = subRaces.find(x => x.name === $("#subrace").val);
        this.subrace = subrace===undefined? "none":subrace;
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
        if(this.subrace !== "none")
        {
            bonus += this.subrace.ability_bonuses[index];
        }
        let mod = this.calculatMod(value+bonus);
        $("#" + x).val(value);
        $("#"+x+"BONUS").html("Bonus: "+bonus);
        $("#" + x + "MOD").html("mod: " + mod)
    }


    public rollStats(): void {
        let x: string;

        for (x in this.stats) {
            this.stats[x] = this.rollDice();

            this.applyValue(x);
        }
    }

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

function applyRace() {

}

function loadSubClasses() {
    let options: string = "<option value='none'>none</option>";
    let index: string = $("#class :selected").val();
    let subclass = subclasses.filter(x => x.class.name === index);
    console.log(subclass);

    subclass.forEach((x: object) => options += makeOptions(x));
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
    console.log(char)
    $("fieldset:nth-of-type(2) button").on("click", char.rollStats)

});
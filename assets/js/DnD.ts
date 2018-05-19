/// <reference path ="../typings/jquery/index.d.ts"/>
/// <reference path ="../typings/localforage/localforage.d.ts"/>

import set = Reflect.set;

const cacheAvaible = 'caches' in self;
const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
let char: DnDCharacter;

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
    let string = "";
    skills.forEach(skill => {
        let name = removeSpaces(skill.name);
        let regularname = skill.name;
        let stat = skill.ability_score.name;
        string += `<div><input type="checkbox" id="${name}checkbox" name="${name}checkbox"/>`;
        string += `<input disabled="disabled" type='number' name='${name}' id='${name}' />`;
        string += `<label for='${name}'>${regularname} (${stat})</label></div>`;

    });
    //console.log(string);

    $("#skills").html(string)
}

function setCharacter(tofindchar:string)
{


        localforage.getItem("dndchars").then(function (value: DnDCharacter[]) {
            let otherchar = value.find(function (dndchar) {
                return dndchar.name === tofindchar;
            });
            char.stats = otherchar.stats;
            char.name = otherchar.name;
            char.level =otherchar.level;
            char.race = otherchar.race;
            char.subrace = otherchar.subrace;
            char.class = otherchar.class;
            char.subclass = otherchar.subclass;
            char.skills = otherchar.skills;
            char.alignment=otherchar.alignment;
            char.hp = otherchar.hp;
            char.speed = otherchar.speed;
            char.initiative = otherchar.initiative;
            char.ac = otherchar.ac;
            char.backstory = otherchar.backstory;

            setStats();
            applyAll();

            console.log(char);




        }).catch(function (err:object) {
            console.log(err);
        });

}

function loadCharacter()
{
    let tofindchar = $("#madechars").val();
    if(tofindchar!=="nc") {
        setCharacter(tofindchar);


        document.getElementById("name").value = tofindchar;
    }
}

function changeStats()
{
    for(let k in char.stats){
        let value:number = parseInt($(`#${k}`).val());
        console.log(k);
        console.log(value);
        char.changeStats(k,value);
    }
    char.setSkills();
    char.setAc();
    char.changeMaxHealth(parseInt($("#max_hp").val()));
    char.changeCurrentHealth(parseInt($("#cur_hp").val()));
    char.setInitiative();
}

function setStats()
{
    for(let k in char.stats)
    {

        char.applyStats(k);
    }



}

function getCharacterOptions()
{
    localforage.getItem("dndchars").then(function (value:DnDCharacter[]) {
        $("#madechars").empty();
        $("#madechars").append("<option value=\"nc\">New Character</option>");
        if(value !== null) {
            value.forEach(function (char) {
                $("#madechars").append(`<option value="${char.name}">${char.name}</option>`);
            })
        }

    }).catch(function (err:object) {
        console.log(err);
    });
}

function loadData() {
    loadClasses();
    loadSubClasses();
    loadRaces();
    loadSubRaces();
    loadSkills();
    getCharacterOptions();
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

function applyAll()
{
    //char.setHitPoints();
    char.setClass();
    char.setSubClass();

    char.setRace();
    char.setSubRace();
    char.setSkills();
}

function applyCheck()
{
    char.setSkills();
}

function hideReveal(e:any)
{
    e.preventDefault();

    $(`#${removeSpaces(this.text.toLocaleLowerCase())}`).toggle(1000);
    console.log()

}

function addToLocalForage(e:Event)
{
    e.preventDefault();
    let name:string = $("#name").val();
    //console.log(name);
    char.setName();
    char.setBackstory();
    char.setAlignment();
    localforage.getItem("dndchars").then(function (value:DnDCharacter[]) {
        if(value===null)
        {

            let array = [char];
            localforage.setItem("dndchars",array);
        }
        else{
            let filtered = value.filter(function (x) {
                return x.name === name;
            });
            console.log(filtered.length);
            console.log(char);
            if(filtered.length<=0)
            {

                value.push(char);
            }
            else if(confirm("A Character With this name already exists do you want to overwrite it?"))
            {
                let index = value.indexOf(filtered[0]);

                value[index] = char;
            }
            localforage.setItem("dndchars",value);

        }
    }).then(getCharacterOptions);

}

$(document).ready(function () {

    loadData();
    char = new DnDCharacter();

    $("#reroll").on("click", rollStats);
    $("#race").on("change", applyRaceChanges);
    $("#subrace").on("change", applySubRaceChanges);
    $("#level").on("change", applyLevelChange);
    $("#class").on("change", applyClassChanges);
    $("#subclass").on("change", applySubClassChanges);
    $("input[type=checkbox]").on("change",applyCheck);
    $("#madechars").on("change",loadCharacter);
    $("input[type=number]").on("change",changeStats);
    $("fieldset>a").on("click",hideReveal);


    $("input[type=submit]").on("click",addToLocalForage);



});
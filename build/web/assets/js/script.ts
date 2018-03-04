/// <reference path ="../typings/jquery/index.d.ts"/>

class DnDCharacter{
    private name:string;
    private stats:object;
    public constructor(name:string)
    {
        this.name = name;
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

    private rollDice():number
    {
        let numbers = [];
        for(let i:number = 0; i<4;i++)
        {
            numbers.push(dice.rollD6());
        }
        numbers.sort();
        numbers.reverse();
        return numbers[0]+numbers[1]+numbers[2];

    }

    private rollStats():void
    {
        let x:string;
        for(x in this.stats)
        {
            let stat:number = this.rollDice();

            this.stats[x] = stat;
        }
    }

}

$(document).ready(function () {

   let char = new DnDCharacter("john");
   console.log(char.stats);
});
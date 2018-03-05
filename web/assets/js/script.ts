/// <reference path ="../typings/jquery/index.d.ts"/>

class DnDCharacter {
    private name: string;
    private stats: any;

    public getStats(): any {
        return this.stats;
    }

    private calculatMod(stat: number):number
    {
        return Math.floor((stat-10)/2);
    }

    public constructor(name: string) {
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

    private rollDice(): number {
        let numbers = [];
        for (let i: number = 0; i < 4; i++) {
            numbers.push(dice.rollD6());
        }
        numbers.sort();
        numbers.reverse();
        return numbers[0] + numbers[1] + numbers[2];

    }

    private rollStats(): void {
        let x: string;
        for (x in this.stats) {
            this.stats[x] = this.rollDice();
            let value = this.stats[x];
            let mod = this.calculatMod(value);

            $("#" + x).val(value);
            $("#"+x+"MOD").html("mod: "+mod)

        }
    }

}

$(document).ready(function () {

    let char = new DnDCharacter("john");

});
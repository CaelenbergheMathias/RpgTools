/// <reference path ="../typings/jquery/index.d.ts"/>
var DnDCharacter = /** @class */ (function () {
    function DnDCharacter(name) {
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
    DnDCharacter.prototype.rollDice = function () {
        var numbers = [];
        for (var i = 0; i < 4; i++) {
            numbers.push(dice.rollD6());
        }
        numbers.sort();
        numbers.reverse();
        return numbers[0] + numbers[1] + numbers[2];
    };
    DnDCharacter.prototype.rollStats = function () {
        var x;
        for (x in this.stats) {
            var stat = this.rollDice();
            this.stats[x] = stat;
        }
    };
    return DnDCharacter;
}());
$(document).ready(function () {
    var char = new DnDCharacter("john");
    console.log(char.stats);
});

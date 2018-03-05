class DnDCharacter {
    getStats() {
        return this.stats;
    }
    calculatMod(stat) {
        return Math.floor((stat - 10) / 2);
    }
    constructor(name) {
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
    rollDice() {
        let numbers = [];
        for (let i = 0; i < 4; i++) {
            numbers.push(dice.rollD6());
        }
        numbers.sort();
        numbers.reverse();
        return numbers[0] + numbers[1] + numbers[2];
    }
    rollStats() {
        let x;
        for (x in this.stats) {
            this.stats[x] = this.rollDice();
            let value = this.stats[x];
            let mod = this.calculatMod(value);
            $("#" + x).val(value);
            $("#" + x + "MOD").html("mod: " + mod);
        }
    }
}
$(document).ready(function () {
    let char = new DnDCharacter("john");
});
//# sourceMappingURL=script.js.map
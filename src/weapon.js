
const weaponJson = require("./../options/weapons");


/**
 *  Weapon carries the effects and maybe stats 
 */
class Weapon
{
    constructor(weaponStruct)
    {
        // "id":4,
        // "name":"spear",
        // "specialAttack": "",
        // "is2handed":0,
        // "payload":[["enableSupport", 1]]

        this.selectIndex = weapon_index;
        this.twoHanded = weaponStruct.is2handed;
        this.name = weaponStruct.name;
        this.specialAttacks = [];
        for (let prop in weaponStruct.specialAttack) 
        {
            //console.log(unitTemplate.specialAttack[label]);
            this.specialAttacks.push(weaponStruct.specialAttack[prop]);
        }

    }

    // add effect to combatMini
    //AddEffects
    
}


exports.Weapon = Weapon;

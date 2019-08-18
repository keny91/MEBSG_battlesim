
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

        this.selectIndex = weaponStruct.id;
        this.twoHanded = weaponStruct.is2handed;
        this.name = weaponStruct.name;
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

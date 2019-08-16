


var DEBUG_ON = 0;

var DEBUG_COMBAT_MINI  = 0;


function ejecutar(algunaFuncion, valor) 
{
    algunaFuncion(valor);
}


//  "options": ["banner","other",25] 
//   [0] Name ; [1] OptionType ;[2] Points
const OptionTypes = {
    weapon: 1,
    equipment: 2,  // or profile
    mount: 3,
    other: 4
}



/**
 * Special attack may have an effect before or after combat.
 */
const specialAttack = 
{
    faint:1,
    backstab:2,
    piercing:3,
    stun:4
}


class Profile
{
    constructor(struct_data)
    {
        this.Mv = struct_data.Mv;
        this.F = struct_data.F;
        this.FR = struct_data.FR;
        this.S = struct_data.S;
        this.D = struct_data.D;
        this.A = struct_data.A;
        this.W = struct_data.W;
        this.C = struct_data.C;

    }
}

class HeroProfile
{
    constructor(struct_data)
    {
        this.Mv = struct_data.Mv;
        this.F = struct_data.F;
        this.FR = struct_data.FR;
        this.S = struct_data.S;
        this.D = struct_data.D;
        this.A = struct_data.A;
        this.W = struct_data.W;
        this.C = struct_data.C;
        this.might = struct_data.m;
        this.will = struct_data.w;
        this.fate = struct_data.f;
    }
}





// read the json and create a template for the unit
class UnitBuilder
{
    constructor(formated_struct)
    {
        this.id = formated_struct.id;
        this.name = formated_struct.name;
        this.labels = [];
        this.options = [];
        
        if(DEBUG_ON)
            console.log("Loading Unit - "+ formated_struct.name);

        // Check all players taking part in the match
        for (let label in formated_struct.labels) {
            //console.log(formated_struct.labels[label]);
            this.labels.push(formated_struct.labels[label]);
        }

        this.profile = formated_struct.profile;
        this.weapons = formated_struct.weapons;
        this.equipment = formated_struct.equipment;
        this.points = formated_struct.points;
        
        for (let i in formated_struct.options) {
            //console.log(formated_struct.labels[label]);
            this.options.push(formated_struct.options[i]);
        }

        this.special = formated_struct.special;
    }
}

class Builder
{
    constructor(json_formated_file)
    {
        this.nof_units = json_formated_file.units.length;
        this.units = [];

        this.index = json_formated_file.index;
        for(var i = 0; i<this.nof_units; i++ )
        {
            this.units.push(new UnitBuilder (json_formated_file.units[i]));
        }
         // contains index reference to unit
          // 

    }


    /* this is supposed to be easily done in the UI, 
    we select the name and then we     
    */
    getUnitTemplate(id)
    {
        if (this.nof_units > 0)
        {
            for(var i = 0; i<this.nof_units; i++ )
            {
                if(this.units[i].id == id)
                    return this.units[i];
                
            }

            // not found
            if(DEBUG_ON)
                console.log("getUnitTemplate - Unit Not found with id "+ id+ " may yet to be defined?");
            return undefined;
        }
        else
        {
            console.warn("There are no units in this list.")
            return undefined;
        }

    }

    /* Similar to getUnitID */
    getIDbyUnitName(name)
    {
        var index_lenght = this.index.length;

        if (index_lenght > 0)
        {
            for(var i = 0; i<index_lenght; i++ )
            {
                let entry = this.index[i];
                if(entry[0] == name)
                    return this.getUnitTemplate(entry[1]);       
            }

        }
        else
        {
            console.warn("Index list is empty.")
        }

        //
        return undefined;
            
    }

}


/**
 * ["spear","weapon",1],
            ["banner","other",25],
            ["warhorn","other",30] 
 */
class Option
{
    constructor(struct_data, id)
    {

        function getUnitTemplate(id)
        {
            if (this.nof_units > 0)
            {
                for(var i = 0; i<this.nof_units; i++ )
                {
                    if(this.units[i].id == id)
                        return this.units[i];
                    
                }
    
                // not found
                if(DEBUG_ON)
                    console.log("getUnitTemplate - Unit Not found with id "+ id+ " may yet to be defined?");
                return undefined;
            }
            else
            {
                console.warn("There are no units in this list.")
                return undefined;
            }
    
        };

        function getIDbyUnitName(name)
        {
            var index_lenght = index.length;
    
            if (index_lenght > 0)
            {
                for(var i = 0; i<index_lenght; i++ )
                {
                    let entry = this.index[i];
                    if(entry[0] == name)
                        return getUnitTemplate(entry[1]);       
                }
    
            }
            else
            {
                console.warn("Index list is empty.")
            }
    
            //
            return undefined;
                
        };



        this.active = false;
        this.id = id;
        this.name = struct_data[0];
        this.optionType = struct_data[1];
        this.pointCost = struct_data[2];
        

 

       // this.effects = struct_data.effects;
       // this.effectIds = []; // ids to identify what effects did the  
    }


    onSelect(theCombatController)
    {
        // verify the controller is valid
        if(theCombatController instanceof CombatController)
        {
            console.error("INVALID CombatController object");
            return;
        }

        if(this.effects == undefined || this.effects == null)
        {
            console.warn("This effect \'"+this.name+ "has no effects");
            return;
        }

        this.effectIds = CombatController.RegisterEffects(this.effects);
        
    }

    // when the option is deselected, we have to remove all effects from the combat phases
    onDeselect()
    {
        // this.effectIds = CombatController.
    }
}




/** Unit is the defined Miniature with all possible loadouts specified.
 *  This is what the engine will interact with
 */
class CombatMiniature
{
    // weapons is an array
    constructor(unitTemplate, id)
    {
        this.labels = [];
        this.options = [];
        this.weapons = [];
        this.name = unitTemplate.name;
        this.id = id;

        this.isSupport = 0; // change to [support?, type]
        this.isSupporting_id = -1; // the mini id that is being supported [] <= I don´t know if this will be required.
        this.isSpear = 0;
        this.isPike = 0; // 2-line support
        this.isHurtable = 0;
        
        this.isMounted = [-1,-1]; // [boolMounted?,MountName]

        
        // Check all players taking part in the match
        for (let label in unitTemplate.labels) {
            //console.log(unitTemplate.labels[label]);
            this.labels.push(unitTemplate.labels[label]);
        }

        this.profile = unitTemplate.profile;
        this.equipment = unitTemplate.equipment;

        for(var i = 0; i < unitTemplate["weapons"].length; i++ )
        {
            this.toogleWeapon(unitTemplate["weapons"][i]); // by default adding weapon
        }

        // this.weapons = unitTemplate["weapons"];
        this.points = unitTemplate.points;
        
        for (let i in unitTemplate.options) {
            //console.log(unitTemplate.labels[label]);
            // create option object
            let opt = new Option(unitTemplate.options[i],i);
            this.options.push(opt);
        }

        this.special = unitTemplate.special;

        // now we work with the dices


        

    }
    

      /**   Payload data will help us track all the consecuences that we will or have enabled with it
       * 
       * @param {[tag1,contentValue1],[tag2,contentValue2]} payloadData     
       * @param{int} Activating or deactivating the option
       */
    parsePayload(payloadData , revert = 0)
    {

        for(var i = 0; i<payloadData.length; i++ )
        {
            let currentData = payloadData[i];
            // parse all options
            switch(currentData[0])
            {
                case "enableSupport":
                    this.isSupport = currentData[1];
                    if(currentData[1] == 1)
                        this.isSpear = !revert;
                    else if (currentData[1] == 2)
                        this.isPike = !revert;
                    else if (currentData[1] == 3 && this.isMounted[0] == 0) // war spear
                        this.isSpear = !revert;
                    else
                        this.isSupport = 0;
                    
                    break;

                
                case "containsWeapon":
                    // we can add multiple weapons
                    for(var j = 0; j<currentData[1].length; j++)
                        {
                            let weapon = currentData[1][j];
                            // create a weapon option that is added as an option (no point cost since it should have been)
                            this.toogleWeapon(weapon,revert);
                        }
                        // remove the current weapon
                        return 2;
                    break;

                default:
                    console.error("Payload Property not defined...");
                    return -1;
                    break;
            }
        }
        return 1;
    }

    /** toogleWeapon
     * 
     * @param {*string} string weapon name as it appears on the official index 
     * @param {*boolean} boolean adding or removing? 
     */
    toogleWeapon(FULLweaponName, remove)
    {
        var weaponProfile;
        var weaponSpecial, weaponName;
        var hasTHEweapon;
        var rc ;


        function HasWeapon(weaponName, weapons)
        {
            for(var i = 0; i<weapons.length; i++ )
            {
                if(weapons[i].name == weaponName)
                    return 1;
            }
            return 0;
        }

        /**
         * 
         * @param {*string} weaponName 
         */
        function FindWeapon(weaponName)
        {
            var jsonRaw = require("./../options/weapons");
            var weaponListIndex = jsonRaw.index;
            for(var i = 0; i<weaponListIndex.length; i++ )
            {
                if(weaponListIndex[i][0] == weaponName)
                {
                    let listIndexId = weaponListIndex[i][1];
                    let listId = jsonRaw.list[i]["id"];
    
                    if(listId != listIndexId)
                    {
                        console.error("Missmatch in Weapons, \""+listId+"\" with listIndex \""+listIndexId+"\"");
                        return -1;
                    }
                    
                    return jsonRaw.list[i];
                }
            }

            // if we get here, it means that we did not found the weapon in the list
            console.error("Weapon \""+weaponName+"\" not found at  \""+"./options/weapons"+"\" ...");
            return -1;
        
        }

        // Are we here to un/equip?

        // Does the unit has such a weapon already?

        // split subfixes to add effect to certain weapons ->  (WeaponName+Subfix)  Wher
        var str = FULLweaponName.split("+");
        // no subfix


        weaponName = str[0];
        if(str.length>1)
            weaponSpecial = str[1];
        // if(str[1] == "")
        //     weaponSpecial = str[1];


        // Find 
        weaponProfile = FindWeapon(weaponName);
        // 
        hasTHEweapon = HasWeapon(weaponName, this.weapons);

        // Statement to admit adding a new weapon
        if(hasTHEweapon && !remove)
        {
            console.error("Weapon \""+weaponName+"\" is already present in "+this.name+". With ID: "+this.id+".");
            return -1; 
        }

        // Statement to admit adding a new weapon
        if(!hasTHEweapon && remove)
        {
            console.error("Weapon \""+weaponName+"\" is NOT present in "+this.name+". With ID: "+this.id+".");
            return -1; 
        }

        // weapon not found - for whatever reason
        if(weaponProfile == -1)
            return -1;
       

        /********************* PARSE WEAPON SPECIAL ******** */

        if(weaponProfile.payload != undefined )
        {
            rc = this.parsePayload(weaponProfile.payload, remove);     
        }

        /* only add the weapon if the payload verifies it 
        *   2  - means that payload does not require the weapon to be added
        *   -1 - error happened
        */
        if (rc != 2 && rc != -1)
        {
            if (remove)
                this.weapons.pop(weaponProfile);
            else
                this.weapons.push(weaponProfile);
        }
            

        return 1;

    }


    /**
     * Given the ID, add the option; Modify value points and add the 
     * [0] Name ; [1] OptionType ;[2] Points
     * @param {When selecting from a menu we will pick the option ID} optionId 
     */
    toogleOption(optionIndex)
    {

        // Common to all types of options
        let theSelectedOption = this.options[optionIndex];
        var jsonRaw;
        var optionListIndex;
        var rc;
        var revert;


        if(optionIndex>this.options.length)
        {
            console.error("Invalid option index \""+optionIndex+"\" in CombatUnit \""+this.name+"\"");
            return 0;
        }
        
        //  NOT IF WE ARE TOOGLING
        if (theSelectedOption.active)
            revert = 1;

        else
            revert = 0;

        // Find the option in the option list, based in the optiontype
        //      Here we give values to the list, opening different jsons depending on the optiontype
        switch(theSelectedOption.optionType)
        {
            case "weapon":

                // turn the option into a weapon struct 
                rc = this.toogleWeapon(theSelectedOption.name, revert);
                
                //
                if(DEBUG_COMBAT_MINI )
                    console.log("add DEBUG info...");

            break;

            case "equippement":
                jsonRaw = require("./../options/equippements");
                optionListIndex = jsonRaw.index;


            break;
        
            case "mount":
                jsonRaw = require("./../options/mounts");
                optionListIndex = jsonRaw.index;

                // if mounted, you gain 1 attack

                // if mount strenhgt > rider_STR
                // change the profile if  "strengthMount > streghtRider"

            break;

            case "other":
            break;

            default:
                console.error("Option type not defined.");
                break;
        }



        // if successfull -> add points
        if(rc)
        {
            this.points += theSelectedOption.pointCost;
            theSelectedOption.active = !theSelectedOption.active;
        }

        return 1;

    }

    
}



exports.Builder = Builder;
exports.UnitBuilder = UnitBuilder;
exports.CombatMiniature = CombatMiniature;
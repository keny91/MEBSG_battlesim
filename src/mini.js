/**
 * These document defines two main instances:
 * 
 * The miniature as an object instance created from a template profile () AND
 * the combat ready unit that will be interacted with during the combat simulation (CombatUnit)
 * 
 * At the moment, the object option is also defined here. 
 */


const weapon = require("./weapon");


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

        this.name = json_formated_file.name;
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
    constructor(unitTemplate, id, army)
    {
        this.labels = [];
        this.options = [];
        this.army = army;
        this.weapons =  new weapon.Weapons(id);  // pass the combat unit Id
        this.name = unitTemplate.name;
        this.id = id;
        

        this.status = new combatUnitStatus();

        this.isSupporting_id = -1;
        this.Mount = [-1,-1]; // [boolMounted?,MountName]

        
        // Check all players taking part in the match
        for (let label in unitTemplate.labels) {
            //console.log(unitTemplate.labels[label]);
            this.labels.push(unitTemplate.labels[label]);
        }

        this.profile = unitTemplate.profile;
        this.equipment = unitTemplate.equipment;

        for(var i = 0; i < unitTemplate["weapons"].length; i++ )
        {
            this.weapons.toogleWeapon(unitTemplate["weapons"][i]); // by default adding weapon
        }

        // this.weapons = unitTemplate["weapons"];
        this.points = unitTemplate.points;
        
        for (let i in unitTemplate.options) {
            let opt = new Option(unitTemplate.options[i],i);
            this.options.push(opt);
        }

        this.special = unitTemplate.special;

        // now we work with the dices


        

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
                rc = this.weapons.toogleWeapon(theSelectedOption.name, revert);
                
                // Debug
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



class combatUnitStatus
{
    constructor()
    {
        this.isProne = 0;
        this.isCharging = 0;
        this.isHurtable = 0;
        this.isSupport = 0;
        this.isPike = 0;
        this.isSpear = 0;
        this.isSupportable = 0;
        this.isMounted = 0;
        this.isInBannerRange = 0;
        this.isBig = 0;
        this.isUnarmed = 0;
        this.isShielding = 0;
        this.isStunned = 0;
        this.isParalyzed = 0;
        this.isTrapped = 0;
        this.hasThrowingWeapon = 0;
        /* This is very subjected to changes in the future */
    }

    /**
     * There are status labels that cannot be active at the same time.
     */
    validateStatusLabels()
    {

    }



}


exports.Builder = Builder;
exports.UnitBuilder = UnitBuilder;
exports.CombatMiniature = CombatMiniature;
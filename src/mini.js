


var DEBUG_ON = 0;


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

class Weapon
{
    constructor(name)
    {

    }

    // add effect to combatMini
    //AddEffects

}


/** Unit is the defined Miniature with all possible loadouts specified.
 *  This is what the engine will interact with
 */
class CombatMiniature
{
    // weapons is an array
    constructor(unitTemplate)
    {
        this.labels = [];
        this.options = [];


        this.isSupporting_id = -1; // the mini id that is being supported
        this.isSpear = -1;
        this.isPike = -1; // 2-line support
        this.isHurtable = -1;

        
        // Check all players taking part in the match
        for (let label in unitTemplate.labels) {
            //console.log(unitTemplate.labels[label]);
            this.labels.push(unitTemplate.labels[label]);
        }

        this.profile = unitTemplate.profile;
        this.equipment = unitTemplate.equipment;
        this.weapons = unitTemplate.weapons;
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
    

      
    //   ejecutar(function(palabra){ console.log(palabra) }, "Hola");

      
    elaborateOptionSelectionList()
    {
        

    }

    /**
     * Given the ID, add the option; Modify value points and add the 
     * [0] Name ; [1] OptionType ;[2] Points
     * @param {When selecting from a menu we will pick the option ID} optionId 
     */
    addOption(optionIndex)
    {
        var optionListIndex;

        if(optionIndex>this.options.length)
        {
            console.error("Invalid option index \""+optionIndex+"\" in CombatUnit \""+this.name+"\"");
            return 0;
        }
        
        let theSelectedOption = this.options[optionIndex];

        // Find the option in the option list, based in the optiontype
        switch(theSelectedOption.optionType)
        {
            case "weapon":
                var weapons = require("./../options/weapons");
                this.points += theSelectedOption.pointCost;
                optionListIndex = weapons.index;
                for(var i = 0; i<this.optionListIndex; i++ )
                {
                    this.units.push(new UnitBuilder (json_formated_file.units[i]));
                }

                this.weapons.push(options[optionListIndex].name);
               

                // find the 

            break;

            case "equippement":
                var equippements = require("./../options/equippements");
                optionListIndex = equippement.index;

            break;
        
            case "mount":
                var equippements = require("./../options/equippements");
                optionListIndex = equippement.index;
                // change the profile if  "strengthMount > streghtRider"

            break;

            case "other":
            break;

            default:
                console.error("Option type not defined.");
                break;
        }

        this.points += pointCost;
        return 1;

    }

    
}



exports.Builder = Builder;
exports.UnitBuilder = UnitBuilder;
exports.CombatMiniature = CombatMiniature;
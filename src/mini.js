





function ejecutar(algunaFuncion, valor) 
{
    algunaFuncion(valor);
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


class Option
{
    constructor(struct_data)
    {
        this.name = struct_data.name;
        this.points = struct_data.points;
        this.effects = struct_data.effects;
        this.effectIds = []; // ids to identify what effects did the  
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
        this.
    }

    // when the option is deselected, we have to remove all effects from the combat phases
    onDeselect()
    {
        this.effectIds = CombatController.
    }
}


class Effect

/** Unit is the defined Miniature with all possible loadouts specified.
 * 
 */
class Miniature
{
    // weapons is an array
    constructor(profile)
    {
        this.basePointValue = profile.basePointValue;
        this.weapons = profile.weapons;
        this.attr = profile.attr;
        this.heroicActions = profile.attr;
        this.special = rules; // clashmen don´t decrease natural 6´s
        this.options = profile.options;
    }
    

      
    //   ejecutar(function(palabra){ console.log(palabra) }, "Hola");

      
    elaborateOptionSelectionList()
    {
        

    }

    /**
     * Given the ID, add the option; Modify value points and add the 
     * @param {When selecting from a menu we will pick the option ID} optionId 
     */
    addOption(optionId)
    {

    }

    
}




const mini = require("./mini");
const dices = require("./rolls");

const debug = 1;
var DEBUG_BATTLE_ADMIN = 1;
var COMBAT_LOG = 0;

// Debugging
if(DEBUG_BATTLE_ADMIN)
{
    /**
     * 
     * @param {*} string 
     */
    function LogProcess(string)
    {
        if (string)
            console.log("\tLogCombat - "+string);
    }

}

if(COMBAT_LOG)
{
        /**
     * This will detail what happens during combat simulation
     * "CombatUnit.name - Rolls 6"
     * "Roll modifier -1 -> Final roll 5"
     * ...
     */
    function CombatLog()
    {
        
        // to be implemented
    }

}


class Roll
{
    constructor(unit, id)
    {
        if(!(unit instanceof mini.CombatMiniature))
        {
            return -1;
        }

        this.strength = unit.profile.F;
        this.combat = unit.profile.S;
        this.specials = -1;
        this.effects = [];
        this.result =  -1;
        this.attackId = id;
        this.unitId = unit.id;
        this.hasElvenWeapon = 0;
        // this will point to the original attackID where this one is duplicated because the target it prone or trapped
        this.linkedAttackTo = -1; 
    }


    rollTheDice()
    {
        this.result = dices.rollD6();
    }

    getUnitId()
    {
        return this.unitId;
    }

    getDiceId()
    {
        return this.attackId;
    }

    getResult()
    {
        return this.result;
    }

    createDuplicate()
    {
        if(!this.combat || !this.strength)
        {
            return -1;
        }
        var Dupe = Object.assign( Object.create( Object.getPrototypeOf(this)), this);
        Dupe.attackId += 1000;
        Dupe.linkedAttackTo = this.attackId;  
        this.linkedAttackTo = Dupe.attackId;
        return Dupe;
    }
}

class Rolls
{



    constructor(Side_)
    {
        this.rolls = null;
        if(!(Side_ instanceof Side))
        {
            return -1;
        }

        this.rolls = this.getRollsFromUnits(Side_);

        // We get this by ordering the Opposite side hurtable units.
        // Depends on which target IA is selected.
        this.targetOrder =[];

        

    }

    getRollsFromUnits(Side_)
    {
        var rolls_ = [];

        // Go over each of 
        for(let i = 0; i < Side_.combatUnits.length; i++ )
        {
            // 
            let unit = Side_.combatUnits[i];

            // create a roll from each attack with the same propertie
            for(let j = 0; j < unit.profile.A; j++)
            {
                rolls_.push(new Roll(unit,j));
            }
        }

        return rolls_;
    
    }

    /** Return all rolls that belong to the specified Id
     * 
     * @param {*} unitId 
     */
    getAllrollesWithID(unitId)
    {
        let rollArray = [];
        for(let i =0; i< this.rolls.length; i++)
        {
            if(this.rolls[i].getUnitId() == unitId)
            {
                rollArray.push(this.rolls[i]);
            }
        }
        return rollArray;
    }

    /**
     * Amongst all the dices rolled in the 
     */
    rerollSingleDice(rollId,unitID)
    {
        for(let i =0; i< this.rolls.length; i++)
        {
            if(this.rolls[i].getUnitId() == unitID && this.rolls[i].getDiceId() == rollId) 
            {
                this.rolls[i].rollTheDice();
            }
        }
    }


    /**
     * For each existing role, another will created and both will be linked so both will be directed to the same target.
     * This is meant for the prone/trapped mechanic when we are rolling to hurt.
     */
    duplicateRolls()
    {
        var arr_size = this.rolls.length;
        var add_count = 0;
        // check all rolls
        for(let i = 0; i<arr_size; i++)
        {
            let dup_roll = new this.Roll();
            this.rolls.push();

            asdassa
        }

        return arr_size;
    }


    findDuplicateRoll()
    {

    }

    /**
     * 
     * @param {Int} UnitId The id of the combat unit that we will be removing all rolls for
     * @returns nof_rolls removed
     */
    clearUnitRolls(UnitId)
    {
        var arr_size = this.rolls.length;
        var remove_count = 0;
        // check all rolls
        for(let i = 0; i<arr_size; i++)
        {
            if(this.rolls.unitId == UnitId)
            {
                this.rolls.splice(i,1);
                // decrease index to avoid skipping a register.
                i--;
                arr_size--;
                remove_count++;
            }
        }

        return remove_count;
    }

    /**
     * 
     */
    addRollForUnit()
    {

    }

    /**
     * 
     */
    addRoll()

}


class Combat {
    constructor()
    {
        if(DEBUG_BATTLE_ADMIN)
            LogProcess("Combat object initializing.");

        this.Side_1 = new Side(1); // ids of the minis
        this.Side_2 = new Side(2);

        this.rolls_Side_1 = null;
        this.rolls_Side_2 = null;

        this.SimulationStarted; // locks 

        // this is the current phase that is being resolved
        // 100 - 199 - 
        // 200 - 299 
        // 300 - 399 
        // 400 - 499 
        this.phaseIndex;
        // Max 
        this.maxphaseIndex;

        if(DEBUG_BATTLE_ADMIN)
            LogProcess("Combat object created and initialized.");

        
    }



    // This is the part that should be running in parallel with multiple instances to cut-off simulating time...
    //  Verify combat could be out of the parallel loop
    /**
     * 
     * @param {int} nof_simulations how many simulations will be simulated?
     */
    StartBattle(nof_simulations)
    {
        // verify integrity first
        this.VerifyCombat();
        // OK? - start simulation

        //
        this.Simulate();


    }

    /**
     * Before running the Combat simulation, we must make sure that all the required
     * values have been set.
     */
    VerifyCombat()
    {
        function verifySide(Side_)
        {
            if(!Side_ instanceof Side)
            {
                return -1;
            }

            if(Side_.armyLists.length <= 0)
            {
                console.error("There are no contenders froms side A...");
                ready = 0;
            }

            // combat unit check - combatUnits.length
            if(!Side_.armyReady())
            {
                console.error("Side -"+Side_.sideID+"...Arm all warriors before starting the Combat!");
                // console.error("Side -"+Side_.sideID+" has NO units to be HURT in combat...");
                return 0;
            }


            // make sure that supports are VALID and ASSIGNED
            // if(Side_.validateSupport())
            // {
            //     console.error("Side -"+Side_.sideID+" has NO combats units ready");
            //     return -1;
            // }

            // All units have a weapon assigned
        //     if(Side_.AllUnitsArmed())
        //     {
        //         console.error("Side -"+Side_.sideID+"...Arm all warriors before starting the Combat!");
        //         // console.error("Side -"+Side_.sideID+" has NO units to be HURT in combat...");
        //         return 0;
        //                 //     
        // //     ready= 0;
        //     }

        return 1;
        }

        if(DEBUG_BATTLE_ADMIN)
            LogProcess("Verifying Combat...");
        let ready = 1;

        if(!verifySide(this.Side_1))
        {
            ready= 0;
        }

        if(!verifySide(this.Side_2))
        {
            ready= 0;
        }


            /**
     * Are all units ready for battle? (all minis have made a choice of what weapon to use)
     */
        // if(!this.AllUnitsArmed())
        // {
        //     console.error("Arm all warriors before starting the Combat!");
        //     ready= 0;
        // }

        

        if(ready)
        {
            console.log("Combat READY");
            if(DEBUG_BATTLE_ADMIN)
                LogProcess("Verifying Combat... Succesfull");
        }
        else
        {
            if(DEBUG_BATTLE_ADMIN)
                LogProcess("Verifying Combat... Failed");
        }
            
    }


    /**
     * THIS IS A SCRIPTED PROCESS
     */
    Simulate()
    {

        function rollAttacks(rollstruct)
        {
            // side 1
            for(let i = 0; i<rollstruct.rolls_Side_1.rolls.length;i++)
            {
                rollstruct.rolls_Side_1.rolls[i].rollTheDice();
            }

                        // side 1
            for(let i = 0; i<rollstruct.rolls_Side_2.rolls.length;i++)
            {
                rollstruct.rolls_Side_2.rolls[i].rollTheDice();
            }


        }


        if(DEBUG_BATTLE_ADMIN)
            LogProcess("Starting combat simulation for combat...");

        // Get the dices to be rolled - they match the attacks
        /**
         * NEED TO TAKE INTO ACCOUNT
         * - Cab charges +1 attack.
         * - S
         */
        this.CreateRolls();
        rollAttacks(this)
        // Roll

        // Re-rolls and modifiers
        combatPhase(this);



        // Determine strikes, strikes will go directed to the optimized target
        
        // Each strike to the optimal or selected target (Roll = roundUp((D-S)/2)+4)
        // Apply modifiers/re-rolls
        // If the target dies, pick a new target for the remaining strikes




    }

    CreateRolls()
    {
        this.rolls_Side_1 = new Rolls(this.Side_1);
        if(DEBUG_BATTLE_ADMIN)
            LogProcess("\t \'"+this.rolls_Side_1.rolls.length+"\' d6 Combat rolls created for side \'"+this.Side_1.sideID+"\'");
    

        this.rolls_Side_2 = new Rolls(this.Side_2);
        if(DEBUG_BATTLE_ADMIN)
            LogProcess("\t \'"+this.rolls_Side_2.rolls.length+"\' d6 Combat rolls created for side \'"+this.Side_2.sideID+"\'");
    
    }

    // progresses through each unit in each phase
    next()
    {
        

        // the return indicates phase + unit index
        return ;
    }

}




class Side
{
    constructor(id)
    {
        if(DEBUG_BATTLE_ADMIN)
            LogProcess("\Side-"+id+" object initializing.");

        this.sideID = id;
        // init checksum value
        this.checkSum = 0;

        this.nof_combatUnits = 0;
        this.combatUnits = [];
        this.supportGroups = [];
        this.leader;
        this.armyLists = []; // which armylist
        this.hurtableUnits = []; // does which are not supporting? - there are exceptions

        // things we might use in the future - status
        this.brokenArmy;
        this.deadLeader;
        this.armyAlianceStatus; // green, red, yellow - historical, impossible, okish

        if(DEBUG_BATTLE_ADMIN)
            LogProcess("\Side-"+id+" object created.");
    }

    /**
     * Find out if the assigned support units are correctly positioned.
     * A (infantry) unit can be supported by another (infantry) with spear/ pikes.
     * 2nd line Pikes can only support other pikes.
     * Additional rules prevent support from acting, like "shielding" in the supported model.
     */
    validateSupportGroups()
    {

        return 0;

        return 1;
    }

    /**
     * Once an new unit is found
     */
    validateAllegiance()
    {

    }

    /**
     * 
     * @param {*} unit 
     */
    addCombatUnit(unitId, armyList)
    {
        var army = new mini.Builder(armyList);
        var referenceId = this.checkSum++;
        if(DEBUG_BATTLE_ADMIN)
            LogProcess("\t<Side "+referenceId+"> adding CombatUnit with id -"+unitId+"- from army -"+armyList.name+"...");

        var combatUnit = new mini.CombatMiniature(army.getUnitTemplate(unitId),referenceId, army.name); 


        if(combatUnit)
        {
            this.combatUnits.push(combatUnit);
            this.nof_combatUnits++;
            if(this.containsArmyList(combatUnit.army) == -1)
            {
                // new army
                this.armyLists.push(combatUnit.army);

                /***
                 *  THIS SHOULD BE CHANGED OR REVAMPED AT SOME POINT
                 * 
                 *  Currently adding any units to the hurtable list
                 */
                this.hurtableUnits.push(combatUnit.id);
            }
            else
            {
                // already contained
            }
        }
            
        else 
            return -1;

    }


    /**
     * 
     * @param {*} unitLocalId 
     */
    removeCombatUnit(unitLocalId)
    {
        let removeArmy;
        let removed = 0;
        for(var i = 0; i < this.combatUnits.length; i++ )
        {
            if(this.combatUnits[i].id == unitLocalId)
            {
                //weaponPosition = this.HasWeaponWithName(weaponName); // there is a chance that the payload has caused a change of order
                removeArmy = this.combatUnits[i].army;
                this.combatUnits.splice(i,1);
                this.nof_combatUnits--;
                removed = 1;
                break;
            }
        }

        if(removed && removeArmy != undefined)
        {
            // if none -> remove the label
            if (!this.anyUnitsWithArmyList(removeArmy))
            {
                let j  = this.containsArmyList(removeArmy)
                this.armyLists.splice(j,1);

                // no more units from the removed unit´s army -> remove army

                // check for aliance update.
            }
            // otherwise let it be
            
        }
        else 
            return 1;

    }

    /**
     * Returns the position in the "armyLists[]"
     * @param {*} ArmyListID 
     */
    containsArmyList(ArmyListID)
    {
        for(var i = 0; i < this.armyLists.length; i++ )
        {
            if(this.armyLists[i] == ArmyListID)
            {
                return i; // found
            }
        }
        return -1;
    }

    /**
     * Check if any of the units in this band belong to the Armylist
     * @param {*} ArmyListId 
     * @returns {} 1 or 0 if found or not
     */
    anyUnitsWithArmyList(ArmyListId)
    {
        for(var i = 0; i < this.combatUnits.length; i++ )
        {
            if(this.combatUnits[i].army == ArmyListID)
            {
                return 1; // found
            }
        }

        return 0;
    }

    /**
     * Add an army list to the armies present in this side.
     * Will skip if already exists.
     * 
     * @param {string} ArmyListID_orName - not clear yet
     * @returns {boolean} 1 or 0 depending on success
     */
    addArmyList(ArmyListID)
    {
        

        // check if already there
        if(containsArmyList(this.ArmyLists, ArmyListID))
        {
            // if found - don´t add
            return 0;
        }
        // if not add it
        else 
        {
            this.ArmyLists.push(ArmyListID);
            return 1;
        }
    }


    /**
     * The army is armed, weapons selected, no conflicts 
     */
    armyReady()
    {

        if(DEBUG_BATTLE_ADMIN)
            LogProcess("\t<Side "+this.sideID+"> checking if army is ready...");


        // there are units
        if(this.combatUnits.length == 0)
        {
            LogProcess("\t<Side "+this.sideID+">  has no combat units...");
            return 0;
        }

        // there are hurtable units on this side - only 
        if(this.hurtableUnits.length == 0)
        {
            LogProcess("\t<Side "+this.sideID+">  has no hurtable units...");
            return 0;
        }

        //  they are equiped
        for(var i = 0; i < this.combatUnits.length; i++ )
        {
            // check main-hand
            if(this.combatUnits[i].getWeapon("mainHand") == -1)
            {
                LogProcess("\t<Side "+this.sideID+"> NOT ready... CombatUnit "+this.combatUnits[i].id+" - "+this.combatUnits[i].name);
                return 0; // found
            }


            //   
            // {

            // }
            
        }

        LogProcess("\t<Side "+this.sideID+">  READY");

        return 1;
    }
    



}


exports.Combat = Combat;
exports.Rolls = Rolls;
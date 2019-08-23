
const mini = require("./mini");
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




class Combat {
    constructor()
    {
        if(DEBUG_BATTLE_ADMIN)
            LogProcess("Combat object initializing.");

        this.Side_A = new Side(1); // ids of the minis
        this.Side_B = new Side(2);

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


    /**
     * Before running the Combat simulation, we must make sure that all the required
     * values have been set.
     */
    VerifyCombat()
    {
        if(DEBUG_BATTLE_ADMIN)
            LogProcess("Verifying Combat...");
        let ready = 1;
        if(this.Side_A.length <= 0)
        {
            console.error("There are no contenders froms side A...");
            ready = 0;
        }

        if(this.Side_A.length <= 0)
        {
            console.error("There are no contenders froms side B...");
            ready= 0;
        }

        if(!this.AllUnitsArmed())
        {
            console.error("Arm all warriors before starting the Combat...");
            ready= 0;
        }

        

        if(ready)
        {
            console.log("Combat READY");
            if(DEBUG_BATTLE_ADMIN)
                LogProcess("Verifying Combat... Succesful");
        }
        else
        {
            if(DEBUG_BATTLE_ADMIN)
                LogProcess("Verifying Combat... Failed");
        }
            

    }

    /**
     * Are all units ready for battle? (all minis have made a choice of what weapon to use)
     */
    AllUnitsArmed()
    {

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
            LogProcess("\tSide- "+referenceId+" adding CombatUnit with id -"+unitId+"- from army -"+armyList.name+"...");

        var combatUnit = new mini.CombatMiniature(army.getUnitTemplate(unitId),referenceId, army.name); 


        if(combatUnit)
        {
            this.combatUnits.push(combatUnit);
            this.nof_combatUnits++;
            if(this.containsArmyList(combatUnit.army) == -1)
            {
                // new army
                this.armyLists.push(combatUnit.army);
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
     * 
     * @param {*} ArmyListID_orName 
     */
    addArmyList(ArmyListID)
    {
        

        if(containsArmyList(this.ArmyLists, ArmyListID))
        {
            // if found - don´t add
            return 0;
        }
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

    }



}


exports.Combat = Combat;
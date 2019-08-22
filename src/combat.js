
const mini = require("./mini");






class Battle {
    constructor()
    {
        this.Side_A = new Side(1); // ids of the minis
        this.Side_B = new Side(2);

        // this is the current phase that is being resolved
        // 100 - 199 - 
        // 200 - 299 
        // 300 - 399 
        // 400 - 499 
        this.phaseIndex;
        // Max 
        this.maxphaseIndex;

        
    }


    /**
     * Before running the battle simulation, we must make sure that all the required
     * values have been set.
     */
    VerifyBattle()
    {
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
            console.error("Arm all warriors before starting the battle...");
            ready= 0;
        }

        if(ready)
            console.log("BATTLE READY");

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
            if(this.combatUnits[i] == unitLocalId)
            {
                //weaponPosition = this.HasWeaponWithName(weaponName); // there is a chance that the payload has caused a change of order
                removeArmy = this.combatUnits[i].army;
                this.combatUnits.splice(i,1);
                this.nof_combatUnits--;
                removed = 1;
            }
        }

        if(removed && removeArmy != undefined)
        {
            MAAAAAAL // -> check if other units have this army label
            let j = containsArmyList(removeArmy);

            // if none -> remove the label
            if (j !=-1)
            {
                this.combatUnits.splice(j,1);
            }
            // otherwise let it be
            
        }
        else 
            return 0;

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


exports.Battle = Battle;
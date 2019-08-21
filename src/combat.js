






class Battle {
    constructor()
    {
        this.Side_A = []; // ids of the minis
        this.Side_B = [];

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
    constructor()
    {
        this.nof_combatUnits = 0;
        this.combatUnits = [];
        this.supportGroups = [];
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

    validate


}
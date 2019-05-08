






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


    /*  
    
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

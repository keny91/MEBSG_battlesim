


const CombatSpecialRules = {
    BroadSword: 50001, // Clashmen
    ...: 50002,
    Reroll_1s: 50003,  // poison, , others...
    Two_handed: 50004,  // -1
    Banner: 50005,
    MasterLeague: 4000
  }

const HitSpecialRules = {
    MightyBlow: 60001,
    Reroll_1s: 60002,  // poison, , others...
    Two_handed: 60003,   // +1
    MasterLeague: 4000
  }


function applyCombatRulesAfterRoll(diceD6 , rules)
{
    !instanceof(diceD6)
    {
        // is it the expresion
        Console.err("This is not a D6");
    }

    for (let rule in rules)
    {
        switch(rule){

            // 50001
            case SpecialRules.BroadSword:
                if(diceD6.roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;
            
            // 50002



            // 50003
            case SpecialRules.Reroll_1s:
                if(roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;

            // 50004
            case SpecialRules.Two_handed:
                if(roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;

            // 50005
            /*  Reroll only if losing the combat and can only  */
            case SpecialRules.Banner:
                if(roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;

        }
    }




}


function applyHitRulesToRolL(diceD6 , rules)
{
    !instanceof(diceD6)
    {
        // is it the expresion
        Console.err("This is not a D6");
    }

    for (let rule in rules)
    {
        switch(rule){

            // 50001
            case SpecialRules.BroadSword:
                if(diceD6.roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;
            
            // 50002



            // 50003
            case SpecialRules.Reroll_1s:
                if(roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;

            // 50004
            case SpecialRules.Two_handed:
                if(roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;

            // 50005
            /*  Reroll only if losing the combat and can only  */
            case SpecialRules.Banner:
                if(roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;

        }
    }




}
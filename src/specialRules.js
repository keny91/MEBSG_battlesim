


const SpecialRules = {
    BroadSword: 50001, // Clashmen
    MightyBlow: 50002,
    Reroll_1s: 50003,  // poison, , others...
    Two_handed: 50004,
    DiamondLeages: 2500,
    MasterLeague: 4000
  }




function applyRuleToRole(roll, rules)
{
    for (let rule in rules)
    {
        switch(rule){

            // 50001
            case SpecialRules.BroadSword:
                if(roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;


            // 50001
            case SpecialRules.Two_handed:
                if(roll == 6 || roll == 1)
                    roll = roll;
                else 
                    roll = roll-1;
            break;
        }
    }




}
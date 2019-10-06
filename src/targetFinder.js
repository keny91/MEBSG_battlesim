const dices = require("./rolls");
const combat = require("./combat");


const TargetingProtocol = 
{
  HighestChance: 401,
  HeroFirst: 402,
  Non_hero_first: 403,
  HighestValue: 404,
  Selective: 405
}


function DetermineTargets(Rolls, hurtableTargets)
{
    
}


exports.DetermineTargets = DetermineTargets;
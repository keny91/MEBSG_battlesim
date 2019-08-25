
const weaponJson = require("./../options/weapons");


const WeaponSpecial = 
{
  MasterCrafted: 'M',
  Elven: 'E',
  Poison: 'P',
  OTHER: 204
}

function parseWeaponSpecial(weaponProfile)
{
    var PreName;
    var newName;
    switch(weaponProfile.special)
    {
        case WeaponSpecial.MasterCrafted:
                PreName = "Mastercrafted";
            break;
        
        case WeaponSpecial.Elven:
                PreName = "Elven";
            break;

        case WeaponSpecial.Poison:
                PreName = "Poison";
            break;
        
        default:
                
            break;

    }
    if(PreName)
        newName=PreName+" "+weaponProfile.name;
    else
        newName=weaponProfile.name;

    return newName;
}


/**
 *  Weapon carries the effects and maybe stats 
 */
class Weapons
{
    constructor(CombatUnitId)
    {

        this.parentUnitId = CombatUnitId;
        // this.selectable = 1; // if this weapon can be selected in the unit-weapon menu
        this.selected = -1;  // no selection made
        this.nof_usable_weapons = 0;
        this.usable_weapons = [];
        this.nof_weapons = 0;
        this.weaponList = [];
        this.isSupport = 0;
        this.isPike = 0;
        this.isSpear = 0;

        // init checksum value
        this.checkSum = 0;


    }


          /**   Payload data will help us track all the consecuences that we will or have enabled with it
       * 
       * @param {[tag1,contentValue1],[tag2,contentValue2]} payloadData     
       * @param{int} Activating or deactivating the option
       */
      parsePayload(payloadData, weaponSpecial , revert = 0)
      {
  
          for(var i = 0; i<payloadData.length; i++ )
          {
              let hasSubfix = 0; // by default
              let currentData = payloadData[i];
              let type = currentData[0];
              let additionalInfo = currentData[1];
                           
              // parse all options
              switch(type)
              {
                  case "enableSupport":
  
                      if(additionalInfo <0 || additionalInfo>2)
                          console.error("INVALID value \""+additionalInfo+"\"  for \""+type+"\" payload");
  
                      this.isSupport = !revert;
                      if(additionalInfo == 1)
                          this.isSpear = !revert;
                      else if (additionalInfo == 2)
                          this.isPike = !revert;
                      else if (additionalInfo == 3 && this.isMounted[0] == 0) // war spear
                          this.isSpear = !revert;
                      else
                          this.isSupport = 0;
                      
                      break;
  
                  
                  case "containsWeapon":
                      // we can add multiple weapons
                      for(var j = 0; j<additionalInfo.length; j++)
                          {
                              let weapon = additionalInfo[j];
                              // if a weapon is special, the spawning weapons will also be
                              if(weaponSpecial != undefined)
                                weapon=weapon+"+"+weaponSpecial;
                              // create a weapon option that is added as an option (no point cost since it should have been)
                              this.toogleWeapon(weapon,revert);
                          }
                          // remove the current weapon - return 2
                          return 2;
                      break;

                    case "isWeapon":
        
                    break;
  
                  case "effect":
                      if(subfix == undefined)
                      {
                          console.error("INVALID Effect by object");
                          return -1;
                      }
                          
  
                      parseEffect(subfix,revert); // implement this in effect
  
                      break;
  
                  default:
                      console.error("Payload Property not defined...");
                      return -1;
                      break;
              }
          }
          return 1;
      }
  

      /**
       *    If we got a spear/pike the combatUnit can be set to support
       */
      SelectSupportWeapon()
      {
        if(this.isSupport)
        {
            if(this.isSpear)
            {
                return this.isSpear;
            }

                
            else if(this.isPike)
            {
                return this.isPike;
            }
                
        }

        return -1;
      }

      /**
       * 
       * @param {*} weaponId 
       * @param {*} useSpecial 
       */
      SelectWeapon(weaponId , useSpecial)
      {

        function DeactivateOtherWeapons(weaponList)
        {

        }


        function Is2handed(weaponProfile)
        {

        }

        /**
         * if one handed and no 2h weapon
         */
        function enableShield(){}


      }


      HasWeaponWithName(weaponName)
      {
          for(var i = 0; i<this.weaponList.length; i++ )
          {
              if(this.weaponList[i].name == weaponName)
                  return i;
          }
          return -1;
      }

      
      HasWeaponWithId(id)
      {
          for(var i = 0; i<this.weaponList.length; i++ )
          {
              if(this.weaponList[i].id == id)
                  return i;
          }
          return -1;
      }

      /**
       * 
       * @param {*string} weaponName 
       */
      FindWeapon(weaponName)
      {
          var jsonRaw = require("./../options/weapons");
          var weaponListIndex = jsonRaw.index;
          for(var i = 0; i<weaponListIndex.length; i++ )
          {
              if(weaponListIndex[i][0] == weaponName)
              {
                  let listIndexId = weaponListIndex[i][1];
                  let listId = jsonRaw.list[i]["weaponId"];
  
                  if(listId != listIndexId)
                  {
                      console.error("Missmatch in Weapons, \""+listId+"\" with listIndex \""+listIndexId+"\"");
                      return -1;
                  }
                  
                  return jsonRaw.list[i];
              }
          }

          // if we get here, it means that we did not found the weapon in the list
          console.error("Weapon \""+weaponName+"\" not found at  \""+"./options/weapons"+"\" ...");
          return -1;
      
      }
      /** toogleWeapon
       * 
       * @param {*string} string weapon name as it appears on the official index 
       * @param {*boolean} boolean adding or removing? 
       */
      toogleWeapon(FULLweaponName, remove)
      {
          var weaponProfile;
          var weaponSpecial, weaponName;
          var hasTHEweapon, weaponPosition;
          var rc = 1 ;

  
          // Are we here to un/equip?
  
          // Does the unit has such a weapon already?
  
          // split subfixes to add effect to certain weapons ->  (WeaponName+Subfix)  Wher
          var str = FULLweaponName.split("+");
  
  
        // check for special attributes of the weapon - Poison;Mastercrafted;Elven
          weaponName = str[0];
          if(str.length>1)
              weaponSpecial = str[1];

  

  
          // Find 
          weaponProfile = this.FindWeapon(weaponName);
          // Check if the requested is in the list; and whats its position
          weaponPosition = this.HasWeaponWithName(weaponName);
          hasTHEweapon = (weaponPosition != -1);
  
          // Statement to admit adding a new weapon
          if(hasTHEweapon  && !remove)
          {
              console.error("Weapon \""+weaponName+"\" is already present in "+this.name+". With ID: "+this.id+".");
              return -1; 
          }
  
          // Statement to remove adding an existing weapon
          if(!hasTHEweapon && remove)
          {
              console.error("Weapon \""+weaponName+"\" is NOT present in "+this.name+". With ID: "+this.id+".");
              return -1; 
          }
  
          // weapon not found - for whatever reason
          if(weaponProfile == -1)
              return -1;
         
  
          /********************* PARSE WEAPON SPECIAL ******** */
  
          if(weaponProfile.payload != undefined )
          {
              
              rc = this.parsePayload(weaponProfile.payload, weaponSpecial ,remove);     
          }
  
          /* only add the weapon if the payload verifies it 
          *   2  - means that payload does not require the weapon to be added to the usable list-> NOT USABLE
          *   -1 - error happened
          */
          if (rc != -1)
          {
              if (remove)
              {
                  // if is usable
                if(rc != 2)
                {
                    let id_usable_array = -1;
                    for(var i = 0; i<this.usable_weapons.length; i++ )
                    {
                        if (this.usable_weapons[i] == this.weaponList[weaponPosition].id)
                            id_usable_array = i;
                    }

                    // check for WEIRD stuff
                    if(id_usable_array == -1) {
                        console.error("Did not find the Id_entifier in the weapon list that matches the one to be removed..."+ weaponProfile.id);
                        return -1;
                    }
                    
                    this.usable_weapons.splice(id_usable_array,1);
                    this.nof_usable_weapons--;
                }
                
                weaponPosition = this.HasWeaponWithName(weaponName); // there is a chance that the payload has caused a change of order
                this.weaponList.splice(weaponPosition,1);
                this.nof_weapons--;
                
              }
                  
              else
              {
                // give it a Unique ID inside weapons
                weaponProfile.id = this.checkSum++;
                // Set special property to be used during combat
                weaponProfile.special = weaponSpecial;
                //
                if(weaponProfile.displayName)
                    weaponProfile.displayName = parseWeaponSpecial(weaponProfile);
                this.weaponList.push(weaponProfile);
                this.nof_weapons++;
                if(rc != 2)
                {
                    this.nof_usable_weapons++;
                    this.usable_weapons.push(weaponProfile.id)
                }
                    
              }
                  
          }          
  
          return 1;
      }
  
  
    
}

exports.WeaponSpecial = WeaponSpecial;
exports.Weapons = Weapons;

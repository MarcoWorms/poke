//applies changes to stats during battle
updateBattleStat = function (pokemon, stage, stat)  {
      var modifier;
      switch(stage) {
        case -6: modifier = 1.0/4; break;
        case -5: modifier = 2.0/7; break;
        case -4: modifier = 1.0/3; break;
        case -3: modifier = 2.0/5; break;
        case -2: modifier = 1.0/2; break;
        case -1: modifier = 1.0/3; break;
        case 0: modifier = 1.0; break;
        case 1: modifier = 1.5; break;
        case 2: modifier = 2.0; break;
        case 3: modifier = 2.5; break;
        case 4: modifier = 3.0; break;
        case 5: modifier = 3.5; break;
        case 6: modifier = 4.0; break;
        default: modifier = 1.0; break;
      }
      switch(stat)  {
        case "attack": pokemon.battleattack = pokemon.attack * modifier; break;
        case "defense": pokemon.battledefense = pokemon.defense * modifier; break;
        case "spattack": pokemon.battlespattack = pokemon.spattack * modifier; break;
        case "spdefense": pokemon.battlespdefense = pokemon.spdefense * modifier; break;
        case "speed": pokemon.battlespeed = pokemon.speed * modifier; break;
        default: break;
      }
      return pokemon;
}

//reverts stat changes, for use upon switching or ending the battle
normalizeStats = function (pokemon)  {
  pokemon.battleattack = pokemon.attack;
  pokemon.battledefense = pokemon.defense;
  pokemon.battlespattack = pokemon.spattack;
  pokemon.battlespdefense = pokemon.spdefense;
  pokemon.battlespeed = pokemon.speed;
  return pokemon;
}

//carries out a move from an attacker on a defender
//resolves all effects of the move
useMove = function (attacker, defender, move) {
  if(checkHit(attacker, defender, move))  {
    var damage = calcDamage(attacker, defender, move);
    console.log(damage);
    if (isNaN(damage) == true)
    {
      damage = 0;
    }
    defender.remainingHP = Math.max(0, defender.remainingHP - damage);

    //check for fainting (checks attacker as well for selfdestruct and explosion)
    //updateStatus() method is in statusFunctions.js
    if (attacker.remainingHP == 0)  {
      updateStatus(attacker, 'fnt');
    }
    if (defender.remainingHP == 0)  {
      updateStatus(defender, 'fnt');
    }

    // if (attacker.status != 'fnt') {
    //   move.userEffect(attacker);
    // }
    // if (defender.status != 'fnt') {
    //   move.targetEffect(defender);
    // }

    return defender.remainingHP;
  }
}

//calculates if a move hits or not, depending on the move's conditions and accuracy
//uses move's accuracy as a percentage hit rate, does not follow original game freak algorithms
checkHit = function (attacker, defender, move) {
  //if the defender fails the move's hit conditions (such as being airborne from using Fly) then it does not hit
  var accuracy = moves[move]['accuracy'];
  if (accuracy == '-')  {
    accuracy = 100;
  }
  if (100*Math.random() < accuracy)  {
    return true;
  }
  return false;
}

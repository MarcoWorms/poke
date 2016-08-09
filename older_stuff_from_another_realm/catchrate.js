//catch rate formula from http://www.dragonflycave.com/rbycapture.aspx
//does not account for wobbles - only returns true or false
//limited to generation 1 only - newer games use different formula

function checkCatch(balltype, target)  {
  if (balltype == 'masterball')  {
    return true;
  }
  var R1;
  switch(balltype)  {
    case 'pokeball':
      R1 = 255*Math.random(); break;
    case 'greatball':
      R1 = 200*Math.random(); break;
    default:
      R1 = 150*Math.random(); break;
  }

  var S;
  switch(target.status)  {
    case 'slp':
      S = 25; break;
    case 'frz':
      S = 25; break;
    case 'par':
      S = 12; break;
    case 'brn':
      S = 12; break;
    case 'psn':
      S = 12; break;
    default:
      S = 0; break;
  }

  var R3 = R1 - S;

  if (R3 < 0)  {
    return true;
  }

  if (target.catchrate < R3) {
    return false;
  }

  var F = target.HP * 255;
  if (balltype == 'greatball')  {
    F /= 8;
  }
  else {
    F /= 12;
  }

  if (target.remainingHP / 4 > 0)  {
    F /= (target.remainingHP);
  }

  F = Math.min(255, F);

  var R2 = 255 * Math.random();
  if (R2 < F) {
    return true;
  }

  return false;
}

/*
  global: POKEDEX : Array PokeModel
  global: TYPES : Array PokeTypes
*/
'use strict'

// Debug mode logs effects.
const DEBUG_MODE = true


// All void functions or functions that cause effect MUST use logEffect.
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//    logEffect : String -> Array -> EFFECT ! Logs an effect on the console. Arguments will be formatted and logged.
const logEffect = (effectDescription, argsList) => {
  const argsAsText = argsList.join(", ")
  if (DEBUG_MODE) {
    console.log(effectDescription, "\n-Logged:\n", argsAsText)
  }
}


//    debugDomElement : DOM Element -> String
const debugDomElement = (domElement) => {
  return domElement.nodeName + '.' + domElement.className + '#' + domElement.id
}


//    makeShittyDomHandler : ShittyDomHandler
const makeShittyDomHandler = () => {
  //    domQuery : String (Valid CSS3Query) -> DOM Element
  const domQuery = (cssQuery) => document.querySelector(cssQuery)
  const $ = domQuery
  //    setValue : DOM Element -> Valid ToString a -> EFFECT ! Set the innerHTML of a DOM element.
  const setValue = (domElement, newValue) => {
    domElement.innerHTML = newValue
    logEffect('Set Dom Element Attribute', [debugDomElement(domElement), newValue])
  }
  //    getValue : DOM Element -> String
  const getValue = (domElement) => {
    return domElement.innerHTML
  }
  //    seProp : DOM Element -> String -> String -> EFFECT ! Set the attribute of a DOM element.
  const seProp = (domElement, attribute, newValue) => {
      domElement[attribute] = newValue
      logEffect('Set Dom Element Attribute', [debugDomElement(domElement), attribute, newValue])
  }
  //    renderPokeOnContainer -> String -> Poke -> EFFECT ! Draw a Poke on a container with the prefix ID.
  const renderPokeOnContainer = (prefix, poke) => {
    const container_id = '#' + prefix + 'Container'
    const container = $(container_id)
    const render  = {
      name: container.querySelector('.name')
    , img: container.querySelector('.img')
    , hp: container.querySelector('.hp')
    }
    setValue(render.name, poke.name)
    seProp(render.img, 'src', poke.image)
    setValue(render.hp, ('' + poke.combat.hp + ' / ' + poke.combat.maxHp))
    logEffect('Rendered Poke container', [debugDomElement(container)])
  }
  return {
    renderPokeOnContainer: renderPokeOnContainer
  }
}


//    cloneJsonObject : Valid JSON -> New Object
const cloneJsonObject = (object) => JSON.parse(JSON.stringify(object))
const makeNewModel = cloneJsonObject


//    randomArrayElement : Array a -> a
const randomArrayElement = (array) => array[Math.floor(Math.random() * array.length)]


//    makePoke : PokeModel -> Poke
const makePoke = (pokeModel) => {
  //    poke : PokeModel
  const poke = makeNewModel(pokeModel)
  return {
    name: poke.pokemon[0].Pokemon,
    image: poke.images.front,
    type: poke.stats[0].types.text,
    combat: {
      maxHp: poke.stats[0].hp
    , hp: poke.stats[0].hp
    , attack: poke.stats[0].attack
    , defense: poke.stats[0].defense
    , spAttack: poke.stats[0]['sp atk']
    , spDefense: poke.stats[0]['sp def']
    , speed: poke.stats[0].speed
    }
  }
}


//    pokeAleatorio : Poke
const pokeAleatorio = () => makePoke(randomArrayElement(POKEDEX))


//    makePlayer : Player
const makePlayer = () => {
  //    pokemons : Array Poke
  const pokemons = []
  //    player_interface : Player
  const player_interface = {
  //addPoke : Poke -> EFFECT ! Pushes poke into pokemons array
    addPoke: (poke) => {
      pokemons.push(poke)
      logEffect('Added Poke on Player inventory', [poke])
    },
  //active : Poke
    active: () => pokemons[0]
  }
  return player_interface
}


// main
const dom = makeShittyDomHandler()
const player = makePlayer()
player.addPoke(makePoke(POKEDEX[0]))
var enemy = pokeAleatorio()
dom.renderPokeOnContainer('enemy', enemy)
dom.renderPokeOnContainer('player', player.active())

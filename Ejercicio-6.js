//json-server --watch exercise-6.json

const url = "http://localhost:3000/characters";

const arena$$ = document.querySelector('[data-function="arena"]');


fetch(url)
  .then((res) => res.json())
  .then((characters) => {
    printCharacters(characters);
  });

gallery$$ = document.querySelector('[data-function="characters"]');

const printCharacters = (characters) => {
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    const galleryItem$$ = document.createElement("div");
    galleryItem$$.className = "c-characters__item";
    const titleP$$ = document.createElement("h2");
    const img$$ = document.createElement("div");
    const stats$$ = document.createElement("ul");

    img$$.innerHTML = `<img src=${character.avatar}>`;
    titleP$$.innerHTML = `<p>${character.name}</p`;
    stats$$.innerHTML = `<li>Critic: ${character.critic}</li><li>Defense: ${character.defense}</li><li>Vitality: ${character.vitality}</li>`;

    galleryItem$$.appendChild(titleP$$);
    galleryItem$$.appendChild(img$$);
    galleryItem$$.appendChild(stats$$);
    gallery$$.appendChild(galleryItem$$);
    galleryItem$$.addEventListener(
      "click",
      () => {
        selectCharacter(character), (img$$.className = "c-character__selected");
      },
      { once: true }
    );
  }
};

let player1;
let player2;
let arrayPlayers = [];


const selectCharacter = (character) => {
  if (player1) {
    player2 = character;
    arrayPlayers.push(player2);
    createArena(player1, player2);
  } else {
    player1 = character;
    arrayPlayers.push(player1);
  }
};

const createArena = (player1, player2) => {
  const fightBtn$$ = document.createElement("button");
  fightBtn$$.innerHTML = "FIGHT!";
  gallery$$.appendChild(fightBtn$$);
  fightBtn$$.addEventListener("click", () => battle(player1, player2));
};

const divBattle$$ = document.querySelector('[data-function="battle-arena"]');

const battle = (player1, player2) => {
  console.log(arrayPlayers);
  gallery$$.innerHTML = "";
  for (let player of arrayPlayers) {
    const battleItem$$ = document.createElement("div");
    battleItem$$.className = "c-characters__item";
    const titleP$$ = document.createElement("h2");
    const img$$ = document.createElement("div");
    const stats$$ = document.createElement("ul");

    img$$.innerHTML = `<img src=${player.avatar}>`;
    titleP$$.innerHTML = `<p>${player.name.toUpperCase()}</p`;
    stats$$.innerHTML = `<li>Critic: ${player.critic}</li><li>Defense: ${player.defense}</li><li>Vitality: ${player.vitality}</li>`;

    battleItem$$.appendChild(titleP$$);
    battleItem$$.appendChild(img$$);
    battleItem$$.appendChild(stats$$);
    gallery$$.appendChild(battleItem$$);
    arena$$.appendChild(gallery$$);
  }

  arena$$.appendChild(divBattle$$);
  const startBtn$$ = document.createElement("button");
  startBtn$$.textContent = "Start Game";
  gallery$$.appendChild(startBtn$$);
  startBtn$$.addEventListener("click", () => startBattle(), { once: true });
};

  

const startBattle = () => {
  const player1Div$$ = document.createElement("div");
  const player2Div$$ = document.createElement("div");


  let totalScorePlayer1 = 0;
  let totalScorePlayer2 = 0;
  let player1Health = player1.vitality;
  let player2Health = player2.vitality;

  for (let i = 0; i < 10; i++) {    

  if (player1Health <= 0) {
    //alert(player2.name, ' HA GANADO');
    console.log(player2.name + " Ha ganado");
    break;
    } else if (player2Health <= 0) {
      //alert(player1.name, ' HA GANADO');
      console.log(player1.name + " Ha ganado");
      break;
      }else {

   
    for (let totalDamage of player1.damage) {
      let arrayDice = totalDamage.replace(/d/g, ",");
      arrayDice = JSON.parse("[" + arrayDice + "]");
      let numDados = arrayDice[0];
      let numCaras = arrayDice[1];
      let singleScore = 0;
      for (let i = 0; i < numDados; i++) {
        if (player2Health <= 0){
          break;
          console.log('break');
        }
        singleScore =  Math.floor(Math.random() * (numCaras - 1) + 1);   
        if (singleScore == player1.critic ? singleScore = singleScore * 2: singleScore);          
      }
      totalScorePlayer1 += singleScore;
      player2Health = player2Health - totalScorePlayer1;
      
     const h1Player1$$ = document.createElement("h4");
      h1Player1$$.innerHTML = `${player1.name} ha sacado ${totalScorePlayer1} puntos y la salud de ${player2.name} es ${player2Health}`;
      player1Div$$.appendChild(h1Player1$$);    
    }   
    
    for (let totalDamage of player2.damage) {
      let arrayDice = totalDamage.replace(/d/g, ",");
      arrayDice = JSON.parse("[" + arrayDice + "]");
      let numDados = arrayDice[0];
      let numCaras = arrayDice[1];
      let singleScore = 0;
      for (let i = 0; i < numDados; i++) {
        if (player1Health <= 0){
          break;
          console.log('break');
        }
        singleScore =  Math.floor(Math.random() * (numCaras - 1) + 1);
        if (singleScore == player2.critic ? singleScore = singleScore * 2: singleScore);  
      }
      totalScorePlayer2 = singleScore + totalScorePlayer2;
      player1Health = player1Health - totalScorePlayer2;
      const h1Player2$$ = document.createElement("h4");
      h1Player2$$.innerHTML = `${player2.name} ha sacado ${totalScorePlayer2} puntos  y la salud de ${player1.name} es ${player1Health}`; 
      player2Div$$.appendChild(h1Player2$$);       
    }  
  }
}   
   divBattle$$.appendChild(player1Div$$); 
   divBattle$$.appendChild(player2Div$$); 
};

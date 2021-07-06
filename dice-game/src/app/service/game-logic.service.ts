import { Injectable } from '@angular/core';
import { PlayersInfo } from '../model/playersinfo';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  numberOfPlayers!: number;
  numberOfDice!: number;

  playersTotalScoreArray: any = [];
  playerLivesNumberArray: any = [];

  diceRollArray: any = [];

  constructor() { }




  // To start the game 
  getStartGamePicks(numberOfDice: number, numberOfPlayers: number) {
    this.numberOfPlayers = numberOfPlayers;
    this.numberOfDice = numberOfDice
    this.initStartGame();
  }

  initStartGame() {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      this.playerLivesNumberArray[i] = 6;
      this.playersTotalScoreArray[i] = 0;
      this.diceRollArray[i] = 0;
    }
  }


  //Needed functions for the game

  // Gens a random number 1-6 times the number of dice
  returnRandomNumber() {
    return Math.floor(Math.random() * (this.numberOfDice * 6)) + 1;
  }

  //Calls the Random Number Gen and Adds then to the Player total score
  addDiceRoll() {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      let randomNumber = this.returnRandomNumber();
      this.playersTotalScoreArray[i] += randomNumber;
      this.diceRollArray[i] += randomNumber;
      console.log(this.diceRollArray[i]);
    }
  }

  clearDiceRollArray() {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      this.diceRollArray[i] = 0;
    }
  }

  //Finds the lowest Index Value of the PLayer Score Array. 
  // Also Handles ties of the lowest Value of the Players Score Array
  lowestIndexValue() {
    let lowestIndexValue = 0;
    let lowestIndexValueArray = [];
    let lowestValueInArray = Math.min(...this.playersTotalScoreArray);

    for (let i = 1; i < this.numberOfPlayers; i++) {
      if (this.playersTotalScoreArray[i] < this.playersTotalScoreArray[lowestIndexValue]) {
        lowestIndexValue = i;
      }
    }
    for (let i = 1; i < this.numberOfPlayers; i++) {
      if (this.playersTotalScoreArray.indexOf(this.playersTotalScoreArray[i]) !== this.playersTotalScoreArray.lastIndexOf(this.playersTotalScoreArray[i])) {
        const firstMatchingIndex = this.playersTotalScoreArray.indexOf(this.playersTotalScoreArray[i]);
        const secondMatchingIndex = this.playersTotalScoreArray.lastIndexOf(this.playersTotalScoreArray[i]);
        if (lowestValueInArray === this.playersTotalScoreArray[firstMatchingIndex] || lowestValueInArray === this.playersTotalScoreArray[secondMatchingIndex]) {
          lowestIndexValueArray.push(this.playersTotalScoreArray.indexOf(this.playersTotalScoreArray[i]))
          lowestIndexValueArray.push(this.playersTotalScoreArray.lastIndexOf(this.playersTotalScoreArray[i]))
          return lowestIndexValueArray;
        }
      }
    }
    console.log(lowestIndexValue, 'indexvalue2');
    return lowestIndexValue;
  }

  //To subtract a life for the player with the lowest score
  //Also handles if the lowest score is a tie
  loseLife() {
    const indexValue = this.lowestIndexValue();
    if (Array.isArray(indexValue)) {
      for (let i = 0; i < 2; i++) {
        console.log(indexValue[i]);
        this.playerLivesNumberArray[indexValue[i]] -= 1;

      }
    } else {
      this.playerLivesNumberArray[indexValue] -= 1;
    }

  }

  // checkForPlayerZero(){
  //  for(let i =0; i< this.numberOfPlayers; i++){
  //    if (this.playerLivesNumberArray[i] === 0){

  //    }
  //  }


  // }

  // playerWinner(){

  // }

  //for each button click Or "Roll"
  diceRollBTN() {
    this.clearDiceRollArray();
    this.returnRandomNumber();
    this.addDiceRoll();
    this.lowestIndexValue();
    this.loseLife();
  }


  //The Returns to the GameBoard
  returnNumberOfPlayers(): any {
    return this.numberOfPlayers;
  }

  returnNumberOfDice(): any {
    return this.numberOfDice;
  }

  returnPlayersLivesNumber() {
    return this.playerLivesNumberArray;
  }

  returnPlayerTotalScore() {
    return this.playersTotalScoreArray;
  }
  returnDiceRolls() {
    return this.diceRollArray;
  }

}




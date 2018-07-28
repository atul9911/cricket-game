#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const ballsPerOver = 6;
const Utils = require('../lib/utils').default;
const _ = require('lodash');

/**
 * @description
 * Will Predict the result of a match using a weighted random number generation
 * @param A m * n batsman matrix which has the probability of the runs and out on a ball
 * @param Target score
 * @param Overs Left
 * @param Wickets Left
 * result = 0 Batting Team Lost
 * result = 1 Batting Team Won
 */

let result = 0;

function changeEnd(runsScored, batsmanOnField) {
  if ([1, 3, 5].includes(runsScored)) {
    batsmanOnField.reverse();
  }
}

class CricketGame {
  /**
   * @constructor
   * @param oversLeft :- The number of overs left in the match
   * @param wicketsLeft :- The number of wickets left for the batting team
   * @param runsRequired :- Number of runs required by the batting team
   * @param batsmenMatrix :- A wicketsLeft * 7 array probability matrix of batsman
   */

  constructor(oversLeft = 0, wicketsLeft = 0, runsRequired = 0, batsmenMatrix = []) {
    this.oversleft = oversLeft;
    this.wicketsLeft = wicketsLeft;
    this.runsRequired = runsRequired;
    this.batsmenMatrix = batsmenMatrix;
    this.validSingleBallScoreList = this.batsmenMatrix.shift();

    /**
     * @description in case first column is an empty value or a string
     * at first position as give in sample
     */
    if (isNaN(+this.validSingleBallScoreList[0])) {
      this.validSingleBallScoreList.shift();
    }
  }

  /**
   * @param batsmanAtStrike :- batsman at strike
   * Returns either runs scored by the batsman or -1 if batsman is out
   */

  predictNextBall(batsmanAtStrike) {
    const batsmanMatrix = _.cloneDeep(this.batsmenMatrix);
    let scoreProbability = batsmanMatrix.filter(x => x[0] === batsmanAtStrike);
    scoreProbability = scoreProbability[0];
    /**
     * @description
     * Normalize weight array by removing the batsman name
     */

    if (scoreProbability && scoreProbability.length) {
      scoreProbability.shift();
    }

    if (Utils.validateNonNumericArray(scoreProbability)) {
      throw new Error(`Invalid Score for Batsman:${batsmanAtStrike} and hence breaking`);
    }

    const score = Utils.getRandomItem(this.validSingleBallScoreList,
      Utils.convertPercentageIntoDecimal(scoreProbability));
    return score;
  }

  /**
   * Core Logic of game
   * Always call predictNextBall to predict the outcome of next ball
   * will return the result(Win or Loose)
   */

  playGame() {
    let oversleft = this.oversleft;
    let wicketsLeft = this.wicketsLeft;
    let runsRequired = this.runsRequired;

    if (Utils.validateNonNumericArray(this.validSingleBallScoreList)) {
      throw new Error('Invalid Single Ball Score List');
    }

    if (oversleft <= 0) {
      throw new Error('Invalid Overs');
    }

    if (wicketsLeft <= 0) {
      throw new Error('Invalid Wickets');
    }

    if (runsRequired <= 0) {
      throw new Error('Invalid Runs');
    }

    let overBall = 0;
    let nextBallResult;
    let batsmanToBat = [];
    const totalOvers = this.oversleft;

    batsmanToBat = Utils.getArrayColumn(this.batsmenMatrix, 0);
    if (batsmanToBat.length !== wicketsLeft) {
      throw new Error('Invalid Batsman Length');
    }

    const batsmanOnField = [];
    batsmanOnField.push(batsmanToBat.shift(), batsmanToBat.shift());
    console.log(`${oversleft} left.${runsRequired} runs to win.`);

    while (runsRequired && wicketsLeft && oversleft) {
      try {
        nextBallResult = this.predictNextBall(batsmanOnField[0]);
      } catch (exc) {
        throw exc;
      }
      overBall += 1;
      console.log(`${totalOvers - oversleft}.${overBall} ${batsmanOnField[0]} scored ${nextBallResult} run(s)`);

      if (nextBallResult === -1) {
        wicketsLeft -= 1;
        batsmanOnField.shift();
        if (batsmanToBat.length) {
          batsmanOnField.unshift(batsmanToBat.shift());
        }
      } else {
        runsRequired -= nextBallResult;
      }

      changeEnd(nextBallResult, batsmanOnField);

      if (runsRequired <= 0) {
        result = 1;
        break;
      }

      if (overBall === ballsPerOver) {
        changeEnd(nextBallResult, batsmanOnField);
        oversleft -= 1;
        overBall = 0;
        console.log(`${oversleft} left.${runsRequired} runs to win.`);
      }
    }

    if (result) {
      console.log('Batting Team won');
    } else {
      console.log('Batting log lost');
    }
    return result;
  }
}


exports.default = CricketGame;

if (require.main === module) {
  (function unit() {
    const cricketGame = new CricketGame(4, 4, 40, [
      ['', 0, 1, 2, 3, 4, 5, 6, -1],
      ['Kirat Boli', 5, 30, 25, 10, 15, 1, 9, 5],
      ['N S Nodhi', 10, 40, 20, 5, 10, 1, 4, 10],
      ['R Rumarh', 20, 30, 15, 5, 5, 1, 4, 20],
      ['Shashi Henra', 30, 25, 5, 0, 5, 1, 4, 30]
    ]);
    cricketGame.playGame();
  }());
}
#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const chai = require('chai');
const CricketGame = require('../api/CricketGame').default;

const expect = chai.expect;

chai.should();

describe('Cricket Game Prediction', () => {
  it('it should return the result', (done) => {
    const cricketGame = new CricketGame(4, 4, 40, [
      [0, 1, 2, 3, 4, 5, 6, -1],
      ['Kirat Boli', 5, 30, 25, 10, 15, 1, 9, 5],
      ['N S Nodhi', 10, 40, 20, 5, 10, 1, 4, 10],
      ['R Rumarh', 20, 30, 15, 5, 5, 1, 4, 20],
      ['Shashi Henra', 30, 25, 5, 0, 5, 1, 4, 30]
    ]);
    expect(cricketGame.playGame()).to.be.a('number');
    done();
  });

  /**
   * @description
   * Batsman are less then wickets left
   */

  it('it should return the error', (done) => {
    const cricketGame = new CricketGame(4, 4, 40, [
      [0, 1, 2, 3, 4, 5, 6, -1],
      ['Kirat Boli', 5, 30, 25, 10, 15, 1, 9, 5],
      ['N S Nodhi', 10, 40, 20, 5, 10, 1, 4, 10],
      ['R Rumarh', 20, 30, 15, 5, 5, 1, 4, 20]
    ]);
    expect(() => cricketGame.playGame()).to.throw('Invalid Batsman Length');
    done();
  });

  /**
   * @description
   * Batsman are less then wickets left
   */

  it('it should return Invalid Batsman Length', (done) => {
    const cricketGame = new CricketGame(4, 4, 40, [
      [0, 1, 2, 3, 4, 5, 6, -1],
      ['Kirat Boli', 5, 30, 25, 10, 15, 1, 9, 5],
      ['N S Nodhi', 10, 40, 20, 5, 10, 1, 4, 10],
      ['R Rumarh', 20, 30, 15, 5, 5, 1, 4, 20]
    ]);
    expect(() => cricketGame.playGame()).to.throw('Invalid Batsman Length');
    done();
  });

  /**
   * @description
   * Negative Overs
   */

  it('it should return Invalid Overs', (done) => {
    const cricketGame = new CricketGame(-1, 4, 40, [
      [0, 1, 2, 3, 4, 5, 6, -1],
      ['Kirat Boli', 5, 30, 25, 10, 15, 1, 9, 5],
      ['N S Nodhi', 10, 40, 20, 5, 10, 1, 4, 10],
      ['R Rumarh', 20, 30, 15, 5, 5, 1, 4, 20],
      ['Shashi Henra', 30, 25, 5, 0, 5, 1, 4, 30]
    ]);
    expect(() => cricketGame.playGame()).to.throw('Invalid Overs');
    done();
  });

  /**
   * @description
   * Negative Wickets
   */

  it('it should return Invalid Wickets', (done) => {
    const cricketGame = new CricketGame(4, -1, 40, [
      [0, 1, 2, 3, 4, 5, 6, -1],
      ['Kirat Boli', 5, 30, 25, 10, 15, 1, 9, 5],
      ['N S Nodhi', 10, 40, 20, 5, 10, 1, 4, 10],
      ['R Rumarh', 20, 30, 15, 5, 5, 1, 4, 20],
      ['Shashi Henra', 30, 25, 5, 0, 5, 1, 4, 30]
    ]);
    expect(() => cricketGame.playGame()).to.throw('Invalid Wickets');
    done();
  });

  /**
   * @description
   * 0 Runs
   */

  it('it should return Invalid Runs', (done) => {
    const cricketGame = new CricketGame(4, 4, 0, [
      [0, 1, 2, 3, 4, 5, 6, -1],
      ['Kirat Boli', 5, 30, 25, 10, 15, 1, 9, 5],
      ['N S Nodhi', 10, 40, 20, 5, 10, 1, 4, 10],
      ['R Rumarh', 20, 30, 15, 5, 5, 1, 4, 20],
      ['Shashi Henra', 30, 25, 5, 0, 5, 1, 4, 30]
    ]);
    expect(() => cricketGame.playGame()).to.throw('Invalid Runs');
    done();
  });

  /**
   * @description
   * Invalid Score Percentage
   */

  it('it should return Invalid Matrix', (done) => {
    const cricketGame = new CricketGame(4, 4, 40, [
      [0, 1, 2, 3, 4, 5, 6, -1],
      ['Kirat Boli', 5, 30, 25, 'a', 15, 1, 9, 5],
      ['N S Nodhi', 10, 40, 20, 5, 10, 1, 4, 10],
      ['R Rumarh', 20, 30, 15, 5, 5, 1, 4, 20],
      ['Shashi Henra', 30, 25, 5, 0, 5, 1, 4, 30]
    ]);
    expect(() => cricketGame.playGame()).to.throw(`Invalid Score for Batsman:${'Kirat Boli'} and hence breaking`);
    done();
  });
});

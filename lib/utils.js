#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

class Utils {
  static getArrayColumn(array, column) {
    return array.map(x => x[column]);
  }

  static getArrayRow(array, row) {
    return array[row];
  }

  static convertPercentageIntoDecimal(percentageArray) {
    const decimalWeight = percentageArray.map((x) => {
      return x / 100;
    });
    return decimalWeight;
  }

  static getRandomItem(list, weight) {
    const totalWeight = weight.reduce((prev, cur) => prev + cur);
    const randomNum = rand(0, totalWeight);
    let weightSum = 0;

    for (let i = 0; i < list.length; i += 1) {
      weightSum += weight[i];
      weightSum = +weightSum.toFixed(2);

      if (randomNum <= weightSum) {
        return list[i];
      }
    }
    return 0;
  }

  static validateNonNumericArray(array) {
    return array.some(s => isNaN(+s));
  }
}

exports.default = Utils;
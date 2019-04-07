

/**
 * Function to get a random number
 * @param {*} min 
 * @param {*} max 
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

/**
 *  returns 1 - 6 value
 */
function rollD6()
{
    return Math.ceil(getRandomArbitrary(0, 6));
}

/**
 *  returns 1 - 3 value
 */
function rollD3()
{
    return Math.ceil(getRandomArbitrary(0, 3));
}







exports.rollD6 = rollD6;
exports.rollD3 = rollD3;

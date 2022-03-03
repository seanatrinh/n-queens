/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other




/*
tree.value = a board with certain values on it
tree.children = [board with value + 1 more]

1. create an empty board
  How To - var myBoard = new Board(n)
2. create a potential child board
3. if child board has no conflicts, and counter of num rooks added does not equal n
  a. create a potential child board
  b. if this child board has no conflicts
  ...
  keep going until we reach n rooks

*/
window.findNRooksSolution = function(n) {
  var solution = new Board({n: n}); //fixme - update as a closure when valid board AND vaild N's
  var numOfRooks = 0;
  var innerFunc = function(solution) {
    var matrix = solution.rows();
    if (numOfRooks !== n) {
      // recursively call inner func to CHANGE solution
    }
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix.length; j++) {
        // if (solution.hasAnyRooksConflicts())
      }
    }
  };
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

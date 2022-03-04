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
  let solution = new Board({n: n});
  let rookCount = 0;
  let innerFunc = function(solution) {
    let rows = solution.rows();
    if (rookCount === n && !solution.hasAnyRooksConflicts()) {
      return solution;
    } else {
      let rowToAddTo = 0;
      for (let i = 0; i < rows.length; i++) {
        if (!rows[i].includes(1)) {
          rowToAddTo = i;
          break;
        }
      }
      for (let j = 0; j < rows.length; j++) {
        solution.togglePiece(rowToAddTo, j);
        if (!solution.hasAnyRooksConflicts()) {
          rookCount++;
          return innerFunc(solution);
        }
        solution.togglePiece(rowToAddTo, j);
      }
    }
  };
  innerFunc(solution);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

/*
create counter
instantiate a board
create inner function with row passed in (default 0)
  create alias for rows
  *** BASE CASE ***
  if row is equal to n
    increase counter
    return - brings us out of EC
  *** RECURSIVE CASE ***
  iterate over rows
    toggle piece at row and i
    if board is legal
      call inner function with row + 1 passed in
    untoggle piece
  call inner function
  return counter
*/
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var innerFunc = function(row = 0) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < board.rows().length; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        innerFunc(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  innerFunc();
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let board = new Board({n: n});
  let solution;
  if (n === 2 || n === 3) {
    return board.rows();
  }
  if (n === 0) {
    return board.rows();
  }
  var innerFunc = function(row = 0) {
    // create break case
    if (row === n) {
      solution = board.rows();
      return;
    }
    for (let j = 0; j < board.rows().length; j++) {
      board.togglePiece(row, j);
      if (!board.hasAnyQueensConflicts()) {
        innerFunc(row + 1);
      }
      if (solution !== undefined) {
        break;
      }
      board.togglePiece(row, j);
    }
  };
  // debugger;
  innerFunc();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
/*
create counter
instantiate a board
create inner function with row passed in (default 0)
  create alias for rows
  *** BASE CASE ***
  if row is equal to n
    increase counter
    return - brings us out of EC
  *** RECURSIVE CASE ***
  iterate over rows
    toggle piece at row and i
    if board is legal
      call inner function with row + 1 passed in
    untoggle piece
  call inner function
  return counter
*/
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({n: n});

  var innerFunc = function(row = 0) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (let i = 0; i < board.rows().length; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        innerFunc(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  innerFunc();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// let innerFunc = function(solution, rowToAddTo = 0) {

//   let rows = solution.rows();
//   if (queenCount === n && !solution.hasAnyQueensConflicts()) {
//     console.log(`Queen Count: ${queenCount}`);
//     return solution;
//   } else {
//     // let rowToAddTo = ro0;
//     // for (let i = 0; i < rows.length; i++) {
//     //   if (!rows[i].includes(1)) {
//     //     rowToAddTo = i;
//     //     break;
//     //   }
//     // }
//     for (let j = 0; j < rows.length; j++) {
//       solution.togglePiece(rowToAddTo, j);
//       if (!solution.hasAnyQueensConflicts()) {
//         queenCount++;
//         return innerFunc(solution, rowToAddTo + 1);
//       } else if (solution.hasAnyQueensConflicts() && j === rows.length - 1) {
//         return 0;
//       } else {
//         solution.togglePiece(rowToAddTo, j);
//       }
//     }
//   }
// };
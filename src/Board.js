// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    /*
          var matrix = [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    */

    hasRowConflictAt: function(rowIndex) {
      let row = this.rows()[rowIndex];
      let counter = 0;
      for (let i = 0; i < row.length; i++) {
        if (counter > 1) {
          return true;
        }
        if (row[i] === 1) {
          counter++;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let rows = this.rows();
      for (let i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let rows = this.rows();
      let counter = 0;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let rows = this.rows();
      for (let i = 0; i < rows.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // we need to get the first ROW and COLUMN index to know where to look
    // do we need to use _getFirstRowColumnIndexForMajorDiagonalOn?
    // do we pass in another parameter to this function?
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let rows = this.rows();
      let diagonalStart = _getFirstRowColumnIndexForMajorDiagonalOn(0, majorDiagonalColumnIndexAtFirstRow);
      let counter = 0;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][i + majorDiagonalColumnIndexAtFirstRow] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    // we need to check EVERY row/col combo where row is 0 or col is 0

    hasAnyMajorDiagonalConflicts: function() {
      // let rows = this.rows();
      // this one iterates over cols?
      // should cols one check the middle? How do we not check the middle again?
      // for (let i = 0; i < rows.length; i++) {
      //   if (this.hasMajorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }

      // TO DO: add hasMajorDiagonalConflictAt as a function in this function's scope, so we can see if our recursive logic works

      let conflictPresent = false;
      let innerFunc = function(rows) {
        for (var j = 0; j < rows.length; j++) {
          if (rows.hasMajorDiagonalConflictAt(j)) {
            conflictPresent = true;
          } else {
            innerFunc(rows.slice(1));
          }
        }
      };


      innerFunc(this.rows());
      return conflictPresent;
      // another one to iterate over rows? We have to increment which row its looking at though??
      // I have no idea :('
      // do we start this at one because the top function checked the top half?
      // for (var j = 0; j < rows.length; j++) {
      //   if (this.hasMajorDiagonalConflictAt(j)) {
      //     return true;
      //   }
      // }
      // return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let rows = this.rows();
      let counter = 0;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][minorDiagonalColumnIndexAtFirstRow - i] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

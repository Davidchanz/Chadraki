import {Figure} from "./Figure";
import {Dir} from "./Dir";
import {Constants} from "./Constants";

function getDiagonals(): Dir[]{
  return [
    <Dir>{move: [
        {i: 1, j: 1, eat: -1},
        {i: 2, j: 2, eat: -1},
        {i: 3, j: 3, eat: -1},
        {i: 4, j: 4, eat: -1},
        {i: 5, j: 5, eat: -1},
        {i: 6, j: 6, eat: -1},
        {i: 7, j: 7, eat: -1},
        {i: 8, j: 8, eat: -1},
      ]},
    <Dir>{move: [
        {i: -1, j: -1, eat: -1},
        {i: -2, j: -2, eat: -1},
        {i: -3, j: -3, eat: -1},
        {i: -4, j: -4, eat: -1},
        {i: -5, j: -5, eat: -1},
        {i: -6, j: -6, eat: -1},
        {i: -7, j: -7, eat: -1},
        {i: -8, j: -8, eat: -1},
      ]},
    <Dir>{move: [
        {i: -1, j: 1, eat: -1},
        {i: -2, j: 2, eat: -1},
        {i: -3, j: 3, eat: -1},
        {i: -4, j: 4, eat: -1},
        {i: -5, j: 5, eat: -1},
        {i: -6, j: 6, eat: -1},
        {i: -7, j: 7, eat: -1},
        {i: -8, j: 8, eat: -1},
      ]},
    <Dir>{move: [
        {i: 1, j: -1, eat: -1},
        {i: 2, j: -2, eat: -1},
        {i: 3, j: -3, eat: -1},
        {i: 4, j: -4, eat: -1},
        {i: 5, j: -5, eat: -1},
        {i: 6, j: -6, eat: -1},
        {i: 7, j: -7, eat: -1},
        {i: 8, j: -8, eat: -1},
      ]},
  ]
}

function  getLines(): Dir[]{
  return [
    <Dir>{move: [
        {i: 0, j: 1, eat: -1},
        {i: 0, j: 2, eat: -1},
        {i: 0, j: 3, eat: -1},
        {i: 0, j: 4, eat: -1},
        {i: 0, j: 5, eat: -1},
        {i: 0, j: 6, eat: -1},
        {i: 0, j: 7, eat: -1},
      ]},
    <Dir>{move: [
        {i: 0, j: -1, eat: -1},
        {i: 0, j: -2, eat: -1},
        {i: 0, j: -3, eat: -1},
        {i: 0, j: -4, eat: -1},
        {i: 0, j: -5, eat: -1},
        {i: 0, j: -6, eat: -1},
        {i: 0, j: -7, eat: -1},
      ]},
    <Dir>{move: [
        {i: -1, j: 0, eat: -1},
        {i: -2, j: 0, eat: -1},
        {i: -3, j: 0, eat: -1},
        {i: -4, j: 0, eat: -1},
        {i: -5, j: 0, eat: -1},
        {i: -6, j: 0, eat: -1},
        {i: -7, j: 0, eat: -1},
      ]},
    <Dir>{move: [
        {i: 1, j: 0, eat: -1},
        {i: 2, j: 0, eat: -1},
        {i: 3, j: 0, eat: -1},
        {i: 4, j: 0, eat: -1},
        {i: 5, j: 0, eat: -1},
        {i: 6, j: 0, eat: -1},
        {i: 7, j: 0, eat: -1},
      ]},
  ]
}

function getQuine(): Dir[]{
  let diagonals = getDiagonals();
  getLines().forEach(value => diagonals.push(value));
  return diagonals;
}

export class Figures {
  static pawn: Figure = new Figure('pawn.png', 1, [
    <Dir>{move: [{i: 0, j: 1, eat: 0}]},
    <Dir>{move: [{i: 1, j: 1, eat: 1}]},
    <Dir>{move: [{i: -1, j: 1, eat: 1}]}
  ], (board, piece) => {
    if (piece != null && piece.firstMove){
      return [<Dir>{move: [{i: 0, j: 2, eat: 0}]}]
    }else {
      return null;
    }
  });
  static bishop: Figure = new Figure('bishop.png', 3, getDiagonals());
  static knight: Figure = new Figure('knight.png', 3, [
    <Dir>{move: [
        {i: 2, j: 1, eat: -1},
      ]},
    <Dir>{move: [
        {i: 1, j: 2, eat: -1},
      ]},
    <Dir>{move: [
        {i: -2, j: 1, eat: -1},
      ]},
    <Dir>{move: [
        {i: -1, j: 2, eat: -1},
      ]},
    <Dir>{move: [
        {i: 2, j: -1, eat: -1},
      ]},
    <Dir>{move: [
        {i: 1, j: -2, eat: -1},
      ]},
    <Dir>{move: [
        {i: -2, j: -1, eat: -1},
      ]},
    <Dir>{move: [
        {i: -1, j: -2, eat: -1},
      ]},
  ]);
  static rock: Figure = new Figure('rock.png', 5, getLines());
  static quine: Figure = new Figure('quine.png', 8, getQuine());
  static king: Figure = new Figure('king.png', 0, [
    <Dir>{move: [{i: 0, j: 1, eat: -1}]},
    <Dir>{move: [{i: 1, j: 0, eat: -1}]},
    <Dir>{move: [{i: 1, j: 1, eat: -1}]},
    <Dir>{move: [{i: 0, j: -1, eat: -1}]},
    <Dir>{move: [{i: -1, j: 0, eat: -1}]},
    <Dir>{move: [{i: -1, j: -1, eat: -1}]},
    <Dir>{move: [{i: -1, j: 1, eat: -1}]},
    <Dir>{move: [{i: 1, j: -1, eat: -1}]},
  ], (board, piece) => {
    if(piece?.firstMove){
      let dirs: Dir[] = new Array<Dir>();
      for (let k = 0; k < board.pieces.length; k++) {
        let pi = board.pieces[k];
        if(pi != null){
          if(pi.figure == Figures.rock && pi.color == piece.color && pi.firstMove){
            if(piece.i > pi.i){
              let freeWay: boolean = true;
              for (let i = 1; i < piece.i; i++) {
                if(board.isPiece(i, piece.j)){
                  freeWay = false;
                  break;
                }
              }
              if(freeWay)
                if(board.isCastlePossible(piece, pi))
                  dirs.push(<Dir>{move: [{i: 2, j: 0, eat: 0, special: () => {
                    board.movePiece(piece, pi.i+1, pi.j);
                    board.movePiece(pi, pi.i+2, pi.j);
                  }}]})
            }
            if(piece.i < pi.i) {
              let freeWay: boolean = true;
              for (let i = piece.i+1; i < Constants.size-1; i++) {
                if(board.isPiece(i, piece.j)){
                  freeWay = false;
                  break;
                }
              }
              if(freeWay)
                if(board.isCastlePossible(piece, pi))
                  dirs.push(<Dir>{move: [{i: -2, j: 0, eat: 0, special: () => {
                      board.movePiece(piece, pi.i-1, pi.j);
                      board.movePiece(pi, pi.i-2, pi.j);
                  }}]})
            }
          }
        }
      }
      return dirs;
    }
    return null;
  });
}

import {Figure} from "./Figure";

export class Figures {
  static pawn: Figure = new Figure('pawn.png', 1, [
    {move: [{i: 0, j: 1, eat: 0}]},
    {move: [{i: 1, j: 1, eat: 1}]},
    {move: [{i: -1, j: 1, eat: 1}]}
  ], (board, piece) => {
    if (piece.firstMove){
      piece.figure.dirs.push({move: [{i: 0, j: 2, eat: 0}]})
    }else {

    }
  });
  static bishop: Figure = new Figure('bishop.png', 3, [
    {move: [
        {i: 1, j: 1, eat: -1},
        {i: 2, j: 2, eat: -1},
        {i: 3, j: 3, eat: -1},
        {i: 4, j: 4, eat: -1},
        {i: 5, j: 5, eat: -1},
        {i: 6, j: 6, eat: -1},
        {i: 7, j: 7, eat: -1},
      ]},
    {move: [
        {i: -1, j: -1, eat: -1},
        {i: -2, j: -2, eat: -1},
        {i: -3, j: -3, eat: -1},
        {i: -4, j: -4, eat: -1},
        {i: -5, j: -5, eat: -1},
        {i: -6, j: -6, eat: -1},
        {i: -7, j: -7, eat: -1},
      ]},
    {move: [
        {i: -1, j: 1, eat: -1},
        {i: -2, j: 2, eat: -1},
        {i: -3, j: 3, eat: -1},
        {i: -4, j: 4, eat: -1},
        {i: -5, j: 5, eat: -1},
        {i: -6, j: 6, eat: -1},
        {i: -7, j: 7, eat: -1},
      ]},
    {move: [
        {i: 1, j: -1, eat: -1},
        {i: 2, j: -2, eat: -1},
        {i: 3, j: -3, eat: -1},
        {i: 4, j: -4, eat: -1},
        {i: 5, j: -5, eat: -1},
        {i: 6, j: -6, eat: -1},
        {i: 7, j: -7, eat: -1},
      ]},
  ]);
  static knight: Figure = new Figure('knight.png', 3, [
    {move: [
        {i: 2, j: 1, eat: -1},
      ]},
    {move: [
        {i: 1, j: 2, eat: -1},
      ]},
    {move: [
        {i: -2, j: 1, eat: -1},
      ]},
    {move: [
        {i: -1, j: 2, eat: -1},
      ]},
    {move: [
        {i: 2, j: -1, eat: -1},
      ]},
    {move: [
        {i: 1, j: -2, eat: -1},
      ]},
    {move: [
        {i: -2, j: -1, eat: -1},
      ]},
    {move: [
        {i: -1, j: -2, eat: -1},
      ]},
  ]);
  static rock: Figure = new Figure('rock.png', 5, [
    {move: [
        {i: 0, j: 1, eat: -1},
        {i: 0, j: 2, eat: -1},
        {i: 0, j: 3, eat: -1},
        {i: 0, j: 4, eat: -1},
        {i: 0, j: 5, eat: -1},
        {i: 0, j: 6, eat: -1},
        {i: 0, j: 7, eat: -1},
      ]},
    {move: [
        {i: 0, j: -1, eat: -1},
        {i: 0, j: -2, eat: -1},
        {i: 0, j: -3, eat: -1},
        {i: 0, j: -4, eat: -1},
        {i: 0, j: -5, eat: -1},
        {i: 0, j: -6, eat: -1},
        {i: 0, j: -7, eat: -1},
      ]},
    {move: [
        {i: -1, j: 0, eat: -1},
        {i: -2, j: 0, eat: -1},
        {i: -3, j: 0, eat: -1},
        {i: -4, j: 0, eat: -1},
        {i: -5, j: 0, eat: -1},
        {i: -6, j: 0, eat: -1},
        {i: -7, j: 0, eat: -1},
      ]},
    {move: [
        {i: 1, j: 0, eat: -1},
        {i: 2, j: 0, eat: -1},
        {i: 3, j: 0, eat: -1},
        {i: 4, j: 0, eat: -1},
        {i: 5, j: 0, eat: -1},
        {i: 6, j: 0, eat: -1},
        {i: 7, j: 0, eat: -1},
      ]},
  ]);
  static quine: Figure = new Figure('quine.png', 8, [
    {move: [
        {i: 0, j: 1, eat: -1},
        {i: 0, j: 2, eat: -1},
        {i: 0, j: 3, eat: -1},
        {i: 0, j: 4, eat: -1},
        {i: 0, j: 5, eat: -1},
        {i: 0, j: 6, eat: -1},
        {i: 0, j: 7, eat: -1},
      ]},
    {move: [
        {i: 0, j: -1, eat: -1},
        {i: 0, j: -2, eat: -1},
        {i: 0, j: -3, eat: -1},
        {i: 0, j: -4, eat: -1},
        {i: 0, j: -5, eat: -1},
        {i: 0, j: -6, eat: -1},
        {i: 0, j: -7, eat: -1},
      ]},
    {move: [
        {i: -1, j: 0, eat: -1},
        {i: -2, j: 0, eat: -1},
        {i: -3, j: 0, eat: -1},
        {i: -4, j: 0, eat: -1},
        {i: -5, j: 0, eat: -1},
        {i: -6, j: 0, eat: -1},
        {i: -7, j: 0, eat: -1},
      ]},
    {move: [
        {i: 1, j: 0, eat: -1},
        {i: 2, j: 0, eat: -1},
        {i: 3, j: 0, eat: -1},
        {i: 4, j: 0, eat: -1},
        {i: 5, j: 0, eat: -1},
        {i: 6, j: 0, eat: -1},
        {i: 7, j: 0, eat: -1},
      ]},
    {move: [
        {i: 1, j: 1, eat: -1},
        {i: 2, j: 2, eat: -1},
        {i: 3, j: 3, eat: -1},
        {i: 4, j: 4, eat: -1},
        {i: 5, j: 5, eat: -1},
        {i: 6, j: 6, eat: -1},
        {i: 7, j: 7, eat: -1},
      ]},
    {move: [
        {i: -1, j: -1, eat: -1},
        {i: -2, j: -2, eat: -1},
        {i: -3, j: -3, eat: -1},
        {i: -4, j: -4, eat: -1},
        {i: -5, j: -5, eat: -1},
        {i: -6, j: -6, eat: -1},
        {i: -7, j: -7, eat: -1},
      ]},
    {move: [
        {i: -1, j: 1, eat: -1},
        {i: -2, j: 2, eat: -1},
        {i: -3, j: 3, eat: -1},
        {i: -4, j: 4, eat: -1},
        {i: -5, j: 5, eat: -1},
        {i: -6, j: 6, eat: -1},
        {i: -7, j: 7, eat: -1},
      ]},
    {move: [
        {i: 1, j: -1, eat: -1},
        {i: 2, j: -2, eat: -1},
        {i: 3, j: -3, eat: -1},
        {i: 4, j: -4, eat: -1},
        {i: 5, j: -5, eat: -1},
        {i: 6, j: -6, eat: -1},
        {i: 7, j: -7, eat: -1},
      ]},
  ]);
  static king: Figure = new Figure('king.png', 0, [
    {move: [{i: 0, j: 1, eat: 0}]},
    {move: [{i: 1, j: 0, eat: 0}]},
    {move: [{i: 1, j: 1, eat: 0}]},
    {move: [{i: 0, j: -1, eat: 0}]},
    {move: [{i: -1, j: 0, eat: 0}]},
    {move: [{i: -1, j: -1, eat: 0}]},
    {move: [{i: -1, j: 1, eat: 0}]},
    {move: [{i: 1, j: -1, eat: 0}]},
  ]);
}

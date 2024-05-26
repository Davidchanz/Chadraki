import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {State} from "./State";
import {Board} from "./board/Board";

@Injectable({
  providedIn: 'root'
})
export class Multiplayer {

  turn: boolean = true;

  constructor(private http: HttpClient) {

  }

  getState(): Observable<State>{
    return new Observable<State>(subscriber => {
      if(this.turn)
        subscriber.next(new State('white', true));
      else
        subscriber.next(new State('black', false));
    });
  }

  sendTurn(board: Board){
    this.turn = !this.turn;
  }
}

import { Injectable } from '@angular/core';


declare const io: any;

declare const ace: any;

@Injectable({
  providedIn: 'root'
})
export class CollabrativeEditService {
  socket: any;
  clientsInfo: Object= {};
  clientNum = 0;
  COLORS: string[] = [
    "red",
    "green",
    "yellow",
    "blue",
    "brown"
  ];

  init(editor: any, sessionId: string): void {
    this.socket = io(window.location.origin, {query: 'sessionId='+sessionId});
    this.socket.on('change', (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
    this.socket.on('cursorMove', (cursor) => {
      console.log('cursor move: ' + cursor);
      const session = editor.getSession();
      cursor = JSON.parse(cursor);
      const row = cursor['row'];
      const col = cursor['column'];
      const changeClientId = cursor['socketId'];
      
      if (changeClientId in this.clientsInfo) {
        session.removeMarker(this.clientsInfo[changeClientId]['marker']);
      } else {
        this.clientsInfo[changeClientId] = {};
        const css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = '.editor_cursor_' + changeClientId
           + '{ position: absolute; background: ' + this.COLORS[this.clientNum] + ';'
          + 'z-index: 100; width: 3px !important; }';
        document.body.appendChild(css);
        this.clientNum++;
      }

      const Range = ace.require('ace/range').Range;
      const newMarker = session.addMarker(new Range(row, col, row, col+1),
                                          'editor_cursor_' + changeClientId,
                                          true);
      this.clientsInfo[changeClientId]['marker'] = newMarker;
    });

  }

  change(delta: string){
    this.socket.emit("change", delta);
  }

  cursorMove(cursor: string) {
    this.socket.emit("cursorMove", cursor);
  }

  buffer(): void {
    console.log("update");
    this.socket.emit("update");
  }
}

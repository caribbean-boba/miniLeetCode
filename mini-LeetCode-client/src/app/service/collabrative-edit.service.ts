import { Injectable } from '@angular/core';


declare const io: any;

@Injectable({
  providedIn: 'root'
})
export class CollabrativeEditService {
  socket: any;
  constructor() { }

  init(editor: any, sessionId: string): void {
    this.socket = io(window.location.origin, { query: 'sessionId=' + sessionId});
    this.socket.on("change", (delta: string) => {
      console.log('collabration: editor changeds by' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    })
  }

  change(delta: string){
    this.socket.emit("change", delta);
  }
}

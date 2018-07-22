import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


declare const ace: any;

@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
export class AceEditorComponent implements OnInit {
  editor: any;
  initialText = {
    'Java': `public class Solution{
    public static void main(String[] args) {
        }
    }`,
    'Python': `python does not work in this version`
  };
  languageOptions: string[]  = ['Java', 'Python'];
  language: string = "Java";
  themeOptions: string[]  = ['eclipse', 'monokai', 'twilight'];
  theme: string = "eclipse";
  sessionId: string;

  constructor(@Inject("CollabrativeEditService") private CollabrativeEditService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.editor = ace.edit('editor');
      this.reset();
      document.getElementsByTagName('textarea')[0].focus();
      this.CollabrativeEditService.init(this.editor, this.sessionId);
      this.editor.lastAppliedChange = null;

      this.editor.on('change', (event) => {
        console.log('editor changes: ' + JSON.stringify(event));
        if (this.editor.lastAppliedChange != event) {
          this.CollabrativeEditService.change(JSON.stringify(event));
        }
      });
      this.editor.getSession().getSelection().on("changeCursor", () => {
        let cursor = this.editor.getSession().getSelection().getCursor();
        console.log("cursor move" + JSON.stringify(cursor));
        this.CollabrativeEditService.cursorMove(JSON.stringify(cursor));
      })

      this.CollabrativeEditService.buffer();
    })
  }

  setLanguage(language: string): void {
    this.language = language;
    this.reset();
  }

  setTheme(theme: string): void {
    this.theme = theme;
    this.reset();
  }

  reset(): void {
    this.editor.getSession().setMode('ace/mode/' + this.language.toLocaleLowerCase());
    this.editor.setTheme("ace/theme/"+this.theme.toLocaleLowerCase());
    this.editor.setValue(this.initialText[this.language]);
  }

  submit(): void {
    let code = this.editor.getValue();
    console.log(code);
  }

}

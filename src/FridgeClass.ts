import { Note } from "./NoteClass";

const btnAddNote = document.getElementById("add--note");

export class Fridge {
  id: string;
  name: string;
  all_notes: number;
  now_notes: number;
  arrNotes: Array<Note> = [];

  constructor(config: {
    id: string;
    name: string;
    all_notes: string;
    now_notes: string;
    array_notes: string;
  }) {
    this.id = config.id;
    this.name = config.name;
    this.all_notes = parseInt(config.all_notes);
    this.now_notes = parseInt(config.now_notes);
    this.arrNotes = JSON.parse(config.array_notes);

    // const configArray = JSON.parse(config.array_notes.replace(/[\r\n]/gm, ""));
    // if (configArray.length > 0) {
    //   for (let i = 0; i < configArray.length; i++) {}
    // }
  }
  public createNotes() {
    btnAddNote?.addEventListener("click", () => {
      this.all_notes++;
      this.now_notes++;
      const note = new Note(this);
      this.arrNotes.push(note);
      this.updateDb();
      note.openEditor();
    });
  }
  public updateDb() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../dist/php/dbUpdate.php", true);

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let returnData = this.responseText;
        console.log(returnData);
      }
    };

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let xhttpSendString: string = "";
    xhttpSendString += "name=" + this.name;
    xhttpSendString += "&all_notes=" + this.all_notes;
    xhttpSendString += "&now_notes=" + this.now_notes;
    const tmp = [];
    for (let i = 0; i < this.arrNotes.length; i++) {
      const obj = {
        width: this.arrNotes[i].width,
        height: this.arrNotes[i].height,
        offSetX: this.arrNotes[i].offSetX,
        offSetY: this.arrNotes[i].offSetY,
        text: this.arrNotes[i].contentText.innerHTML,
      };

      tmp.push(obj);
    }

    xhttpSendString += "&array_notes=" + JSON.stringify(tmp);

    console.log(xhttpSendString);

    xhttp.send(xhttpSendString);
  }
}

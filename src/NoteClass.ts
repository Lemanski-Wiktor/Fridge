import tinymce from "../node_modules/tinymce/tinymce";
import { Fridge } from "./FridgeClass";

const notesArea = document.getElementById("notes--area");
const elContainer = document.getElementById("container");

let elAllNotes = document.getElementById("notes--all");
let elNowNotes = document.getElementById("notes--now");
let id = 0;

export class Note {
  isDragging = false;
  dragTarget: HTMLDivElement;
  lastOffsetX = 0;
  lastOffsetY = 0;
  width = 120;
  height = 50;
  offSetX = 0;
  offSetY = 0;
  fridge: Fridge = null;

  note: HTMLDivElement;
  readonly html = `<input type="image" src="../dist/images/edit.png" class="edit--note"/>
  <img src="../dist/images/close.png" alt="photo" class="delete--note"></img>
  <img src="../dist/images/resize.png" alt="photo" class="resize--note"></img>`;

  contentText = document.createElement("div");

  constructor(
    fridge: Fridge,
    config?: {
      width: string;
      height: string;
      offSetX: string;
      offSetY: string;
      text: string;
    }
  ) {
    id++;
    this.fridge = fridge;
    if (config) {
      this.width = parseInt(config.width);
      this.height = parseInt(config.height);
      this.offSetX = parseInt(config.offSetX);
      this.offSetY = parseInt(config.offSetX);
    }

    this.note = document.createElement("div");
    this.note.classList.add("note");
    this.contentText.innerHTML = "<p id='pText'>Hello World!</p>";

    this.note.setAttribute("id", `note${id}`);
    this.note.innerHTML = this.html;
    this.contentText.classList.add("edited--text");
    notesArea?.append(this.note);
    this.position(this.note);
    this.note.appendChild(this.contentText);
    this.applyDeleteNotes();
    this.makeDrag();
    this.makeResizable();
    this.changeMov();
  }

  private changeMov() {
    elAllNotes!.textContent = `Przebieg: ${this.fridge.all_notes}`;
    elNowNotes!.textContent = `Na lodówce: ${this.fridge.now_notes}`;
  }
  private position(note: HTMLDivElement) {
    this.note.style.left = 150 + Math.round(Math.random() * 50) + "px";
    note.style.top = 50 + Math.round(Math.random() * 50) + "px";
  }
  private deleteNote(el: Event) {
    ((el.target as HTMLElement).parentNode as HTMLElement).remove();
    this.changeMov();
    this.fridge.arrNotes.splice(this.fridge.arrNotes.indexOf(this), 1);
    this.fridge.updateDb();
  }
  private applyDeleteNotes() {
    const btnDelete = this.note.children[1];
    // let btnDeleteNote = document.querySelectorAll(".delete--note");
    // btnDeleteNote.forEach((btn) => {
    btnDelete.addEventListener("click", (e) => {
      this.fridge.now_notes--;
      this.deleteNote(e);

      // for(let i=0; i<this.fridge.arrNotes.length;i++){
      //   if(this.fridge.arrNotes[i].note == this.note){
      //     this.fridge.arrNotes.
      //   }
      // }
    });
    // });
  }
  private drag = (e: MouseEvent) => {
    if (!this.isDragging) return;
    // (this.note.lastChild as HTMLDivElement).style.display = "none";
    this.dragTarget.style.left = e.clientX - this.lastOffsetX + "px";
    this.dragTarget.style.top = e.clientY - this.lastOffsetY + "px";
    this.offSetX = e.clientX - this.lastOffsetX;
    this.offSetY = e.clientY - this.lastOffsetY;
  };
  private makeDrag() {
    // document
    //   .querySelector(".edited--text")
    //   .addEventListener("mouseover", () => {
    //     (this.note.lastChild as HTMLDivElement).style.display = "none";
    //   });
    // document.querySelector(".edited--text").addEventListener("mouseout", () => {
    //   (this.note.lastChild as HTMLDivElement).style.display = "block";
    // });
    window.addEventListener("mousedown", (e) => {
      if (!(e.target as HTMLDivElement).classList.contains("note")) {
        return;
      }
      // (this.note.lastChild as HTMLDivElement).style.display = "none";
      this.dragTarget = e.target as HTMLDivElement;
      this.dragTarget.parentNode.append(this.dragTarget);
      this.lastOffsetX = e.offsetX;
      this.lastOffsetY = e.offsetY;
      this.isDragging = true;
      // fridge.updateDb();
    });
    window.addEventListener("mousemove", this.drag);
    const closeDragging = () => {
      this.isDragging = false;
      window.removeEventListener("mouseup", closeDragging);
    };
    window.addEventListener("mouseup", () => {
      closeDragging();
      this.fridge.updateDb();

      // (this.note.lastChild as HTMLDivElement).style.display = "block";
    });
  }
  private makeResizable() {
    let original_width = 0;
    let original_height = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    let minSize = 100;
    let maxSize = 500;

    const noteT = this;
    const noteP = this.note;
    const currentDelete = this.note.children[1];
    const currentResizer = this.note.children[2];

    currentResizer.addEventListener("mousedown", function (e: MouseEvent) {
      e.preventDefault();
      original_width = parseFloat(
        getComputedStyle(noteP as HTMLElement, null)
          .getPropertyValue("width")
          .replace("px", "")
      );
      original_height = parseFloat(
        getComputedStyle(noteP as HTMLElement, null)
          .getPropertyValue("height")
          .replace("px", "")
      );
      original_mouse_x = (e as MouseEvent).pageX;
      original_mouse_y = (e as MouseEvent).pageY;
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResize);
    });

    const resize = function (e: MouseEvent) {
      const width = original_width + (e.pageX - original_mouse_x);
      const height = original_height + (e.pageY - original_mouse_y);

      if (width > minSize && width < maxSize) {
        noteP.style.width = width + "px";
        noteT.width = width;
        (currentDelete! as HTMLDivElement).style.left = `${width - 30}px`;
        (currentResizer! as HTMLDivElement).style.left = `${width - 20}px`;
      }
      if (height > minSize && height < maxSize) {
        noteP.style.height = height + "px";
        noteT.height = height;
        (currentResizer! as HTMLDivElement).style.top = `${height - 20}px`;
        (noteP.children[3] as HTMLDivElement).style.maxHeight = `${
          height - 80
        }px`;
      }
    };
    const stopResize = function () {
      window.removeEventListener("mousemove", resize);
      noteT.fridge.updateDb();
    };
  }
  public openEditor() {
    const noteP = this.note;
    noteP.children[0].setAttribute("id", `open--editor${id}`);
    const editArea = document.createElement("textarea");
    editArea.classList.add("editor--area");
    editArea.setAttribute("id", `editorOne`);

    let btnOpenEditor = document.querySelector(`#open--editor${id}`);
    btnOpenEditor.addEventListener("click", () => {
      editArea.textContent = this.contentText.innerHTML;
      elContainer.appendChild(editArea);
      tinymce.init({
        selector: `#editorOne`,
        height: "100vh",
        width: "100vw",
        init_instance_callback: () => {
          (document.querySelector(".tox") as HTMLDivElement).style.zIndex =
            "100";
          (document.querySelector(".tox") as HTMLDivElement).style.top =
            "-10vh";
          (
            document.querySelector(".tox-statusbar__branding") as HTMLDivElement
          ).style.display = "none";
          (
            document.querySelector(
              ".tox-statusbar__resize-handle"
            ) as HTMLDivElement
          ).style.display = "none";

          const statusBar = document.querySelector(".tox-statusbar");
          const btnClose = document.createElement("button");
          btnClose.innerHTML =
            '<img src="../dist/images/close.png" alt="photo" class="close--editor"></img>';
          const btnSave = document.createElement("button");
          btnSave.innerHTML =
            '<img src="../dist/images/save.png" alt="photo" class="save--editor"></img>';

          statusBar.appendChild(btnClose);
          statusBar.appendChild(btnSave);

          btnClose.addEventListener("click", () => {
            tinymce.get(`editorOne`).setContent(this.contentText.innerHTML);
            tinymce.remove();
            elContainer.removeChild(editArea);
          });
          btnSave.addEventListener("click", () => {
            const editedText = tinymce.get(`editorOne`).getContent();
            this.contentText.innerHTML = editedText;
            tinymce.remove();
            elContainer.removeChild(editArea);
            this.fridge.updateDb();
          });
        },
      });
    });
  }
}

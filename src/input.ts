type Callback = () => void;

export class Keyboard {
  public keyCallback: { [keyCode: number]: Callback } = {};
  public keyDown: { [keyCode: number]: boolean } = {};

  constructor() {
    document.addEventListener('keydown', this.keyboardDown);
    document.addEventListener('keyup', this.keyboardUp);
  }

  public keyboardDown(event: KeyboardEvent): void {
    event.preventDefault();
    this.keyDown[event.keyCode] = true;
  }

  public keyboardUp(event: KeyboardEvent): void {
    this.keyDown[event.keyCode] = false;
  }

  public addKeyCodeCallback(keyCode: number, f: Callback): void {
    this.keyCallback[keyCode] = f;
    this.keyDown[keyCode] = false;
  }
}
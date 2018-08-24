type Callback = () => void;

type KeyCode = number;

export class Keyboard {
  public keyCallback: Map<KeyCode, Callback> = new Map<KeyCode, Callback>();
  public keyDown: Map<KeyCode, boolean> = new Map<KeyCode, boolean>();


  constructor() {
    document.addEventListener('keydown', this.keyboardDown);
    document.addEventListener('keyup', this.keyboardUp);
  }

  public keyboardDown(event: KeyboardEvent): void {
    event.preventDefault();
    this.keyDown.set(event.keyCode, true);
  }

  public keyboardUp(event: KeyboardEvent): void {
    this.keyDown.set(event.keyCode, false);
  }

  public addKeyCodeCallback(keyCode: number, f: Callback): void {
    this.keyCallback.set(keyCode, f);
    this.keyDown.set(keyCode, false);
  }

  public inputLoop(): void {
    this.keyDown.forEach((isDown, keyCode) => {
      if (isDown) {
        const callback = this.keyCallback.get(keyCode);
        if (callback) {
          callback();
        }
      }
    });
  }
}
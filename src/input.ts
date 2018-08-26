type Callback = () => void;

type KeyCode = number;

export enum Key {
  Up = 38,
  Down = 40,
  Left = 37,
  Right = 39,
  A = 65,
  D = 68,
  S = 83,
  W = 87,
  Space = 32,
}

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
/**
 * FishingSystem — simple minigame state machine.
 *
 * States:
 *   idle      → player presses E near pond → casting
 *   casting   → random wait (2–5s) → biting
 *   biting    → player presses E within reaction window → success / fail
 *   success   → item added to inventory, brief feedback → idle
 *   fail      → fish escaped, brief feedback → idle
 */

export type FishingState = 'idle' | 'casting' | 'biting' | 'success' | 'fail';

export interface FishingResult {
  caught: boolean;
  itemKey: string;
}

/** Callback fired when fishing state changes. */
export type FishingStateListener = (state: FishingState, data?: FishingResult) => void;

export class FishingSystem {
  private state: FishingState = 'idle';
  private timer: ReturnType<typeof setTimeout> | null = null;
  private readonly listeners: FishingStateListener[] = [];

  /** Minimum and maximum wait before a fish bites (ms). */
  private readonly biteCooldownMin = 2000;
  private readonly biteCooldownMax = 5000;

  /** How long the player has to react once a fish bites (ms). */
  private readonly reactionWindowMs = 1200;

  get currentState(): FishingState { return this.state; }
  get isActive(): boolean { return this.state !== 'idle'; }

  onStateChange(listener: FishingStateListener): void {
    this.listeners.push(listener);
  }

  /** Player initiates fishing (press E at pond). */
  startFishing(): void {
    if (this.state !== 'idle') return;
    this.transition('casting');

    const wait = this.biteCooldownMin +
      Math.random() * (this.biteCooldownMax - this.biteCooldownMin);
    this.timer = setTimeout(() => this.bite(), wait);
  }

  /**
   * Player reacts (press E again).
   * Returns true if the press was relevant (during biting window).
   */
  react(): boolean {
    if (this.state === 'casting') {
      // Early press — cancel fishing.
      this.cancel();
      return true;
    }
    if (this.state === 'biting') {
      this.clearTimer();
      this.resolve(true);
      return true;
    }
    return false;
  }

  cancel(): void {
    this.clearTimer();
    this.transition('idle');
  }

  // -------------------------------------------------------------------------
  private bite(): void {
    this.transition('biting');
    this.timer = setTimeout(() => {
      // Player did not react in time.
      this.resolve(false);
    }, this.reactionWindowMs);
  }

  private resolve(caught: boolean): void {
    this.clearTimer();
    const result: FishingResult = { caught, itemKey: caught ? 'fish-common' : '' };
    this.transition(caught ? 'success' : 'fail', result);

    // Return to idle after showing result.
    this.timer = setTimeout(() => this.transition('idle'), 1500);
  }

  private transition(next: FishingState, data?: FishingResult): void {
    this.state = next;
    this.listeners.forEach(fn => fn(next, data));
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /** Must be called when scene shuts down to avoid dangling timers. */
  destroy(): void {
    this.clearTimer();
    this.listeners.length = 0;
  }
}

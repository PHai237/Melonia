/** A prototype-only clock; 150 real minutes / game day is NOT a locked design decision. */
export class WorldClock {
  private elapsedMs = 0;
  constructor(readonly realMinutesPerGameDay = 150, readonly startHour = 8) {}

  tick(realDeltaMs: number): void {
    this.elapsedMs += Math.max(0, realDeltaMs);
  }

  get hour(): number {
    const gameHours = (this.elapsedMs / (this.realMinutesPerGameDay * 60_000)) * 24;
    return (this.startHour + gameHours) % 24;
  }

  get day(): number {
    const elapsedGameDays = this.elapsedMs / (this.realMinutesPerGameDay * 60_000);
    return Math.floor((this.startHour / 24) + elapsedGameDays) + 1;
  }

  get label(): string {
    const h = Math.floor(this.hour);
    const m = Math.floor((this.hour - h) * 60);
    return `Ngày ${this.day} · ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
}

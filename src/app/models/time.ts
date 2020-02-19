export class Time {
    private hours: number = 0;
    private minutes: number = 0;

    public get Hours() {
        return this.hours;
    }

    public set Hours(hours: number) {
        this.hours = hours;
    }

    public get Minutes() {
        return this.minutes;
    }

    public set Minutes(minutes: number) {
        if (minutes >= 60) {
            this.hours += Math.floor(minutes / 60);
        }
        this.minutes = minutes % 60;
    }

    constructor(minutes: number) {
        this.Minutes = minutes;
    }

    public getTimeToMinutes(): number {
        return this.hours * 60 + this.minutes;
    }
}

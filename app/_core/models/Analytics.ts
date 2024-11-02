import { Konect } from "./Konect";
export default class Analytics {
    konects: Konect[];

    constructor(konects: Konect[]) {
        this.konects = konects;
    }

    private calculatePercentageChange(
        current: number,
        previous: number,
    ): number {
        if (previous === 0) return current === 0 ? 0 : 100;
        return ((current - previous) / previous) * 100;
    }

    private filterKonectsByDate(startDate: Date, endDate?: Date): Konect[] {
        return this.konects.filter(
            (k) =>
                k.created_at >= startDate &&
                (!endDate || k.created_at < endDate),
        );
    }

    get weeklyDrop(): {
        thisWeekClicks: number;
        lastWeekClicks: number;
        percentageChange: number;
    } {
        const now = new Date();
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);

        const thisWeekClicks = this.filterKonectsByDate(lastWeek).length;

        const previousWeek = new Date(lastWeek);
        previousWeek.setDate(previousWeek.getDate() - 7);

        const lastWeekClicks = this.filterKonectsByDate(
            previousWeek,
            lastWeek,
        ).length;

        return {
            thisWeekClicks,
            lastWeekClicks,
            percentageChange: this.calculatePercentageChange(
                thisWeekClicks,
                lastWeekClicks,
            ),
        };
    }

    get monthlyDrop(): {
        thisMonthClicks: number;
        lastMonthClicks: number;
        percentageChange: number;
    } {
        const now = new Date();
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1);

        const thisMonthClicks = this.filterKonectsByDate(
            new Date(now.getFullYear(), now.getMonth(), 1),
        ).length;
        const lastMonthClicks = this.filterKonectsByDate(
            new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
            new Date(now.getFullYear(), now.getMonth(), 1),
        ).length;

        return {
            thisMonthClicks,
            lastMonthClicks,
            percentageChange: this.calculatePercentageChange(
                thisMonthClicks,
                lastMonthClicks,
            ),
        };
    }

    get threeMonthDrop(): {
        thisMonthClicks: number;
        threeMonthClicks: number;
        percentageChange: number;
    } {
        const now = new Date();
        const threeMonthsAgo = new Date(now);
        threeMonthsAgo.setMonth(now.getMonth() - 3);

        const thisMonthClicks = this.filterKonectsByDate(
            new Date(now.getFullYear(), now.getMonth(), 1),
        ).length;
        const threeMonthClicks = this.filterKonectsByDate(
            threeMonthsAgo,
            new Date(now.getFullYear(), now.getMonth(), 1),
        ).length;

        return {
            thisMonthClicks,
            threeMonthClicks,
            percentageChange: this.calculatePercentageChange(
                thisMonthClicks,
                threeMonthClicks,
            ),
        };
    }
}

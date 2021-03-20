<template>
    <div class="CountDown" loaded>
        <div class="CountDown__num" id="days">
            <span class="CountDown__num--time">{{ displayDays }}</span>
            <span class="CountDown__num--unit"> days</span>
        </div>
        <span class="CountDown__num--colon">:</span>
        <div class="CountDown__num">
            <span class="CountDown__num--time">{{ displayHours }}</span>
            <span class="CountDown__num--unit"> hrs</span>
        </div>
        <span class="CountDown__num--colon">:</span>
        <div class="CountDown__num">
            <span class="CountDown__num--time">{{ displayMinutes }}</span>
            <span class="CountDown__num--unit"> mins</span>
        </div>
        <span class="CountDown__num--colon">:</span>
        <div class="CountDown__num">
            <span class="CountDown__num--time">{{ displaySeconds }}</span>
            <span class="CountDown__num--unit"> secs</span>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "CountDown",
    props: ["endAt", "id"],

    data() {
        return {
            displayDays: 0,
            displayHours: 0,
            displayMinutes: 0,
            displaySeconds: 0,
            loaded: false,
            expired: false,
        };
    },
    computed: {
        _seconds: () => 1000,
        _minutes() {
            return this._seconds * 60;
        },
        _hours() {
            return this._minutes * 60;
        },
        _days() {
            return this._hours * 24;
        },
        END() {
            return new Date(this.endAt);
        },
    },
    mounted() {
        this.showRemaining();
    },
    methods: {
        ...mapMutations(["changeIDToEnded"]),
        // from: https://github.com/tyler-morales/countdown
        formatNum: (num) => (num < 10 ? "0" + num : num),
        showRemaining() {
            const TIMER = setInterval(() => {
                const NOW = new Date();
                const DISTANCE = this.END.getTime() - NOW.getTime();
                if (DISTANCE < 0) {
                    clearInterval(TIMER);
                    this.expired = true;
                    this.loaded = true;
                    this.changeIDToEnded(this.id);
                    return;
                }
                const DAYS = Math.floor(DISTANCE / this._days);
                const HOURS = Math.floor((DISTANCE % this._days) / this._hours);
                const MINUTES = Math.floor(
                    (DISTANCE % this._hours) / this._minutes
                );
                const SECONDS = Math.floor(
                    (DISTANCE % this._minutes) / this._seconds
                );
                this.displayMinutes = this.formatNum(MINUTES);
                this.displaySeconds = this.formatNum(SECONDS);
                this.displayHours = this.formatNum(HOURS);
                this.displayDays = this.formatNum(DAYS);
                this.loaded = true;
            }, 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
.CountDown {
    display: flex;
    color: var(--redError);
    justify-content: center;
    font-size: 20px;
    font-weight: 800;
    padding: 0;
    margin: 0;
    &__num {
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 0 8px;

        &--unit {
            font-weight: 400;
            font-size: 16px;
        }
    }
}
#days {
    padding-left: 0;
}
</style>

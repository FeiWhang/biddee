<template>
    <div class="NewItemTime">
        <div class="EndBox">
            <p>End:</p>
            <v-btn
                color="#f8f8f8"
                class="ma-0 pa-0 black--text font-weight-medium"
                @click="
                    showEndDatePicker = !showEndDatePicker;
                    showEndDatePicker ? (showEndTimePicker = false) : null;
                "
                dense
                width="140px"
                rounded
            >
                {{ formattedEndDate }}
                <v-icon right color="#c8c8c8">
                    mdi-calendar-today
                </v-icon>
            </v-btn>
            <div class="DatePicker">
                <v-scale-transition origin="top left">
                    <v-date-picker
                        v-click-outside="onClickOutsideEndDate"
                        @click:date="onClickOutsideEndDate"
                        :min="minEndDate()"
                        :max="maxEndDate()"
                        v-if="showEndDatePicker"
                        v-model="endDate"
                        color="#1080c5"
                        :no-title="true"
                        elevation="8"
                        width="308px"
                    ></v-date-picker>
                </v-scale-transition>
            </div>
            <v-btn
                color="#f8f8f8"
                class="ml-2 pa-0 black--text font-weight-medium"
                @click="
                    showEndTimePicker = !showEndTimePicker;
                    showEndTimePicker ? (showEndDatePicker = false) : null;
                "
                dense
                width="104px"
                rounded
            >
                {{ endTime }}
                <v-icon right color="#c8c8c8">
                    mdi-clock-time-four-outline
                </v-icon>
            </v-btn>
            <div class="TimePicker">
                <v-scale-transition origin="top right">
                    <v-time-picker
                        v-click-outside="onClickOutsideEndTime"
                        v-if="showEndTimePicker"
                        v-model="endTime"
                        :min="minEndTime()"
                        type="month"
                        color="#1080c5"
                        class="ml-4"
                        :no-title="true"
                        elevation="8"
                        width="308px"
                    ></v-time-picker>
                </v-scale-transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewItemTime",
    data() {
        return {
            today: "",
            formattedToday: "",
            nowTime: "",
            formattedEndDate: "",
            showEndDatePicker: false,
            showEndTimePicker: false,
        };
    },
    created() {
        this.getCurrentDateTime();
    },
    methods: {
        minEndDate() {
            return this.today.toISOString();
        },
        maxEndDate() {
            let maxDate = new Date(this.today);
            maxDate.setFullYear(maxDate.getFullYear() + 1);
            return maxDate.toISOString();
        },
        minEndTime() {
            if (this.formattedEndDate <= this.formattedToday) {
                return this.nowTime;
            } else {
                return "";
            }
        },
        getCurrentDateTime() {
            let today = new Date();

            let dd = ("0" + today.getDate()).slice(-2);
            let mm = ("0" + (today.getMonth() + 1)).slice(-2);
            let yy = today.getFullYear();
            this.today = today;
            this.formattedToday = dd + "/" + mm + "/" + yy;
            this.formattedEndDate = dd + "/" + mm + "/" + yy;

            let endD = new Date(today);
            endD.setTime(endD.getTime() + 60 * 60 * 1000);
            let hrs = endD.getHours();
            let min = endD.getMinutes();
            this.nowTime = hrs + ":" + min;
            this.endTime = hrs + ":" + min;
        },
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },

        onClickOutsideEndDate() {
            this.showEndDatePicker = false;
        },
        onClickOutsideEndTime() {
            this.showEndTimePicker = false;
        },
    },
    computed: {
        endDate: {
            get() {
                return this.$store.getters.endDate;
            },
            set(newEndDate) {
                this.formattedEndDate = this.formatDate(newEndDate);
                if (
                    this.formattedEndDate <= this.formattedToday &&
                    this.endDate != newEndDate
                ) {
                    this.endTime = this.nowTime;
                }
                this.$store.commit("updateEndDate", newEndDate);
            },
        },
        endTime: {
            get() {
                return this.$store.getters.endTime;
            },
            set(newEndTime) {
                this.$store.commit("updateEndTime", newEndTime);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.EndBox {
    display: flex;
    position: relative;
    p {
        padding-top: 6px;
        font-size: 16px;
        font-weight: 800;
        text-align: left;
        margin-right: 0.88rem;
    }
}

.EndBox p {
    margin-right: 1.8rem;
}
.DatePicker,
.TimePicker {
    z-index: 100;
    position: absolute;

    top: 48px;
}

.DatePicker {
    left: 4px;
}

.TimePicker {
    right: 4px;
}
</style>

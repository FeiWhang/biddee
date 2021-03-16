<template>
    <div class="NewItemTime">
        <div class="BeginBox">
            <p>Begin:</p>
            <v-btn
                color="#f8f8f8"
                class="ma-0 pa-0 black--text font-weight-medium"
                @click="
                    showBeginDatePicker = !showBeginDatePicker;
                    showBeginDatePicker ? (showBeginTimePicker = false) : null;
                "
                dense
                width="140px"
                rounded
            >
                {{ formattedBeginDate }}
                <v-icon right color="#c8c8c8">
                    mdi-calendar-today
                </v-icon>
            </v-btn>
            <div class="DatePicker">
                <v-scale-transition origin="top left">
                    <v-date-picker
                        v-if="showBeginDatePicker"
                        v-model="beginDate"
                        :min="nowDate"
                        v-click-outside="onClickOutsideBeginDate"
                        @click:date="onClickOutsideBeginDate"
                        color="#0e6396"
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
                    showBeginTimePicker = !showBeginTimePicker;
                    showBeginTimePicker ? (showBeginDatePicker = false) : null;
                "
                dense
                width="104px"
                rounded
            >
                {{ beginTime }}
                <v-icon right color="#c8c8c8">
                    mdi-clock-time-four-outline
                </v-icon>
            </v-btn>
            <div class="TimePicker">
                <v-scale-transition origin="top right">
                    <v-time-picker
                        v-if="showBeginTimePicker"
                        v-model="beginTime"
                        v-click-outside="onClickOutsideBeginTime"
                        :min="minBeginTime()"
                        type="month"
                        color="#0e6396"
                        class="ml-4"
                        :no-title="true"
                        elevation="8"
                        width="308px"
                    ></v-time-picker>
                </v-scale-transition>
            </div>
        </div>
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
                        :min="beginDate"
                        v-if="showEndDatePicker"
                        v-model="endDate"
                        color="#0e6396"
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
                        color="#0e6396"
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
            nowDate: "",
            nowTime: "",
            beginDate: "",
            formattedBeginDate: "",
            showBeginDatePicker: false,
            beginTime: "",
            showBeginTimePicker: false,
            endDate: "",
            formattedEndDate: "",
            showEndDatePicker: false,
            endTime: "",
            showEndTimePicker: false,
        };
    },

    created() {
        this.getCurrentDateTime();
    },
    watch: {
        beginDate(val) {
            this.formattedBeginDate = this.formatDate(val);
            if (this.endDate < val) {
                this.endDate = val;
            }
        },
        endDate(val) {
            this.formattedEndDate = this.formatDate(val);
        },
        beginTime(val) {
            let beginD = new Date(this.beginDate);
            beginD.setHours(val.slice(0, 2));
            beginD.setMinutes(val.slice(-2));

            // add 1 hr to get endD
            let endD = new Date(beginD);
            endD.setTime(endD.getTime() + 60 * 60 * 1000);

            // let endDay = endD.getDate();
            // let endMonth = endD.getMonth() + 1;
            // let endYear = endD.getFullYear();
            // this.endDate = endYear + "-" + endMonth + "-" + endDay;

            // let endHrs = endD.getHours();
            // let endMin = endD.getMinutes();
            // this.endTime = endHrs + ":" + endMin;
        },
    },
    methods: {
        minBeginTime() {
            if (this.beginDate <= new Date().toISOString().substring(0, 10)) {
                return this.nowTime;
            } else {
                return "";
            }
        },
        minEndTime() {
            if (this.endDate <= this.beginDate) {
                let beginHrs = Number.parseInt(this.beginTime.slice(0, 2)) + 1;
                let beginMin = this.beginTime.slice(-2);
                console.log(beginHrs);

                return beginHrs + ":" + beginMin;
            } else {
                return "";
            }
        },
        getCurrentDateTime() {
            let today = new Date();

            let dd = ("0" + today.getDate()).slice(-2);
            let mm = ("0" + (today.getMonth() + 1)).slice(-2);
            let yy = today.getFullYear();

            this.nowDate = yy + "-" + mm + "-" + dd;
            this.beginDate = yy + "-" + mm + "-" + dd;
            this.formattedBeginDate = dd + "/" + mm + "/" + yy;
            this.formattedEndDate = dd + "/" + mm + "/" + yy;

            let hrs = today.getHours();
            let min = ("0" + today.getMinutes()).slice(-2);

            this.nowTime = ("0" + hrs).slice(-2) + ":" + min;
            this.beginTime = ("0" + hrs).slice(-2) + ":" + min;

            if (hrs == 23) {
                this.endTime = "00:" + min;
            } else {
                this.endTime = ("0" + (hrs + 1)).slice(-2) + ":" + min;
            }
        },
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        onClickOutsideBeginDate() {
            this.showBeginDatePicker = false;
        },
        onClickOutsideBeginTime() {
            this.showBeginTimePicker = false;
        },
        onClickOutsideEndDate() {
            this.showEndDatePicker = false;
        },
        onClickOutsideEndTime() {
            this.showEndTimePicker = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.NewItemTime {
    margin-top: 2.39rem;
}

.BeginBox,
.EndBox {
    display: flex;
    position: relative;
    margin-top: 0.3rem;
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

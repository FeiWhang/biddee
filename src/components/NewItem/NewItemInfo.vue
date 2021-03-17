<template>
    <div class="NewItemInfo">
        <div class="InfoBox">
            <label for="Title">Title:</label>
            <span>
                <input
                    v-model.trim="title"
                    type="text"
                    name="Title"
                    id="Title"
                    maxlength="50"
                    placeholder="max 50 characters"
                />
            </span>
        </div>
        <div class="InfoBox">
            <label for="StartingPrice">Starting price:</label>
            <span id="StartingPriceContainer">
                <input
                    v-model.number="startingPrice"
                    type="number"
                    name="StartingPrice"
                    id="StartingPrice"
                    @change="checkStartingPrice()"
                    placeholder="at least 0"
                    :style="
                        showStartingPriceWarning
                            ? {
                                  'box-shadow': 'inset 0 0 3px var(--redError)',
                              }
                            : {}
                    "
                />
            </span>
        </div>
        <div class="InfoBox">
            <label for="MinPerBid">Minimum per bid:</label>
            <span id="MinPerBidContainer">
                <v-select
                    class="ma-0 pa-0"
                    v-model.number="minPerBid"
                    :items="minPerBids"
                    menu-props="auto"
                    filled
                    dense
                    rounded
                    append-icon=""
                    prepend-inner-icon=" "
                    full-width
                ></v-select>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewItemInfo",
    data() {
        return {
            showStartingPriceWarning: false,
            minPerBids: [1, 5, 10, 20, 50, 100, 300, 500, 1000],
        };
    },
    methods: {
        checkStartingPrice() {
            if (this.startingPrice < 0) {
                this.showStartingPriceWarning = true;
                this.startingPrice = "";
            } else {
                this.showStartingPriceWarning = false;
            }
        },
    },
    computed: {
        title: {
            get() {
                return this.$store.getters.title;
            },
            set(newTitle) {
                this.$store.commit("updateTitle", newTitle);
            },
        },
        startingPrice: {
            get() {
                return this.$store.getters.startingPrice;
            },
            set(newStartingPrice) {
                this.$store.commit("updateStartingPrice", newStartingPrice);
            },
        },
        minPerBid: {
            get() {
                return this.$store.getters.minPerBid;
            },
            set(newMinPerBid) {
                this.$store.commit("updateMinPerBid", newMinPerBid);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.NewItemInfo {
    row-gap: 0.5rem;
    width: 320px;

    .InfoBox {
        margin-top: 0.5rem;
    }
    span {
        display: block;
        overflow: hidden;
        padding: 0px 4px 0px 6px;
    }

    label {
        padding: 8px 0;
        float: left;
        font-size: 16px;
        font-weight: 800;
        text-align: left;
        margin-right: 0.88rem;
    }

    input {
        padding: 8px 24px;
        font-size: 16px;
        border-radius: 16px;
        background-color: #f3f3f3;
        border: none;
        outline: none;
        width: 100%;
    }

    input:focus {
        box-shadow: inset 0 0 3px #1080c5;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    #StartingPriceContainer,
    #MinPerBidContainer {
        position: relative;
    }

    #StartingPriceContainer:after,
    #MinPerBidContainer:after {
        position: absolute;
        top: 10px;
        font-size: 14px;
        right: 18px;
        font-weight: bold;
        content: "THB";
    }

    #MinPerBidContainer::before {
        position: absolute;
        top: 9px;
        left: 22px;
        content: "▾";
    }
}
</style>

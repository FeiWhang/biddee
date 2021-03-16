<template>
    <div class="NewItemInfo">
        <div class="InfoBox">
            <label for="Name">Name:</label>
            <span>
                <input v-model.trim="name" type="text" name="Name" id="Name" />
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
                    class="ma-0 pa-0 font-weight-medium"
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
            name: "",
            startingPrice: "",
            minPerBid: "",
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
};
</script>

<style lang="scss" scoped>
.NewItemInfo {
    row-gap: 0.5rem;
    margin-top: 2rem;
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
        background-color: var(--greyHover);
        border: none;
        outline: none;
        width: 100%;
    }

    input:focus {
        box-shadow: inset 0 0 3px var(--midBlue);
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

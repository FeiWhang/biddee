<template>
    <div class="NewItemBody">
        <div class="NewItemCard">
            <h1>Create new item</h1>
            <div class="NewItemCard__image">
                <img v-if="imgDataUrl == ''" src="@/assets/img/image.png" />
                <img v-if="imgDataUrl != ''" :src="imgDataUrl" />
            </div>
            <v-btn small rounded @click="showUploader">Set Image</v-btn>
            <img-uploader
                field="img"
                @crop-success="cropSuccess"
                v-model="showImageUpload"
                :width="300"
                :height="300"
                noCircle
                img-format="png"
                langType="en"
            ></img-uploader>

            <form class="NewItemCard__info">
                <div class="InfoBox">
                    <label for="Name">Name:</label>
                    <span>
                        <input
                            v-model.trim="name"
                            type="text"
                            name="Name"
                            id="Name"
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
                                          'box-shadow':
                                              'inset 0 0 3px var(--redError)',
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
                <div class="InfoBox">
                    <label for="Begin">Begin:</label>
                    <span id="BeginContainer"></span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";

export default {
    name: "NewItemBody",
    data() {
        return {
            showImageUpload: false,
            showStartingPriceWarning: false,
            imgDataUrl: "",
            name: "",
            startingPrice: "",
            minPerBid: "",
            minPerBids: [1, 5, 10, 20, 50, 100, 300, 500, 1000],
        };
    },
    components: {
        "img-uploader": myUpload,
    },
    methods: {
        showUploader() {
            this.showImageUpload = !this.showImageUpload;
        },
        cropSuccess(imgDataUrl) {
            this.imgDataUrl = imgDataUrl;
        },
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
.NewItemBody {
    display: flex;
    justify-content: center;
    width: var(--layoutWidth);
    margin: 0 auto;
    margin-top: 8rem;
}

.NewItemCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
        0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0, 0, 0, 0.025);

    h1 {
        margin-bottom: 3rem;
        font-size: 32px;
    }

    &__image {
        overflow: hidden;
        border-radius: 8px;
        background-color: var(--blueHover);
        width: 300px;
        height: 300px;
        display: flex;
        img {
            margin: auto;
        }
        margin-bottom: 1rem;
    }

    &__info {
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
            font-size: 18px;
            font-weight: 800;
            text-align: left;
            margin-right: 0.88rem;
        }

        input {
            padding: 8px 24px;
            font-size: 18px;
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
}
</style>

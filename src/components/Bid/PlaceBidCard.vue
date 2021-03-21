<template>
    <div class="PlaceBidCard">
        <h1>Place a bid</h1>
        <div class="InfoContainer">
            <div class="PlaceBidCard__left">
                <img
                    height="300px"
                    width="300px"
                    :src="placeBidInfo.imgDataUrl"
                    alt="No img"
                />
                <CountDown
                    :endAt="placeBidInfo.endAt"
                    :id="placeBidInfo.id"
                    class="FooterCountDown"
                />
            </div>
            <div class="PlaceBidCard__right">
                <h2>{{ placeBidInfo.title }}</h2>
                <p>by {{ placeBidInfo.seller }}</p>
                <p>{{ placeBidInfo.description }}</p>
            </div>
        </div>

        <div class="FooterContainer">
            <div class="FooterTop">
                <span class="FooterTag">Current Price:</span>
                <v-chip x-large color="#f5f8fc">
                    <h2 id="price">{{ placeBidInfo.currentPrice }}</h2>
                    <span id="currency">THB</span></v-chip
                >

                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            rounded
                            color="#e8ffe6"
                            class="ml-3 text-h6"
                            @click="
                                placeBid(
                                    placeBidInfo.currentPrice +
                                        placeBidInfo.minPerBid
                                )
                            "
                        >
                            {{
                                placeBidInfo.currentPrice +
                                    placeBidInfo.minPerBid
                            }}
                            <v-icon right small>
                                mdi-gavel
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Quick Bid</span>
                </v-tooltip>
            </div>
            <div class="FooterBottom">
                <span class="FooterTag">Custom Bid:</span>
                <input
                    v-model.number="biddingPrice"
                    type="number"
                    name="CustomBid"
                    id="CustomBid"
                    @change="checkCustomBid()"
                    :placeholder="
                        'at least ' +
                            (placeBidInfo.currentPrice + placeBidInfo.minPerBid)
                    "
                    :style="
                        showCustomBidWarning
                            ? {
                                  'box-shadow':
                                      'inset 0 0 3px rgb(216, 68, 88)',
                              }
                            : {}
                    "
                />
                <v-btn
                    rounded
                    color="#e8ffe6"
                    class="ml-3 font-weight-bold"
                    @click="placeBid(biddingPrice)"
                >
                    PLACE BID
                    <v-icon right small>
                        mdi-gavel
                    </v-icon>
                </v-btn>
            </div>

            <p class="FooterError" v-if="showPlaceBidWarning">{{ errorMsg }}</p>

            <div class="FooterConfirm" v-if="showFooterConfirm">
                <p class="ConfirmText">
                    Do you really want to place a bid on this item at
                    {{ biddingPrice }} THB?
                </p>
                <div class="ConfirmButtons">
                    <v-btn
                        rounded
                        color="#e8ffe6"
                        class="font-weight-bold"
                        @click="onConfirmClicked()"
                    >
                        <v-icon left>
                            mdi-check
                        </v-icon>
                        CONFIRM
                    </v-btn>
                    <v-btn
                        rounded
                        color="#ffb0b0"
                        class="ml-12 font-weight-bold"
                        @click="onCancelClicked()"
                    >
                        <v-icon left>
                            mdi-close
                        </v-icon>
                        CANCEL
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db, auth } from "@/firebase";
import { mapGetters, mapActions } from "vuex";
import CountDown from "@/components/CountDown";

export default {
    name: "PlaceBidCard",
    components: { CountDown },
    data() {
        return {
            placeBidInfo: {},
            biddingPrice: "",
            showCustomBidWarning: false,
            showPlaceBidWarning: false,
            errorMsg: "",
            showFooterConfirm: false,
        };
    },
    computed: {
        ...mapGetters(["showPlaceBidDialog", "placeBidID"]),
    },
    methods: {
        ...mapActions(["onPlaceBIDConfirmed"]),
        onConfirmClicked() {
            let bidData = {
                bidder: auth.currentUser.uid,
                itemID: this.placeBidID,
                placedAt: new Date().toISOString(),
                bidPrice: this.biddingPrice,
            };

            this.onPlaceBIDConfirmed(bidData);
        },
        onCancelClicked() {
            this.biddingPrice = "";
            this.showFooterConfirm = false;
            this.showPlaceBidWarning = false;
            this.showCustomBidWarning = false;
        },
        placeBid(bidPrice) {
            this.biddingPrice = bidPrice;
            let minPrice =
                this.placeBidInfo.currentPrice + this.placeBidInfo.minPerBid;
            if (bidPrice < minPrice) {
                if (bidPrice == "") {
                    this.errorMsg = "Custom bid cannot be left blank";
                } else {
                    this.errorMsg =
                        "Custom bid need to be at least: " + minPrice;
                }
                this.showPlaceBidWarning = true;
                this.showFooterConfirm = false;
            } else {
                this.showPlaceBidWarning = false;
                this.showFooterConfirm = true;
            }
        },
        checkCustomBid() {
            if (
                this.biddingPrice <
                this.placeBidInfo.currentPrice + this.placeBidInfo.minPerBid
            ) {
                this.showCustomBidWarning = true;
            } else {
                this.showCustomBidWarning = false;
            }
        },
        getPlaceBidInfo(id) {
            db.ref("items/")
                .child(id)
                .on("value", (snapshot) => {
                    if (snapshot.exists()) {
                        let itemData = snapshot.val();

                        this.placeBidInfo = {
                            id: snapshot.key,
                            endAt: itemData.endAt,
                            title: itemData.title,
                            description: itemData.description,
                            currentPrice: itemData.currentPrice,
                            minPerBid: itemData.minPerBid,
                            imgDataUrl: itemData.imgDataUrl,
                            seller: "",
                        };

                        db.ref("users")
                            .child(itemData.sellerID)
                            .once("value", (sellerSnapshot) => {
                                if (sellerSnapshot.exists()) {
                                    let sellerInfo = sellerSnapshot.val();
                                    this.placeBidInfo.seller =
                                        sellerInfo.firstName;
                                } else {
                                    this.placeBidInfo.seller = "unknown";
                                    console.log(
                                        "can't find seller: " +
                                            itemData.sellerID
                                    );
                                }
                            });
                    } else {
                        console.log("No available for bidding found");
                    }
                });
        },
    },
    watch: {
        placeBidID: function(newPlaceBidID) {
            this.biddingPrice = "";
            this.showCustomBidWarning = false;
            this.showPlaceBidWarning = false;
            this.errorMsg = "";
            this.showFooterConfirm = false;
            if (newPlaceBidID != "") {
                this.getPlaceBidInfo(newPlaceBidID);
            }
        },
    },
    mounted() {
        this.getPlaceBidInfo(this.placeBidID);
    },
};
</script>

<style lang="scss" scoped>
.PlaceBidCard {
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 32px;
    border-radius: 32px;

    &__left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 16px;
        color: rgb(216, 68, 88);

        img {
            margin-top: 4px;
            box-shadow: 0 0 3px #e1e1e1;
        }
    }

    &__right {
        display: flex;
        flex-direction: column;
        h2 {
            text-align: left;
        }
        p {
            text-align: left;
        }
    }
}

.InfoContainer {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    column-gap: 32px;
    margin-top: 2rem;
}

.FooterContainer {
    margin-top: 48px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 12px;

    #CustomBid {
        padding: 8px 24px;
        font-size: 16px;
        border-radius: 16px;
        background-color: #f8f8f8;
        border: none;
        outline: none;
        width: 250px;
    }
    #CustomBid:focus {
        box-shadow: inset 0 0 3px #1080c5;
    }

    #CustomBid::-webkit-outer-spin-button,
    #CustomBid::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .FooterTag {
        font-size: 18px;
        font-weight: 800;
        margin-right: 12px;
    }

    #CustomBid:after {
        position: absolute;
        top: 10px;
        font-size: 14px;
        right: 18px;
        font-weight: bold;
        content: "THB";
    }

    #price {
        font-weight: 400;
    }
}

.FooterCountDown {
    color: rgb(216, 68, 88);
}

#currency {
    font-size: 14px;
    margin-left: 8px;
    font-weight: 600;
}

#QuickBid {
    cursor: pointer;
}

.FooterBottom {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.FooterError {
    color: rgb(216, 68, 88);
    margin-bottom: 16px;
}

.FooterConfirm {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-top: 48px;
    p {
        font-size: 18px;
        font-weight: 600;
    }
}
</style>

<template>
    <div class="AllBid">
        <v-dialog
            v-model="showPlaceBidDialog"
            persistent
            max-width="400px"
            transition="dialog-transition"
        >
            <div class="DialogContainer">
                <v-icon
                    large
                    color="rgb(216, 68, 88)"
                    class="CloseDialog"
                    @click="closeShowPlaceBidDialog()"
                >
                    mdi-close
                </v-icon>
                <PlaceBidCard />
            </div>
        </v-dialog>
        <h2>Up for bidding</h2>
        <div class="AllBid__showcase">
            <v-data-table
                :headers="headers"
                :items="allBids"
                :items-per-page="5"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                no-data-text="No item is available for bidding now"
                class="elevation-1 mt-8"
            >
                <template v-slot:[`item.imgDataUrl`]="{ item }">
                    <div class="p-2">
                        <v-img
                            :src="item.imgDataUrl"
                            :alt="item.title"
                            height="120px"
                            width="120px"
                            class="mt-2 mb-2"
                            id="allBidIMG"
                        ></v-img>
                    </div>
                </template>
                <template v-slot:[`item.action`]="{}">
                    <div class="p-2">
                        <v-btn rounded @click="openShowPlaceBidDialog()">
                            <v-icon left>
                                mdi-gavel
                            </v-icon>
                            BID
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
import { db } from "@/firebase";
import { mapMutations, mapGetters } from "vuex";
import PlaceBidCard from "@/components/Bid/PlaceBidCard";

export default {
    name: "AllBid",
    components: { PlaceBidCard },
    methods: {
        ...mapMutations(["openShowPlaceBidDialog", "closeShowPlaceBidDialog"]),
    },
    computed: {
        ...mapGetters(["showPlaceBidDialog"]),
    },
    data() {
        return {
            headers: [
                {
                    text: "Images",
                    sortable: false,
                    value: "imgDataUrl",
                },
                {
                    text: "Title",
                    sortable: false,
                    value: "title",
                },
                {
                    text: "Current price",
                    value: "currentPrice",
                },
                { text: "End at", value: "endAt" },

                {
                    text: "Action",
                    value: "action",
                    sortable: false,
                    align: "end",
                },
            ],
            sortBy: "endAt",
            sortDesc: false,
            allBids: [],
        };
    },
    mounted() {
        // load myitems keys from users ref
        db.ref("items/").on("value", (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((itemSnapshot) => {
                    let itemData = itemSnapshot.val();
                    let itemID = itemSnapshot.key;

                    let now = new Date();
                    let end = new Date(itemData.endAt);

                    if (now < end) {
                        let title =
                            itemData.title.length >= 25
                                ? itemData.title.slice(0, 24) + "..."
                                : itemData.title;

                        let dd = end.getDate();
                        let mm = end.getMonth();
                        let yy = end.getFullYear();
                        let hrs = ("0" + end.getHours()).slice(-2);
                        let min = ("0" + end.getMinutes()).slice(-2);

                        let endAt =
                            dd + "/" + mm + "/" + yy + " at " + hrs + ":" + min;

                        let allBid = {
                            id: itemID,
                            title: title,
                            currentPrice: itemData.currentPrice,
                            imgDataUrl: itemData.imgDataUrl,
                            endAt: endAt,
                        };

                        this.allBids.push(allBid);
                    }
                });
            } else {
                console.log("No available for bidding found");
            }
        });
    },
};
</script>

<style lang="scss" scoped>
.AllBid {
    h2 {
        text-align: left;
    }
}

#allBidIMG {
    border-radius: 4px;
    box-shadow: 0 0 2px #8d8d8d;
}

.DialogContainer {
    position: relative;

    .CloseDialog {
        cursor: pointer;
        position: absolute;
        top: 36px;
        right: 26px;
        padding: 4px;
    }
}
</style>

<template>
    <div class="AllBidShowcase">
        <v-card
            elevation="2"
            v-for="allBid in allBids"
            :key="allBid.id"
            width="300"
            @click="onItemCardClicked(allBid.id)"
            :ripple="false"
        >
            <v-img height="300" :src="allBid.imgDataUrl"></v-img>
            <v-card-title>{{ allBid.title }}</v-card-title>
            <v-card-subtitle class="ml-0" align="left">
                {{ allBid.description }}
            </v-card-subtitle>

            <v-card-text align="center"
                ><CountDown :endAt="allBid.endAt" :id="allBid.id"
            /></v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text align="center">
                <v-chip x-large color="#f5f8fc"
                    ><h2 id="price">{{ allBid.currentPrice }}</h2>
                    <span id="currency">THB</span></v-chip
                >
                <v-chip x-large color="#e8ffe6" class="ml-3"
                    ><h2 id="price">+ {{ allBid.perBid }}</h2>
                    <v-icon small class="ml-1">mdi-gavel</v-icon>
                </v-chip>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { db, auth } from "@/firebase";
import { mapGetters, mapMutations } from "vuex";
import CountDown from "@/components/CountDown";

export default {
    name: "AllBidShowcase",
    components: { CountDown },
    data() {
        return {
            allBids: [],
        };
    },
    watch: {
        idEnded: function(newIdEnded) {
            this.allBids.forEach((allBid, index, obj) => {
                if (allBid.id == newIdEnded) {
                    obj.splice(index, 1);
                    // if place bid dialog also opened close it
                    // and set place bid id back to blank
                    if (this.placeBidID == newIdEnded) {
                        this.closeShowPlaceBidDialog();
                        this.setPlaceBidID("");
                    }
                }
            });
        },
    },
    computed: {
        ...mapGetters(["idEnded", "placeBidID"]),
    },
    methods: {
        ...mapMutations([
            "closeShowPlaceBidDialog",
            "setPlaceBidID",
            "onItemCardClicked",
        ]),
    },
    mounted() {
        // load myitems keys from users ref
        db.ref("items/").on("value", (snapshot) => {
            let newAllBids = [];
            if (snapshot.exists()) {
                snapshot.forEach((itemSnapshot) => {
                    let itemID = itemSnapshot.key;
                    let itemData = itemSnapshot.val();
                    if (itemData == null) return;

                    let now = new Date();
                    let end = new Date(itemData.endAt);

                    if (
                        (end >= now) &
                        (itemData.sellerID != auth.currentUser.uid)
                    ) {
                        let title =
                            itemData.title.length >= 23
                                ? itemData.title.slice(0, 22).trim() + "..."
                                : itemData.title;
                        let description =
                            itemData.description.length >= 33
                                ? itemData.description.slice(0, 32).trim() +
                                  "..."
                                : itemData.description;

                        let allBid = {
                            id: itemID,
                            endAt: end,
                            title: title,
                            description: description,
                            imgDataUrl: itemData.imgDataUrl,
                            currentPrice: itemData.currentPrice,
                            perBid: itemData.minPerBid,
                        };
                        newAllBids.push(allBid);
                    }
                });

                newAllBids.sort((a, b) => (a.endAt > b.endAt ? 1 : -1));
                this.allBids = newAllBids;
            } else {
                console.log("No available for bidding found");
            }
        });
    },
};
</script>

<style lang="scss" scoped>
.AllBidShowcase {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 80px;
    row-gap: 40px;
}

#currency {
    font-size: 14px;
    margin-left: 8px;
    font-weight: 600;
}
#price {
    font-size: 18px;
    font-weight: 800;
}
</style>

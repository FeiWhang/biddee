<template>
    <div class="AllBidShowcase">
        <v-card
            elevation="2"
            v-for="(allBid, i) in allBids"
            :key="i"
            width="300"
        >
            <v-img height="300" :src="allBid.imgDataUrl"></v-img>
            <v-card-title>{{ allBid.title }}</v-card-title>
            <v-card-subtitle class="ml-0" align="left">
                {{ allBid.description }}
            </v-card-subtitle>

            <v-card-text align="center"
                ><CountDown :endAt="allBid.endAt"
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
import CountDown from "@/components/CountDown";

export default {
    name: "AllBidShowcase",
    components: { CountDown },
    data() {
        return {
            allBids: [],
        };
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
                            itemData.title.length >= 20
                                ? itemData.title.slice(0, 19) + "..."
                                : itemData.title;
                        let description =
                            itemData.description.length >= 35
                                ? itemData.description.slice(0, 34) + "..."
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
                this.allBids = newAllBids;
            } else {
                console.log("No available for bidding found");
            }
        });
        // sort by ending
        this.allBids.sort((a, b) => (a.endAt > b.endAt ? 1 : -1));
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

<template>
    <div class="AllBid">
        <v-dialog
            v-model="showPlaceBidDialog"
            persistent
            max-width="800px"
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
        <h2 class="AllBid__header">Up for bidding</h2>
        <AllBidShowcase />
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import PlaceBidCard from "@/components/Bid/PlaceBidCard";
import AllBidShowcase from "@/components/Bid/AllBidShowcase";

export default {
    name: "AllBid",
    components: { PlaceBidCard, AllBidShowcase },
    methods: {
        ...mapMutations([
            "openShowPlaceBidDialog",
            "closeShowPlaceBidDialog",
            "onPlaceBidClicked",
        ]),
    },
    computed: {
        ...mapGetters(["showPlaceBidDialog"]),
    },
};
</script>

<style lang="scss" scoped>
.AllBid {
    &__header {
        text-align: left;
        margin-bottom: 2rem;
    }

    &__showcase {
        display: grid;
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
        top: 34px;
        right: 26px;
        padding: 4px;
    }
}
</style>

<template>
    <div class="PlaceBidCard">
        <h1>Place a bid</h1>
        <img src="" alt="" />
    </div>
</template>

<script>
import { db } from "@/firebase";
import { mapGetters } from "vuex";
export default {
    name: "PlaceBidCard",
    data() {
        return {
            imgDataUrl: "",
        };
    },
    computed: {
        ...mapGetters(["showPlaceBidDialog", "placeBidID"]),
    },
    mounted() {
        // load myitems keys from users ref
        console.log(this.placeBidID);
        db.ref("items/")
            .child(this.placeBidID)
            .on("value", (snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                } else {
                    console.log("No available for bidding found");
                }
            });
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
}
</style>

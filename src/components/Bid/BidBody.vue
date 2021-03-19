<template>
    <div class="BidBody">
        <section class="BidBody__currentBid">
            <div class="layout">
                <CurrentBid />
            </div>
        </section>
        <section class="BidBody__allBid">
            <div class="layout">
                <AllBid />
            </div>
        </section>
    </div>
</template>

<script>
import CurrentBid from "@/components/Bid/CurrentBid";
import AllBid from "@/components/Bid/AllBid";

export default {
    name: "BidBody",
    components: { CurrentBid, AllBid },
};
</script>

<style lang="scss" scoped>
.BidBody {
    .layout {
        width: var(--layoutWidth);
        margin: 0 auto;
        padding: 4rem 0;
    }
    &__currentBid {
        .layout {
            padding-top: 6rem;
        }
    }
}
</style>

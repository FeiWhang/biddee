<template>
    <div class="BidBody">
        <section class="BidBody__currentBid">
            <div class="layout">
                <CurrentBid />
            </div>
        </section>
    </div>
</template>

<script>
import CurrentBid from "@/components/Bid/CurrentBid";

export default {
    name: "BidBody",
    components: { CurrentBid },
};
</script>

<style lang="scss" scoped>
.BidBody {
    .layout {
        width: var(--layoutWidth);
        margin: 0 auto;
        padding: 6rem 0;
    }
    &__currentBid {
        .layout {
            padding-top: 6rem;
        }
    }
}
</style>

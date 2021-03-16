<template>
    <div class="MyItemBody">
        <section class="MyItemBody__newItem">
            <div class="layout">
                <div class="NewItem">
                    <h2>Wanna sell something?</h2>
                    <LinkGo
                        to="/myitem/new"
                        title="Create new item"
                        bgColor="#0e6396"
                        elemColor="white"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import LinkGo from "@/components/LinkGo";

export default {
    name: "BidBody",
    components: { LinkGo },
};
</script>

<style lang="scss" scoped>
.MyItemBody {
    .layout {
        width: var(--layoutWidth);
        margin: 0 auto;
        padding: 6rem 0;
    }
}

.NewItem {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: center;
}
</style>

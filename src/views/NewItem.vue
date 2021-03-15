<template>
    <div class="bid">
        <Header />
        <NewItemBody />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import NewItemBody from "@/components/Bid/NewItemBody.vue";

export default {
    name: "Home",
    metaInfo: {
        titleTemplate: null,
    },
    components: {
        Header,
        NewItemBody,
    },
};
</script>

<template>
    <div class="bid">
        <Header />
        <NewItemBody />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import NewItemBody from "@/components/Bid/NewItem/NewItemBody.vue";

export default {
    name: "NewItem",
    metaInfo: {
        titleTemplate: null,
    },
    components: {
        Header,
        NewItemBody,
    },
};
</script>

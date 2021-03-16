<template>
    <div class="myitem">
        <Header />
        <MyItemBody />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MyItemBody from "@/components/MyItemBody.vue";

export default {
    name: "MyItem",
    metaInfo: {
        titleTemplate: null,
    },
    components: {
        Header,
        MyItemBody,
    },
};
</script>

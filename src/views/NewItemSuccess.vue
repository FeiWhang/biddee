<template>
    <div class="newitemsuccess">
        <Header />
        <div class="newitemsuccess__body">
            <img src="@/assets/img/check.png" alt="" />
            <h1>You have successfully created new item !</h1>
            <LinkGo
                to="/myitem"
                title="View it on my item page"
                elemColor="#0e6396"
            />
        </div>
    </div>
</template>

<script>
import LinkGo from "@/components/LinkGo.vue";
import Header from "@/components/Header.vue";

export default {
    name: "NewItemSuccess",
    metaInfo: {
        title: "Created New Item",
    },
    components: {
        Header,
        LinkGo,
    },
};
</script>

<style lang="scss" scoped>
.newitemsuccess__body {
    display: flex;
    width: var(--layoutWidth);
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        margin-top: 8rem;
    }
    h1 {
        margin-top: 1rem;
    }
}
</style>

<template>
    <div class="registersuccess">
        <Header />
        <div class="registersuccess__body">
            <img src="@/assets/img/check.png" alt="" />
            <h1>You have successfully registered !</h1>
            <LinkGo to="/bid" title="Start bidding now" elemColor="#0e6396" />
        </div>
    </div>
</template>

<script>
import LinkGo from "@/components/LinkGo.vue";
import Header from "@/components/Header.vue";

export default {
    name: "RegisterSuccess",
    metaInfo: {
        title: "Registered",
    },
    components: {
        Header,
        LinkGo,
    },
};
</script>

<style lang="scss" scoped>
.registersuccess__body {
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

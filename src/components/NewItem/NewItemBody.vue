<template>
    <div class="NewItemBody">
        <div class="NewItemCard">
            <h1>Create new item</h1>
            <div class="NewItemBox">
                <div class="NewItemBox__left">
                    <NewItemImage />
                </div>

                <div class="NewItemBox__right">
                    <NewItemInfo />
                    <NewItemTime />
                    <NewItemDescrip />
                </div>
            </div>
            <NewItemFooter />
        </div>
    </div>
</template>

<script>
import NewItemTime from "@/components/NewItem/NewItemTime.vue";
import NewItemImage from "@/components/NewItem/NewItemImage.vue";
import NewItemInfo from "@/components/NewItem/NewItemInfo.vue";
import NewItemDescrip from "@/components/NewItem/NewItemDescrip.vue";
import NewItemFooter from "@/components/NewItem/NewItemFooter.vue";
export default {
    name: "NewItemBody",

    components: {
        NewItemImage,
        NewItemInfo,
        NewItemTime,
        NewItemDescrip,
        NewItemFooter,
    },
};
</script>

<style lang="scss" scoped>
.NewItemBody {
    display: flex;
    justify-content: center;
    width: var(--layoutWidth);
    margin: 0 auto;
    margin-top: 8rem;
}

.NewItemCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
        0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0, 0, 0, 0.025);

    h1 {
        margin-bottom: 3rem;
        font-size: 32px;
    }
}

.NewItemBox {
    display: flex;
    column-gap: 2.5rem;
    align-items: flex-start;
}
</style>

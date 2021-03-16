<template>
    <div class="NewItemBody">
        <div class="NewItemCard">
            <h1>Create new item</h1>
            <NewItemImage />

            <div class="NewItemForm">
                <NewItemInfo />
                <NewItemTime />
            </div>
        </div>
    </div>
</template>

<script>
import NewItemImage from "@/components/Bid/NewItem/NewItemImage.vue";
import NewItemTime from "@/components/Bid/NewItem/NewItemTime.vue";
import NewItemInfo from "@/components/Bid/NewItem/NewItemInfo.vue";

export default {
    name: "NewItemBody",

    components: {
        NewItemImage,
        NewItemInfo,
        NewItemTime,
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

.NewItemForm {
    display: flex;
    column-gap: 2rem;
}
</style>

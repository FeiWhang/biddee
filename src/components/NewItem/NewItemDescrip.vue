<template>
    <div class="NewItemDescrip">
        <textarea
            class="DescriptionArea"
            name="Description"
            v-model="description"
            placeholder="Describe this item..."
            cols="35"
            rows="5"
            maxlength="555"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: "NewItemDescrip",
    computed: {
        description: {
            get() {
                return this.$store.getters.description;
            },
            set(newDescription) {
                this.$store.commit("updateDescription", newDescription);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.NewItemDescrip {
    display: flex;
    align-self: flex-start;
    justify-content: flex-start;
}
.DescriptionArea {
    outline: 0;
    margin-top: 0.8rem;
    padding: 8px 10px;
    border-radius: 8px;
    background-color: #f3f3f3;
    resize: none;
}
.DescriptionArea:focus {
    box-shadow: inset 0 0 3px #1080c5;
}
</style>

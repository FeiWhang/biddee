<template>
    <div class="NewItemDescrip">
        <textarea
            class="DescriptionArea"
            name="Description"
            placeholder="Describe this item..."
            cols="35"
            rows="5"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: "NewItemDescrip",
};
</script>

<style lang="scss" scoped>
.NewItemDescrip {
    display: flex;
    align-self: flex-start;
    justify-content: start;
}
.DescriptionArea {
    outline: 0;
    margin-top: 0.8rem;
    padding: 8px 10px;
    border-radius: 8px;
    background-color: var(--greyHover);
    resize: none;
}
.DescriptionArea:focus {
    box-shadow: inset 0 0 3px var(--midBlue);
}
</style>

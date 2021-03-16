<template>
    <div class="NewItemFooter">
        <v-checkbox
            class="mt-8"
            v-model="confirmChecked"
            label="I have reviewed that the above information is correct"
            color="#0e6396"
            hide-details
            :ripple="false"
            round
            @click="onCheckBoxClicked"
        ></v-checkbox>
        <p v-if="showError">
            Please indicate that you have reviewed the above information
        </p>
        <v-btn
            class="mt-3 white--text"
            color="#0e6396"
            rounded
            @click="onCreateNewItemClicked"
            >Create item</v-btn
        >
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "NewItemFooter",
    data() {
        return {
            confirmChecked: false,
            showError: false,
        };
    },
    methods: {
        ...mapActions(["createNewItem"]),
        onCheckBoxClicked() {
            if (this.confirmChecked && this.showError) {
                this.showError = false;
            }
        },
        onCreateNewItemClicked() {
            this.confirmChecked
                ? this.createNewItem()
                : (this.showError = true);
        },
    },
};
</script>

<style lang="scss" scoped>
.NewItemFooter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        margin-top: 0.5rem;
        color: var(--redError);
    }
}
</style>

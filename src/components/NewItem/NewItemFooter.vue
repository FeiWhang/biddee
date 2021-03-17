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
        <div class="NewItemFooter__error">
            <p v-if="showConfirmError">
                * Please indicate that you have reviewed the above information
            </p>
            <p v-if="showBlankError">
                * No field can be left blank
            </p>
        </div>

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
import { mapActions, mapGetters } from "vuex";

export default {
    name: "NewItemFooter",
    data() {
        return {
            confirmChecked: false,
            showConfirmError: false,
            showBlankError: false,
        };
    },
    methods: {
        ...mapActions(["createNewItem"]),
        onCheckBoxClicked() {
            if (this.confirmChecked && this.showConfirmError) {
                this.showConfirmError = false;
            }
        },
        onCreateNewItemClicked() {
            if (
                this.title == "" ||
                this.startingPrice == "" ||
                this.minPerBid == "" ||
                this.description == "" ||
                this.imgDataUrl == ""
            ) {
                this.showBlankError = true;
            }
            if (!this.confirmChecked) {
                this.showConfirmError = true;
            }
            if (
                this.confirmChecked &&
                this.title != "" &&
                this.startingPrice != "" &&
                this.minPerBid != "" &&
                this.description != "" &&
                this.imgDataUrl != ""
            ) {
                this.createNewItem();
            }
        },
    },
    computed: {
        ...mapGetters([
            "title",
            "startingPrice",
            "minPerBid",
            "description",
            "imgDataUrl",
        ]),
    },
};
</script>

<style lang="scss" scoped>
.NewItemFooter {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__error {
        margin: 0;
        margin-top: 1rem;
    }
    p {
        margin: 0;
        color: rgb(216, 68, 88);
    }
}
</style>

<template>
    <div class="EditItemCard">
        <h1>Edit item</h1>
        <div class="TitleBox">
            <label for="Title">Title:</label>
            <span>
                <input
                    v-model.trim="editTitle"
                    type="text"
                    name="Title"
                    id="Title"
                    maxlength="50"
                />
            </span>
        </div>
        <div class="DescriptionBox">
            <p>Description:</p>
            <textarea
                class="DescriptionArea"
                name="Description"
                v-model="editDescription"
                cols="35"
                rows="5"
            ></textarea>
        </div>
        <p class="EditError" v-if="showEditError">
            * No field can be left blank
        </p>
        <v-btn
            class="mt-3 white--text"
            id="EditButton"
            color="#0e6396"
            width="120px"
            rounded
            @click="onDialogEditClicked"
            >EDIT ITEM</v-btn
        >
    </div>
</template>

<script>
export default {
    name: "EditItemCard",
    methods: {
        onDialogEditClicked() {
            if (this.editTitle == "" || this.editDescription == "") {
                this.showEditError = true;
                return;
            }
            this.$store.commit("setEditItem");
            this.$store.commit("updateShowEditItemDialog");
        },
    },
    data() {
        return {
            showEditError: false,
        };
    },
    computed: {
        editTitle: {
            get() {
                return this.$store.getters.editTitle;
            },
            set(newEditTitle) {
                this.$store.commit("updateEditTitle", newEditTitle);
            },
        },
        editDescription: {
            get() {
                return this.$store.getters.editDescription;
            },
            set(newEditDescription) {
                this.$store.commit("updateEditDescription", newEditDescription);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.EditItemCard {
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 32px;
    border-radius: 32px;
    p {
        text-align: left;
        margin-bottom: 0;
        margin-top: 1rem;
        font-size: 16px;
        font-weight: 800;
    }

    h1 {
        margin-bottom: 2.22rem;
    }

    .TitleBox,
    .DescriptionBox {
        align-self: flex-start;
    }

    .EditError {
        color: rgb(216, 68, 88);
    }

    .DescriptionArea {
        outline: 0;
        margin-top: 0.25rem;
        padding: 8px 10px;
        border-radius: 8px;
        background-color: #f3f3f3;
        resize: none;
        width: 326px;
        align-self: flex-start;
    }
    .DescriptionArea:focus {
        box-shadow: inset 0 0 3px #1080c5;
    }

    span {
        display: block;
        overflow: hidden;
        padding: 0px 4px 0px 6px;
    }

    label {
        padding: 8px 0;
        float: left;
        font-size: 16px;
        font-weight: 800;
        text-align: left;
    }

    input {
        padding: 8px 24px;
        font-size: 16px;
        border-radius: 16px;
        background-color: #f3f3f3;
        border: none;
        outline: none;
        width: 284px;
    }

    input:focus {
        box-shadow: inset 0 0 3px #1080c5;
    }
}
</style>

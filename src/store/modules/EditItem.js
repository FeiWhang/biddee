import { db } from "../../firebase";

const state = {
    showEditItemDialog: false,
    editID: "",
    editTitle: "",
    editDescription: "",
};

const getters = {
    showEditItemDialog: (state) => state.showEditItemDialog,
    editID: (state) => state.editID,
    editTitle: (state) => state.editTitle,
    editDescription: (state) => state.editDescription,
};

const mutations = {
    setEditItem(state) {
        db.ref("items/")
            .child(state.editID)
            .child("title")
            .set(state.editTitle);
        db.ref("items/")
            .child(state.editID)
            .child("description")
            .set(state.editDescription);
    },

    updateEditID(state, newEditID) {
        state.editID = newEditID;
    },
    updateEditTitle(state, newEditTitle) {
        state.editTitle = newEditTitle;
    },
    updateEditDescription(state, newEditDescription) {
        state.editDescription = newEditDescription;
    },
    updateShowEditItemDialog(state, newShowEditItemDialog) {
        state.showEditItemDialog = newShowEditItemDialog;
    },
};

export default {
    state,
    getters,
    mutations,
};

const state = {
    placeBidID: "",
    showPlaceBidDialog: false,
};

const getters = {
    placeBidID: (state) => state.placeBidID,
    showPlaceBidDialog: (state) => state.showPlaceBidDialog,
};

const actions = {};

const mutations = {
    openShowPlaceBidDialog(state) {
        state.showPlaceBidDialog = true;
    },
    closeShowPlaceBidDialog(state) {
        state.showPlaceBidDialog = false;
    },
    onPlaceBidClicked(state, id) {
        state.placeBidID = id;
        state.showPlaceBidDialog = true;
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};

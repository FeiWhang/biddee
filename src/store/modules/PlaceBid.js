const state = {
    showPlaceBidDialog: false,
};

const getters = {
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
};

export default {
    state,
    actions,
    getters,
    mutations,
};

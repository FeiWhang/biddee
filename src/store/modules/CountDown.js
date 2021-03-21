const state = {
    idEnded: "",
};

const getters = {
    idEnded: (state) => state.idEnded,
};

const actions = {};

const mutations = {
    changeIDToEnded(state, id) {
        console.log("ID: " + id + " is ending");
        state.idEnded = id;

        if (id == state.placeBidID) {
            state.placeBidID = "";
            state.showPlaceBidDialog = false;
        }
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};

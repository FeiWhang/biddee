import { db, auth } from "@/firebase";
import router from "@/router/index";
const state = {
    title: "",
    startingPrice: "",
    minPerBid: "",
    endDate: "",
    endTime: "",
    imgDataUrl: "",
};

const getters = {
    title: (state) => state.title,
    startingPrice: (state) => state.startingPrice,
    minPerBid: (state) => state.minPerBid,
    endDate: (state) => state.endDate,
    endTime: (state) => state.endTime,
    imgDataUrl: (state) => state.imgDataUrl,
};

const actions = {
    createNewItem({ commit, state }) {
        let newItem = {
            sellerID: auth.currentUser.uid,
            title: state.title,
            startingPrice: state.startingPrice,
            minPerBid: state.minPerBid,
            endDate: state.endDate,
            endTime: state.endTime,
            imgDataUrl: state.imgDataUrl,
        };

        commit("setNewItem", newItem);
    },
};

const mutations = {
    setNewItem(state, newItem) {
        db.ref("items/").push(newItem, (error) => {
            if (error) {
                alert("Could not create new item: " + error);
            } else {
                router.push("/myitem/new/success");
            }
        });
    },

    updateTitle(state, newTitle) {
        state.title = newTitle;
    },
    updateStartingPrice(state, newStartingPrice) {
        state.startingPrice = newStartingPrice;
    },
    updateMinPerBid(state, newMinPerBid) {
        state.minPerBid = newMinPerBid;
    },
    updateEndDate(state, newEndDate) {
        state.endDate = newEndDate;
    },
    updateEndTime(state, newEndTime) {
        state.endTime = newEndTime;
    },
    updateImgDataUrl(state, newImgDataUrl) {
        state.imgDataUrl = newImgDataUrl;
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};

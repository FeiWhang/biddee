import { db, auth } from "@/firebase";

const state = {
    showNewItemDialog: false,
    title: "",
    startingPrice: "",
    minPerBid: "",
    endDate: "",
    endTime: "",
    imgDataUrl: "",
    description: "",
};

const getters = {
    showNewItemDialog: (state) => state.showNewItemDialog,
    title: (state) => state.title,
    startingPrice: (state) => state.startingPrice,
    minPerBid: (state) => state.minPerBid,
    endDate: (state) => state.endDate,
    endTime: (state) => state.endTime,
    imgDataUrl: (state) => state.imgDataUrl,
    description: (state) => state.description,
};

const actions = {
    createNewItem({ commit, state }) {
        let beginAt = new Date();

        let endAt = new Date(state.endDate);
        let [hrs, min] = state.endTime.split(":");
        endAt.setHours(hrs, min, 0);

        let newItem = {
            sellerID: auth.currentUser.uid,
            title: state.title,
            startingPrice: state.startingPrice,
            // current is starting at create
            currentPrice: state.startingPrice,
            minPerBid: state.minPerBid,
            beginAt: beginAt.toISOString(),
            endAt: endAt.toISOString(),
            imgDataUrl: state.imgDataUrl,
            description: state.description,
        };

        commit("setNewItem", newItem);
    },
};

const mutations = {
    setNewItem(state, newItem) {
        // get new item ID
        let itemID = db
            .ref("items/")
            .push()
            .getKey();

        // set new item to items/
        db.ref("items/")
            .child(itemID)
            .set(newItem, (error) => {
                if (error) {
                    alert("Could not create new item: " + error);
                } else {
                    state.showNewItemDialog = false;
                    state.title = "";
                    state.startingPrice = "";
                    state.minPerBid = "";
                    state.endDate = "";
                    state.endTime = "";
                    state.imgDataUrl = "";
                    state.description = "";
                }
            });

        // add new item ID to users/
        let userRef = db.ref("users/").child(auth.currentUser.uid);
        userRef.child("myItems").once("value", (snapshot) => {
            if (snapshot.exists()) {
                let myCurrentItems = snapshot.val();
                myCurrentItems.push(itemID);
                userRef.child("myItems").set(myCurrentItems);
            } else {
                userRef.child("myItems").set([itemID]);
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
    updateDescription(state, newDescription) {
        state.description = newDescription;
    },
    openNewItemDialog(state) {
        state.showNewItemDialog = true;
    },
    closeShowNewItemDialog(state) {
        state.showNewItemDialog = false;
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};

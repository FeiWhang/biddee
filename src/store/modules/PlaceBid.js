import { db, auth } from "@/firebase";

const state = {
    placeBidID: "",
    showPlaceBidDialog: false,
};

const getters = {
    placeBidID: (state) => state.placeBidID,
    showPlaceBidDialog: (state) => state.showPlaceBidDialog,
};

const actions = {
    onPlaceBIDConfirmed({ commit }, bidData) {
        commit("setBid", bidData);
    },
};

const mutations = {
    openShowPlaceBidDialog(state) {
        state.showPlaceBidDialog = true;
    },
    closeShowPlaceBidDialog(state) {
        state.showPlaceBidDialog = false;
    },
    onItemCardClicked(state, id) {
        state.placeBidID = id;
        state.showPlaceBidDialog = true;
    },
    setPlaceBidID(state, id) {
        state.placeBidID = id;
    },
    setBid(state, bidData) {
        // get the bid id
        let bidID = db
            .ref("bids/")
            .push()
            .getKey();

        // add to /bids
        db.ref("bids/")
            .child(bidID)
            .set(bidData, (error) => {
                if (error) {
                    alert("Could not create new bid: " + error);
                }
            });

        // add to the item bid history
        let itemsRef = db.ref("items/").child(bidData.itemID);
        itemsRef.child("bidHistory").once("value", (snapshot) => {
            if (snapshot.exists()) {
                let myCurrentBids = snapshot.val();
                myCurrentBids.push(bidID);
                itemsRef.child("bidHistory").set(myCurrentBids);
            } else {
                itemsRef.child("bidHistory").set([bidID]);
            }
        });

        // adjust current price on item
        itemsRef.child("currentPrice").set(bidData.bidPrice);

        // add to users/
        let usersRef = db.ref("users/").child(auth.currentUser.uid);
        usersRef.child("myBids").once("value", (snapshot) => {
            if (snapshot.exists()) {
                let myCurrentBids = snapshot.val();
                myCurrentBids.push(bidID);
                usersRef.child("myBids").set(myCurrentBids);
            } else {
                usersRef.child("myBids").set([bidID]);
            }
        });

        state.showPlaceBidDialog = false;
        state.placeBidID = "";
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};

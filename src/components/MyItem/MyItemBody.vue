<template>
    <div class="MyItemBody">
        <v-dialog
            v-model="showNewItemDialog"
            persistent
            max-width="720px"
            transition="dialog-transition"
        >
            <div class="DialogContainer">
                <v-icon
                    large
                    color="rgb(216, 68, 88)"
                    class="CloseDialog"
                    @click="showNewItemDialog = false"
                >
                    mdi-close
                </v-icon>
                <NewItemCard />
            </div>
        </v-dialog>
        <v-dialog
            v-model="showEditItemDialog"
            persistent
            max-width="400px"
            transition="dialog-transition"
        >
            <div class="DialogContainer">
                <v-icon
                    large
                    color="rgb(216, 68, 88)"
                    class="CloseDialog"
                    @click="updateShowEditItemDialog(false)"
                >
                    mdi-close
                </v-icon>
                <EditItemCard />
            </div>
        </v-dialog>
        <section class="MyItemBody__newItem" v-if="!myItems.length">
            <div class="layout">
                <div class="NewItem">
                    <h2>Get started with your first item now !</h2>
                    <v-btn rounded @click="showNewItemDialog = true">
                        Create new item

                        <v-icon right>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </div>
            </div>
        </section>
        <section class="MyItemBody__currentItem" v-if="myItems.length">
            <div class="layout">
                <div class="CurrentItem">
                    <div class="CurrentItem__header">
                        <h2>My item</h2>
                        <v-btn rounded @click="showNewItemDialog = true">
                            Create new item

                            <v-icon right>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </div>
                    <div class="CurrentItem__showcase">
                        <v-data-table
                            :headers="headers"
                            :items="myItems"
                            :items-per-page="5"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            class="elevation-1 mt-8"
                        >
                            <template v-slot:[`item.imgDataUrl`]="{ item }">
                                <div class="p-2">
                                    <v-img
                                        :src="item.imgDataUrl"
                                        :alt="item.title"
                                        height="120px"
                                        width="120px"
                                        class="mt-2 mb-2"
                                    ></v-img>
                                </div>
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                                <div class="p-2">
                                    <v-btn
                                        rounded
                                        @click="
                                            onEditItemClicked({
                                                id: item.id,
                                                editTitle: item.fullTitle,
                                                editDescription:
                                                    item.description,
                                            })
                                        "
                                    >
                                        <v-icon left>
                                            mdi-pencil
                                        </v-icon>
                                        Edit
                                    </v-btn>
                                </div>
                            </template>
                        </v-data-table>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { db, auth } from "@/firebase";
import NewItemCard from "@/components/NewItem/NewItemCard";
import EditItemCard from "@/components/MyItem/EditItemCard";
import { mapMutations, mapGetters } from "vuex";

export default {
    name: "MyItemBody",
    components: { NewItemCard, EditItemCard },
    methods: {
        ...mapMutations([
            "updateEditID",
            "updateEditTitle",
            "updateEditDescription",
            "updateShowEditItemDialog",
        ]),
        onEditItemClicked(info) {
            this.updateShowEditItemDialog(true);
            this.updateEditID(info.id);
            this.updateEditTitle(info.editTitle);
            this.updateEditDescription(info.editDescription);
        },
    },
    computed: {
        ...mapGetters(["showEditItemDialog"]),
        showEditItemDialog: {
            get() {
                return this.$store.getters.showEditItemDialog;
            },
            set(newShowEditItemDialog) {
                this.$store.commit(
                    "updateShowEditItemDialog",
                    newShowEditItemDialog
                );
            },
        },
    },
    data() {
        return {
            showNewItemDialog: false,
            headers: [
                {
                    text: "Images",
                    sortable: false,
                    value: "imgDataUrl",
                },
                {
                    text: "Title",
                    sortable: false,
                    value: "title",
                },
                {
                    text: "Current price",
                    value: "currentPrice",
                },
                { text: "End at", value: "endAt" },
                { text: "Status", value: "status" },
                {
                    text: "Action",
                    value: "action",
                    sortable: false,
                    align: "end",
                },
            ],
            sortBy: "endAt",
            sortDesc: false,
            myItems: [],
        };
    },
    mounted() {
        // load myitems keys from users ref
        db.ref("users/")
            .child(auth.currentUser.uid)
            .child("myItems")
            .on("value", (snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        let itemID = childSnapshot.val();
                        db.ref("items/")
                            .child(itemID)
                            .on("value", (ss) => {
                                let itemData = ss.val();
                                let title =
                                    itemData.title.length >= 25
                                        ? itemData.title.slice(0, 24) + "..."
                                        : itemData.title;

                                let myItem = {
                                    id: itemID,
                                    title: title,
                                    fullTitle: itemData.title,
                                    currentPrice: itemData.currentPrice,
                                    imgDataUrl: itemData.imgDataUrl,
                                    description: itemData.description,
                                };

                                let now = new Date();
                                let end = new Date(itemData.endAt);

                                now >= end
                                    ? (myItem.status = "closed")
                                    : (myItem.status = "active");

                                let dd = end.getDate();
                                let mm = end.getMonth();
                                let yy = end.getFullYear();
                                let hrs = end.getHours();
                                let min = end.getMinutes();

                                myItem.endAt =
                                    dd +
                                    "/" +
                                    mm +
                                    "/" +
                                    yy +
                                    " " +
                                    hrs +
                                    ":" +
                                    min;

                                this.myItems.length >= snapshot.val().length
                                    ? this.myItems.forEach((item) => {
                                          if (item.id == itemID) {
                                              item.title = myItem.title;
                                              item.description =
                                                  myItem.description;
                                          }
                                      })
                                    : this.myItems.push(myItem);
                            });
                    });
                } else {
                    console.log("No myitem found");
                }
            });
    },
};
</script>

<style lang="scss" scoped>
.MyItemBody {
    .layout {
        width: var(--layoutWidth);
        margin: 0 auto;
        padding: 6rem 0;
    }
    &__newItem {
        .layout {
            padding-top: 6rem;
        }
    }
}

.NewItem {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: center;
}

.CurrentItem {
    &__header {
        display: flex;
        justify-content: space-between;
    }

    &__showcase {
        display: flex;
        flex-direction: column;
    }
}

.DialogContainer {
    position: relative;

    .CloseDialog {
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 26px;
        padding: 4px;
    }
}
</style>

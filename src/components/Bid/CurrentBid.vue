<template>
    <div class="CurrentBid">
        <h2>On going Bid</h2>
        <div class="CurrentBid__showcase">
            <v-data-table
                :headers="headers"
                :items="currentBids"
                :items-per-page="3"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                no-data-text="No on going bid to show, place your bid now !"
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
                            id="itemIMG"
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
                                    editDescription: item.description,
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
                <template v-slot:[`item.status`]="{ item }">
                    <v-chip
                        :color="
                            item.status == 'closed'
                                ? 'rgb(216, 68, 88)'
                                : 'rgb(64, 163, 63)'
                        "
                        dark
                    >
                        {{ item.status }}
                    </v-chip>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "CurrentBid",
    data() {
        return {
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
            currentBids: [],
        };
    },
};
</script>

<style lang="scss" scoped>
.CurrentBid {
    h2 {
        text-align: left;
    }
}
</style>

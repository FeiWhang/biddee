<template>
    <div class="NewItemImage">
        <div class="ImageBox">
            <img v-if="imgDataUrl == ''" src="@/assets/img/image.png" />
            <img v-if="imgDataUrl != ''" :src="imgDataUrl" />
        </div>
        <v-btn small rounded @click="showUploader">Set Image</v-btn>
        <img-uploader
            field="img"
            @crop-success="updateImgDataUrl"
            v-model="showImageUpload"
            :width="300"
            :height="300"
            noCircle
            img-format="png"
            langType="en"
        ></img-uploader>
    </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import { mapMutations, mapGetters } from "vuex";

export default {
    name: "NewItemBody",
    data() {
        return {
            showImageUpload: false,
        };
    },
    components: {
        "img-uploader": myUpload,
    },

    methods: {
        ...mapMutations(["updateImgDataUrl"]),
        showUploader() {
            this.showImageUpload = !this.showImageUpload;
        },
    },
    computed: {
        ...mapGetters(["imgDataUrl"]),
    },
};
</script>

<style lang="scss" scoped>
.ImageBox {
    overflow: hidden;
    border-radius: 8px;
    background-color: #f5f8fc;
    width: 300px;
    height: 300px;
    display: flex;
    img {
        margin: auto;
    }
    margin-bottom: 1.5rem;
}
</style>

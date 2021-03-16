<template>
    <div class="NewItemImage">
        <div class="ImageBox">
            <img v-if="imgDataUrl == ''" src="@/assets/img/image.png" />
            <img v-if="imgDataUrl != ''" :src="imgDataUrl" />
        </div>
        <v-btn small rounded @click="showUploader">Set Image</v-btn>
        <img-uploader
            field="img"
            @crop-success="cropSuccess"
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

export default {
    name: "NewItemBody",
    data() {
        return {
            showImageUpload: false,

            imgDataUrl: "",
        };
    },
    components: {
        "img-uploader": myUpload,
    },

    methods: {
        showUploader() {
            this.showImageUpload = !this.showImageUpload;
        },
        cropSuccess(imgDataUrl) {
            this.imgDataUrl = imgDataUrl;
        },
    },
};
</script>

<style lang="scss" scoped>
.ImageBox {
    overflow: hidden;
    border-radius: 8px;
    background-color: var(--blueHover);
    width: 300px;
    height: 300px;
    display: flex;
    img {
        margin: auto;
    }
    margin-bottom: 1rem;
}
</style>

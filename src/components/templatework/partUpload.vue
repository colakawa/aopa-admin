<template>
    <div>
      <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item">
            <img :src="imgUrlPrefix + 'carousel/' + item">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <!-- <input :value="defaultList" @input="changeValue($event.target.value)"/> -->
    <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :data="uploadData"
        multiple
        name="carousel_img_url"
        type="drag"
        action="http://www.lcsairport.com/admin/Carousel_manage/carouselUploadImg"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
    </div>
</template>
<script>
    export default {
        props: {
          imagesList: {
            type: String,
            // default: []
          },
        },
        data () {
            return {
                defaultList: [],
                imgUrlPrefix: process.env.VUE_APP_IMG_BASE_URL,
                imgName: '',
                visible: false,
                uploadList: [],
                token: {'token': this.$stores.getToken()},
                uploadData: {
                  token: this.$stores.getToken(),
                }
            }
        },
        methods: {
            changeValue:function(value){
              this.defaultList = value;
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            // 上传成功
            handleSuccess (res, file) {
                this.uploadList.push(res.data.carousel_img_url);
                this.$emit('childByValue', this.uploadList)
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            // 上传之前
            handleBeforeUpload (e) {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
                this.uploadData = this.token;
            },
        },
        created () {
            this.uploadList.push(this.imagesList);
            console.log(this.uploadList)
            console.log(this.imagesList)
        }
    }
</script>
<style lang="scss">
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

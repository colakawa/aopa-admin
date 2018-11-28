<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑导航</p>
        <FormItem label="下载内容标题" prop="download_title">
            <Input v-model="formValidate.download_title" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="下载文件地址" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入文本"></Input>
            <Upload 
            :format="['zip','pdf']"
            :data="uploadData"
            name="download_url"
            action="http://www.lcsairport.com/admin/Downloads_manage/uploadDownload">
                <Button icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
            <!-- <part-upload
                v-model="formValidate.download_url"
                :imagesList="formValidate.download_url"></part-upload> -->
        </FormItem>
        <FormItem label="下载内容类型" prop="download_type">
            <Select v-model="formValidate.download_type">
                <Option v-for="item in typeList" :key="item.id" :value="item.id"> {{item.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="状态" prop="download_status">
            <Select v-model="formValidate.download_status">
                <Option v-for="item in statusList" :key="item.id" :value="item.id"> {{item.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="实施时间" prop="applying_time">
            <DatePicker type="date" placeholder="YYYY-MM-DD" v-model="formValidate.applying_time"></DatePicker>
        </FormItem>
        <FormItem label="创建时间" prop="add_time">
            <DatePicker type="date" placeholder="YYYY-MM-DD" v-model="formValidate.add_time"></DatePicker>
        </FormItem>
        <FormItem label="修改时间" prop="update_time">
            <DatePicker type="date" placeholder="YYYY-MM-DD" v-model="formValidate.update_time"></DatePicker>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存内容</Button>
            <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
    </Form>
</template>
<script>
import PartUpload from '../../../components/templatework/partUpload.vue'
    export default {
        components: {
            PartUpload
        },
        data () {
            return {
                formValidate: {
                    download_title: '',
                    download_type: '',
                    download_status: '',
                    applying_time: '',
                    add_time: '',
                    update_time: ''
                },
                uploadData: {
                  token: this.$stores.getToken(),
                },
                uploadList: [],
                delBtn: 1,
                ruleValidate: {
                    download_title: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    download_type: [
                        { required: true, message: 'Please select the city', trigger: 'change', type: 'number' }
                    ],
                    download_status: [
                        { required: true, message: 'Please select gender', trigger: 'change', type: 'number' }
                    ],
                    applying_time: [
                        { required: true, message: 'Please select gender', trigger: 'blur', type: 'date' }
                    ],
                    add_time: [
                        { required: true, message: 'Please select gender', trigger: 'blur', type: 'date' }
                    ],
                    update_time: [
                        { required: true, message: 'Please select gender', trigger: 'blur', type: 'date' }
                    ],
                },
                download_id: '',
                typeList: [
                  {id: 1, name: 'pdf'},
                  {id: 2, name: 'zip'},
                ],
                statusList: [
                  {id: 1, name: '发布'},
                  {id: 2, name: '冻结'},
                ],
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            // 获取详情数据
            getData (download_id){
              const that = this;
              this.$fetch
                .post('/admin/Downloads_manage/getDownload', {
                  token: this.$stores.getToken(),
                  download_id: this.download_id
                })
                .then(res => {
                  for(let i in that.formValidate){
                    that.formValidate[i] = res.data[i];
                  }
                  console.log(res, 'res');
                })
                .catch(error => {
                  console.log(error);
                });
            },
            // handleSuccess(){
            //     alert(111)
            //     this.delBtn = 0;
            // }
        },
        created(){
          if(this.$route.query.downloadId != ''){
            this.download_id = this.$route.query.downloadId;
            this.getData();
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>


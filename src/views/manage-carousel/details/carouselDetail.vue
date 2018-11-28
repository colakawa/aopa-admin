<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑轮播</p>
        <FormItem label="轮播图片标题" prop="carousel_title">
            <Input v-model="formValidate.carousel_title" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="图片地址" prop="carousel_img_url">
            <part-upload
              v-model="formValidate.carousel_img_url"
              :imagesList="formValidate.carousel_img_url"
              v-on:childByValue="childByValue"></part-upload>
        </FormItem>
         <FormItem label="排序" prop="sort">
            <Input v-model="formValidate.sort" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="跳转链接" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="状态" prop="carousel_status">
            <Select v-model="formValidate.carousel_status">
                <Option v-for="status in statusList"
                :key="status.id"
                :value="status.id"> {{status.name}} </Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
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
                carousel_id: '',
                formValidate: {
                    carousel_title: '',
                    sort: '',
                    url: '',
                    carousel_status: '',
                    carousel_img_url: ''
                },
                ruleValidate: {
                    carousel_title: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    url: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    carousel_status: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                },
                statusList:[
                  {id: 1, name: '正常'},
                  {id: 2, name: '删除'},
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
            getData(carousel_id){
              const that = this;
              this.$fetch
                .post('/admin/Carousel_manage/getCarouselDetails', {
                  token: this.$stores.getToken(),
                  carousel_id: this.carousel_id
                })
                .then(res => {
                  for(let i in that.formValidate){
                    that.formValidate[i] = res.data[i];
                  }
                  that.formValidate.carousel_img_url = res.data.carousel_img_url.split(',').toString();
                //   console.log( typeof(that.formValidate.carousel_img_url))
                })
                .catch(error => {
                  console.log(error);
                });
            },
            childByValue(value){
                console.log(value, '666666')
                this.formValidate.carousel_img_url = value;      //在这里接受子组件传过来的参数，赋值给data里的参数
            },
        },
        created(){
          if(this.$route.query.carouselId != ''){
            this.carousel_id = this.$route.query.carouselId;
            this.getData();
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>


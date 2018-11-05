<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑轮播</p>
        <FormItem label="轮播图片标题" prop="carousel_title">
            <Input v-model="formValidate.carousel_title" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="图片地址" prop="mail">
            <Input v-model="formValidate.mail" placeholder="请输入文本"></Input>
        </FormItem>
         <FormItem label="排序" prop="sort">
            <Input v-model="formValidate.sort" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="跳转链接" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="状态" prop="carousel_status">
            <Select v-model="formValidate.carousel_status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    carousel_title: '',
                    sort: '',
                    url: '',
                    carousel_status: '',
                    // desc: ''
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
                }
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


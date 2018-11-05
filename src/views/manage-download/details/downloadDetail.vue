<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑导航</p>
        <FormItem label="下载内容标题" prop="download_title">
            <Input v-model="formValidate.download_title" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="下载文件地址" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="下载内容类型" prop="download_type">
            <Select v-model="formValidate.download_type">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="状态" prop="download_status">
            <Select v-model="formValidate.download_status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="实施时间" prop="applying_time">
            <DatePicker type="datetime" placeholder="Select date and time" v-model="formValidate.applying_time"></DatePicker>
        </FormItem>
        <FormItem label="创建时间" prop="add_time">
            <DatePicker type="datetime" placeholder="Select date and time" v-model="formValidate.add_time"></DatePicker>
        </FormItem>
        <FormItem label="修改时间" prop="update_time">
            <DatePicker type="datetime" placeholder="Select date and time" v-model="formValidate.update_time"></DatePicker>
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
                    download_title: '',
                    download_type: '',
                    download_status: '',
                    applying_time: '',
                    add_time: '',
                    update_time: ''
                },
                ruleValidate: {
                    download_title: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    download_type: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    download_status: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    applying_time: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    add_time: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    update_time: [
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


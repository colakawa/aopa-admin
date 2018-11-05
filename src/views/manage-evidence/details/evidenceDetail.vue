<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑导航</p>
        <FormItem label="许可证编号" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场名称" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="地址" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场类型" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="机场类别/级别" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="机场所有人" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场运营人" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="发证机关" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="首次颁证日期" prop="air_url">
            <DatePicker type="datetime" placeholder="Select date and time" v-model="formValidate.applying_time"></DatePicker>
        </FormItem>
        <FormItem label="颁证日期" prop="air_url">
            <DatePicker type="datetime" placeholder="Select date and time" v-model="formValidate.applying_time"></DatePicker>
        </FormItem>
        <FormItem label="状态" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="操作时间" prop="air_url">
            <DatePicker type="datetime" placeholder="Select date and time" v-model="formValidate.applying_time"></DatePicker>
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
                    airport_name: '',
                    air_url: '',
                    rank: '',
                    status: '',
                },
                ruleValidate: {
                    airport_name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    air_url: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    rank: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    status: [
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


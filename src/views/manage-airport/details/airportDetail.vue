<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑导航</p>
        <FormItem label="机场类别" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="机场类型" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="机场类/级别" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="机场名称" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="许可证编号" prop="air_url">
            <Input v-model="formValidate.air_url" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场状态" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="机场运营人" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="所属监管局" prop="status">
            <Select v-model="formValidate.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="联系电话" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本"></Input>
        </FormItem>
         <FormItem label="E-mail" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本"></Input>
        </FormItem>
         <FormItem label="联系地址" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本"></Input>
        </FormItem>
         <FormItem label="邮政编码" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场基准点坐标" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本" />°
            <Input v-model="formValidate.rank" placeholder="请输入文本" />′
            <Input v-model="formValidate.rank" placeholder="请输入文本" />″
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


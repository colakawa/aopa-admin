<template>
    <Table border stripe :columns="columns7" :data="data6">
    </Table>
</template>
<script>
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: "Name",
                        key: "name",
                        render: (h, params) => { //自定义渲染当前列，包括渲染自定义组件，它基于 Vue 的 Render 函数
                        //render 函数传入两个参数，第一个是 h，第二个是对象，包含 row、column 和 index，分别指当前单元格数据，当前列数据，当前是第几行。
                            return h("div", [
                                h("Icon", {
                                    props: {
                                        type: "person"
                                    }
                                }),
                                h("strong", params.row.name)
                            ]);
                        }
                    },
                    {
                        title: "Age",
                        key: "age"
                    },
                    {
                        title: "Address",
                        key: "address"
                    },
                    {
                        title: "Action",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("Button", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, "View"),
                                h("Button", {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, "Delete")
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: "John Brown",
                        age: 18,
                        address: "New York No. 1 Lake Park"
                    },
                    {
                        name: "Jim Green",
                        age: 24,
                        address: "London No. 1 Lake Park"
                    },
                    {
                        name: "Joe Black",
                        age: 30,
                        address: "Sydney No. 1 Lake Park"
                    },
                    {
                        name: "Jon Snow",
                        age: 26,
                        address: "Ottawa No. 2 Lake Park"
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: "User Info",
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            
        }
    }
</script>

<template>
    <div>
        <div id="editor"></div>
    </div>
    <!-- <script  ref="editor" type="text/plain"></script> -->
</template>

<script>
import './static/ueditor-1.4.3.3/ueditor.config';
import './static/ueditor-1.4.3.3/ueditor.all';
// import './static/ueditor-1.4.3.3/ueditor.parse.min';
import './static/ueditor-1.4.3.3/lang/zh-cn/zh-cn';

export default {
    name: 'ue',
    props: {
        value: {
            type: String,
            default: ''
        },
        // config: {
        //     type: Object,
        //     default: function(){
        //         return {
        //             autoHeightEnabled: false,
        //             autoFloatEnabled: true,
        //             initialContent: "",
        //             autoClearinitialContent: true,
        //             initialFrameWidth: null,
        //             initialFrameHeight: 450,
        //             BaseUrl: "",
        //             UEDITOR_HOME_URL: "static/ueditor-1.4.3.3/"
        //         }
        //     },
        // },
    },
    data(){
        return {
            editor: null
        }
    },
    mounted() {
        // 实例化文本编辑器
        // this.editor = window.UE.getEditor('editor');
        this.ue = UE.getEditor('editor',{ 
            BaseUrl: '', 
            UEDITOR_HOME_URL: 'static/', 
        }); 
        // 设置编辑器默认内容
        // this.editor.addListener('ready', () => {
        //     this.editor.setContent(this.value)
        // })
    },
    methods: {
        //获取编辑器中的内容
        getUEContent () {
            return this.editor.getContent()
        }
    }
}
</script>


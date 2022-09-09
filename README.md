# vite-plugin-upload-oss

## 这是一个 vite 上传 阿里云OSS 的插件

### 安装
    npm i vite-plugin-upload-oss -D

### 引入 & 使用
    import vitePluginUploadOss from "vite-plugin-upload-oss";
    

    export default defineConfig({
        plugins: [
            ...,
            vitePluginUploadOss({
                // 阿里云地区 如oss-cn-beijing
                region: '',
                // 阿里云账号AccessKey。
                accessKeyId: '',
                accessKeySecret: '',
                // 填写Bucket名称。如 fe-user-test
                bucket:''
            })
            ...
        ],
    })
    



    
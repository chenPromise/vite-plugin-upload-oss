let fs = require("fs")
let OSS = require('ali-oss');

interface optionsValue {
    region: string
    accessKeyId: string
    accessKeySecret: string
    bucket: string
}

export default function vitePluginUpLoadOss(options:optionsValue) {
    let client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: options.region,
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: options.accessKeyId,
        accessKeySecret: options.accessKeySecret,
        // 填写Bucket名称。
        bucket: options.bucket
    });
    // 文件上传
    async function put (absolutePath,fileName) {
        try {
            // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
            // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
            const result = await client.put(fileName, absolutePath);
            return result
        } catch (e) {
            console.log(e);
        }
    }

    // 文件便利上传
    interface pathDataValue {
        absolutePath: string
        fileSuperiorPath:string
        fileName:string
    }
    function getDirList(dirPath,dirName) {
        let dirList:Array<pathDataValue> = []
        let fileInfo = fs.statSync(`${dirPath}/${dirName}`)
        if (fileInfo.isFile()) {
            let pathData:pathDataValue = {
                absolutePath:`${dirPath}/${dirName}`,
                fileSuperiorPath:`${dirPath}`,
                fileName:dirName,
            }
            dirList.push(pathData)
        } else {
            let data = fs.readdirSync(`${dirPath}/${dirName}`)
            for (let idx = 0; idx < data.length; idx++) {
                dirList = dirList.concat(getDirList(dirPath+'/'+dirName,data[idx]))
            }
        }
        return dirList
    }

    let dirPath = ''
    let dirName = ''
    return {
        name:'vite-plugin-upload-oss',
        // pre 会较于 post 先执行
        enforce: 'post', // post
    
        // 指明它们仅在 'build' 或 'serve' 模式时调用
        apply: 'build', // apply 亦可以是一个函数
        configResolved:(config):void => {
            console.log(config,'config');
            dirPath = config.root
            dirName = config.build.outDir
        },
        closeBundle:():void => {
            let upLoadDir = getDirList(dirPath, dirName)
             console.log(upLoadDir)
            for (let idx = 0; idx < upLoadDir.length; idx++) {
                put(upLoadDir[idx].absolutePath,upLoadDir[idx].absolutePath.split(dirName)[1]).then(r => {
                    console.log('upLoadOss',upLoadDir[idx].absolutePath.split(dirName)[1])
                })
            }
        }
    }
}

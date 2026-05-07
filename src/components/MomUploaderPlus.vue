<template>
    <div class="mom-upload-panel" >
        <div class="upload-img-list" data-flex="dir:left wrap">
            <div v-for="(path,key) in mvalue" :key="key" class="upload-img-item" data-flex="main:center cross:center">
                <img :src="path" @click="showImg($event,key)" />
                <a v-if="calcDeletable" @click="deleteImg($event,key)" href="javascript:void(0)">
                    <van-icon name="delete-o" />
                </a>
            </div>
            <div v-if="mvalue.length<calcMaxCount && calcShowUpload" class="mom-uoload" v-bind:class="msg?'mom-upload-loading':''" data-flex="cross:center main:center">
                <van-loading v-if="msg" class="upload-van-loading" size="24px">{{msg}}...</van-loading>
                <template v-else>
                    <van-icon style="font-size: 28px;" name="photograph" />
                    <input :ref="fileRef" :accept="calcAccept" @change="change" class="mom-upload-file" type="file">
                </template>
            </div>
        </div>
        <span style="color:#999;" v-if="mvalue.length<calcMaxCount && calcShowUpload">{{calcText}}</span>
    </div>

</template>

<script>
    export default {
        name: "MomUploaderPlus",
       
        props:{
            attr:{type:Object}
        },
        data(){
            return {
                show:false,
                fileRef:Symbol('files'),
                imgRef:Symbol('filessss'),
                msg:'',
                mvalue:[],
                count:0,
                index:0
            }
        },
        methods:{
            showImg(e,key){
                this.show=true
                this.index=key
            },
            deleteImg(e,key){
                this.mvalue.splice(key, 1);
                this.count--
            },
            handleValue(){
                if(this.$helper.checkNotEmpty(this.value)){
                    let arr=[]
                    var list =  this.value.split(",")
                    list.map(item=>{
                        arr.push(item)
                    })
                    // this.mvalue=arr
                    this.mvalue=Array.from(new Set(arr));
                    this.count=this.mvalue.length
                }else{
                    this.mvalue=[]
                    this.count=0
                }
            },
            oversize(){
                let size =this.calcMaxSize/(1000*1024)
                 this.$message.error(`上传的文件太大，文件大小不能大于${size}M`)
            },
            change(e){
                this.msg="上传中"
                if(e.target.files[0].size>this.calcMaxSize){
                    this.oversize()
                    this.msg=''
                    return ;
                }
                window.postFile(-1,e.target.files,(_fileKey,_fileName)=>{
                    this.msg=""
                    this.mvalue.push(_fileName)
                    this.mvalue=Array.from(new Set(this.mvalue));
                    // this.count++
                    this.count=this.mvalue.length
                })
            },
            onChange(index){
                this.index=index
            },
            prev(){
                this.index--
                this.$refs[this.imgRef].swipeTo(this.index)
            },
            next(){
                this.index++
                this.$refs[this.imgRef].swipeTo(this.index)
            },
            afterRead(file){
                this.handleFileInput(file)
                if(this.$helper.checkArray(file)){
                    let count=file.length
                    let key=0
                    file.map(item=>{
                        item.status = 'uploading';
                        item.message = '上传中';
                    })
                    this.handleUpload(file,key,count)
                }else{
                    file.status = 'uploading';
                    file.message = '上传中';
                    const _upload=(_key,_file)=>{
                        window.postFile(_key,_file,(_fileKey,_fileName)=>{
                            file.status=''
                            file.content=_fileName
                            file.url=_fileName
                            this.count++
                           
                        })
                    }
                    _upload(0,file.file)
                }
            },
            handleFileInput(file){
                console.log('                file',                file)
            },
            handleUpload(file,key,count){
                const upload2=(_key,_file)=>{
                    window.postFile(_key,_file,(_fileKey,_fileName)=>{
                        file[_key].status=''
                        file[_key].content=_fileName
                        file[_key].url=_fileName
                        this.count++
                        if(_key<(count-1)){
                            let __k=_key+1
                            upload2(__k,file[__k].file)
                        }
                    })
                }
                upload2(key,file[key].file)
            },
            deleteFile(){
                this.count=this.count-1
            }
        },
        computed:{
            calcMultiple(){
                if(this.attr.multiple!=undefined){
                    return this.attr.multiple
                }else{
                    return this.calcMaxCount>1?true:false
                }
            },
            calcAccept(){
                if(this.attr.accept!=undefined){
                    return this.attr.accept
                }else{
                    return "image/*"
                }
            },
            calcMaxSize(){
                if(this.attr.maxSize!=undefined){
                    return this.attr.maxSize*1000*1024
                }else{
                    return 10*1000*1024
                }
            },
            calcMaxCount(){
                if(this.attr.maxCount!=undefined){
                    return this.attr.maxCount
                }else{
                    return 1
                }
            },
            calcPreviewSize(){
                if(this.attr.previewSize!=undefined){
                    return this.attr.previewSize
                }else{
                    return "80px"
                }
            },
            calcDeletable(){
                if(this.calcReadonly===true){
                    return false
                }
                if(this.attr.deletable!=undefined){
                    return this.attr.deletable
                }else{
                    return true
                }
            },
            calcShowUpload(){
                if(this.attr.showUpload!=undefined){
                    return this.attr.showUpload
                }else{
                    return true
                }
            },
            calcText(){
                let text=this.calcAccept
                if(this.calcAccept==="image/*"){
                    text='JPEG,JPG,PNG,GIF'
                }
                let size =this.calcMaxSize/(1000*1024)
                return `最多上传${this.calcMaxCount}张，格式：${text} 大小：${size}M`
            }
        },
        watch:{
            count(){
                let val = this.mvalue
                if(val && val.length>0){
                    let str=''
                    val.map((item)=>{
                        if(str){
                            str+=','+item
                        }else{
                            str+=item
                        }
                    })
                    this.$emit('input', str);
                    this.$emit('change', str);
                }else{
                    this.$emit('input', '');
                    this.$emit('change', '');
                }
            }
        }
    }
</script>

<style lang="less">
.upload-img-list{
display: flex;

                flex-wrap: wrap;
            }
.mom-upload-panel .mom-uoload{
    width: 60px;
    height: 60px;
    background: #f7f8fa;
    position: relative;
    margin-bottom: 10px;
}
.mom-upload-panel .mom-uoload .mom-upload-file{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 999;
}
.mom-upload-panel .mom-uoload:active{
    background: #f2f3f5;
}
.mom-upload-panel .mom-uoload:active i{
    color:#666;
}
.mom-upload-panel .mom-uoload i{
    font-size: 28px;
    color:#dcdee0;
}
.mom-upload-panel .upload-van-loading{
        text-align: center;
}
.mom-upload-panel .upload-van-loading .van-loading__text{
    margin-left: 0px;
    margin-top: 3px;
}
.mom-uoload.mom-upload-loading{
     background: #000000ba;
}
.upload-img-list .upload-img-item{
    width: 60px;height: 60px;
    border:1px solid #dedede;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
}
.upload-img-list .upload-img-item a{
    color:#666;
    position: absolute;
    right:0px;
    top:0px;
    background: #000;
    height: 16px;
    width: 16px;
    color:#fff;
}

.upload-img-list .upload-img-item img{
    max-width: 100%;
    max-height: 100%;
}
    .upload-img-prev{
        position: fixed;
        top:50%;
        left: 10px;
        z-index: 9999;
        color:#fff;
    }
    .upload-img-next{
        position: fixed;
        top:50%;
        right: 10px;
        z-index: 9999;
        color:#fff;
    }
    .upload-img-close{
        position: fixed;
        top:10px;
        right: 10px;
        z-index: 9999;
        color:#fff;
    }
</style>

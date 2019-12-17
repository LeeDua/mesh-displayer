<template>
    <div class="card" style="max-width: 18rem;min-width:12rem;margin-top: 0.8rem">
        <div class="card-style">
            <div class="header d-flex justify-content-center">
                任务列表
            </div>
            <hr style="margin: 0px 0px 0.5rem 0px;height: 1px;width: 100%">
            <div class="tasks">
                <div
                        v-for="n in rootList"
                        :key="n.id"
                >
                    <task-tree
                            :node="n"
                            @onClick="nodeWasClicked"
                    >
                    </task-tree>
                </div>
            </div>
        </div>

        <div class="mt-auto">
            <div v-if="uploading" class="fileState d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else class="d-flex justify-content-center">
                <button type="button" class="mbtn" v-if="files.length!==0">已选择 {{files.length}} 张图片</button>
            </div>
            <div class="card-footer foot-panel d-flex justify-content-around">
                <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
                    <span slot="tip">新建子任务</span>
                    <i class="fas fa-plus icons"
                       @click="pressNewTask"
                       slot="reference"
                    ></i>
                </mdb-tooltip>
                <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
                    <span slot="tip">进入编辑模式</span>
                    <i class="fas fa-edit icons"
                       @click="editTaskName"
                       :class="{colored: editing}"
                       slot="reference"
                    ></i>
                </mdb-tooltip>
                <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
                    <span slot="tip">删除任务</span>
                    <i class="fas fa-trash-alt icons" slot="reference"
                       @click="setupAlert"></i>
                </mdb-tooltip>
                <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
                    <span slot="tip">选择图片</span>
                    <i class="fas fa-image icons" slot="reference"
                       @click="selectImg"></i>
                    <input type="file" multiple style="display: none" id="selectImg"
                           ref="fileInput"
                           @change="inputUpdate"
                    >
                </mdb-tooltip>
                <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
                    <span slot="tip">上传图片</span>
                    <i class="fas fa-upload icons" slot="reference"
                       :disabled="uploadDisabled"
                       @click="onUpload"
                    ></i>
                </mdb-tooltip>
            </div>
        </div>




        <div>
            <!-- trigger modal button -->
            <mdb-modal :show="warning" @close="warning = false" warning>
                <!--Header-->
                <mdb-modal-header>
                </mdb-modal-header>
                <!--Body-->
                <mdb-modal-body>
                    <mdb-col>
                        <p>将删除 <strong class="card-text" style="font-size: 20px">{{deleteAlertText}}</strong> 及其下所有的任务（包括图片）</p>
                    </mdb-col>
                </mdb-modal-body>
                <!--Footer-->
                <mdb-modal-footer center>
                    <mdb-btn color="warning" @click.native="deleteTask">确认删除<mdb-icon icon="diamond" class="ml-1" color="white"/></mdb-btn>
                    <mdb-btn outline="warning" @click.native="warning = false">取消</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>
        </div>

        <div>
            <!-- trigger modal button -->
            <mdb-modal :show="alertFlag" @close="alertFlag = false" info removeBackdrop>
                <!--Header-->
                <div class="d-flex justify-content-center modal-header alertModal">
                        {{alertMessage}}
                </div>
            </mdb-modal>
        </div>


    </div>
</template>

<script>
    import taskTree from "./taskTree";
    import testData from './taskTest.json'
    import {mapState} from 'vuex'
    import FileUpload from 'vue-upload-component'
    import { mdbTooltip, mdbBtn, mdbIcon, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbRow, mdbCol, mdbModalFooter } from 'mdbvue';
    export default {
        name: "taskPanel",
        components: {
            FileUpload,
            taskTree,
            mdbTooltip,
            mdbBtn,
            mdbIcon,
            mdbModal,
            mdbModalHeader,
            mdbModalTitle,
            mdbModalBody,
            mdbRow,
            mdbCol,
            mdbModalFooter,
        },
        mounted(){
            console.log(testData)
            this.getAllTasks();
        },
        data(){
            return{
                rootList: [],
                deleteAlertText: "",
                warning: false,
                alertFlag: false,
                alertMessage: "",
                rootListEmpty: false,
                uploading: false,
                tempFileCount: 0
            }
        },
        computed:{
            ...mapState([
                'editing',
                'newTask',
                'currentSelectedTask',
                'files',
                'clearFile'
            ]),
            uploadDisabled(){
                return !this.files.length
            }
        },
        methods: {
            selectImg(){
              document.getElementById("selectImg").click();
            },
            inputUpdate() {
                this.$store.commit('updateFiles', this.$refs.fileInput.files);
                console.log(this.files)
            },
            onUpload(){
                if(this.currentSelectedTask.id === 1){
                    this.showAlert("请选择任务再上传图片");
                    return;
                }
                if(this.uploading){
                    return;
                }
                const fd = new FormData();
                let file_list = [];
                if(this.files.length === 0){
                    this.showAlert("请先选择图片再上传");
                    return;
                }
                for(let i=0;i<this.files.length;i++){
                    file_list.push(this.files[i].name);
                    fd.append(this.files[i].name, this.files[i])
                }
                console.log(file_list);
                fd.append('file_list',file_list);
                fd.append('id', this.currentSelectedTask.id.toString());
                console.log(fd);
                const instance = this.axios.create({
                    withCredentials: false
                });
                let that = this;
                this.$store.commit('clearFile');
                this.uploading = true;
                instance.post('http://47.99.180.225:8080/detection/upload/',fd)
                    .then(response => {
                            that.uploading = false;
                            console.log("uploadImageResponse",response.data);
                            that.$store.commit('setCurrentDisplayedTask',response.data);
                        }
                    );
            },

            getAllTasks(){
                const fd = new FormData();
                const instance = this.axios.create();
                instance.get('http://47.99.180.225:8080/detection/get_all_missions/')
                        .then(response => {
                            console.log("getAllTaskResponse",response);
                            this.rootList = response.data.tasks;
                            if(this.rootList.length === 0){
                                this.rootListEmpty = true;
                            }
                        }
                    );
            },
            nodeWasClicked(node) {
                console.log("onClick node" , node.name)
            },
            editTaskName(){
                if(this.currentSelectedTask.id === 1){
                    this.showAlert('请先单击选择任务再进入编辑模式');
                    return;
                }
                this.$store.commit('setEditState',!this.editing);
            },
            pressNewTask(){
                if(!this.newTask.isCreating){
                    this.$store.commit('setEditState',false);
                    const fd = new FormData();
                    fd.append('name','未命名任务');
                    let parent = this.currentSelectedTask.id.toString();
                    if(this.rootList.length === 0){
                        parent = 1;
                    }
                    console.log('parent',parent);
                    fd.append('parent-id',parent);
                    const instance = this.axios.create({
                        withCredentials: false
                    });
                    instance.post('http://47.99.180.225:8080/detection/create_mission/',fd)
                        .then(response => {
                                console.log("newTaskResponse",response);
                                this.rootList = response.data.tasks;
                            }
                        );
                }
                else{
                    console.log('endCreating Task');
                }
            },
            setupAlert(){
                if(this.currentSelectedTask.id === 1){
                    this.showAlert('请先单击选择任务再进行删除');
                    return;
                }
                this.$store.commit('setEditState',false);
                if(this.currentSelectedTask.id === 1)return;
                this.deleteAlertText = this.currentSelectedTask.name;
                this.warning = true;
            },
            deleteTask(){
                console.log("inDeleteTask");
                this.warning = false;
                const fd = new FormData();
                fd.append('id', this.currentSelectedTask.id.toString());
                const instance = this.axios.create({
                    withCredentials: false
                });
                instance.post('http://47.99.180.225:8080/detection/remove_mission/',fd)
                    .then(response => {
                            console.log("DeleteTask",response);
                            this.rootList = response.data.tasks;
                        }
                    );
            },
            showAlert(mes){
                this.alertMessage = mes;
                this.alertFlag = true;
                let that = this
                setTimeout(function () {
                    that.alertFlag = false;
                },1500)
            }
        },
    }
</script>

<style scoped>
    .header {
        font-weight: 600;
        font-size: 1.4rem;
        font-size: 1.2rem;
        padding: 0.2rem;
        align-content: center;
        justify-content: center;
    }
    .card-style {
        padding: 0rem 0.4rem 0.6rem;
        margin-top: 0.4rem;
        margin-left: 0rem;
    }
    .tasks{
        padding-left: 0.6rem;
        padding-right: 0.6rem;
    }
    .foot-panel{
        width: 100%;
        margin: 0rem;
        background-color: lightgrey;
    }
    .icons{
        font-size: 1.2rem;
    }
    .colored{
        color: DodgerBlue
    }
    .alertModal{
        color: white;
        font-weight: 500;
    }
    .fileState{
        margin-bottom: 1rem;
    }
    .mbtn{
        background-color: lightgrey;
        border-radius: 1rem;
        margin-bottom: 0.5rem;
        padding-left: 0.8rem;
        padding-right: 0.8rem;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        border: none;
        font-size: 0.8rem;
        pointer-events:none
    }

</style>

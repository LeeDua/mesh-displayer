<template>
    <div class="card" style="max-width: 18rem;min-width:12rem;margin-top: 0.8rem">
        <div class="card-style">
            <div class="header d-flex justify-content-center noselect" @click="rootClicked"
                :class="{colored: rootSelected}">
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
                       @click="createTask"
                       slot="reference"
                    ></i>
                </mdb-tooltip>
<!--                <mdb-tooltip trigger="hover" :options="{placement: 'top'}">-->
<!--                    <span slot="tip" v-if="!editing">进入编辑模式</span>-->
<!--                    <span slot="tip" v-else>保存修改</span>-->
<!--                    <i class="fas fa-edit icons"-->
<!--                       @click="editTaskName"-->
<!--                       :class="{colored: editing}"-->
<!--                       slot="reference"-->
<!--                    ></i>-->
<!--                </mdb-tooltip>-->
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
            <mdb-modal :show="detail" @close="detail = false" size="lg" class="modal-size">
<!--                <mdb-modal-header class="missionModal">-->
<!--                </mdb-modal-header>-->
                <div class="detail-info">
                    <div class="d-flex align-items-center">
                        <div class="slice"></div>
                        <div class="detail-title">基本信息</div>
                    </div>
                    <div>
                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">计划名称</div>
                            </div>
                            <input class="round-btn round-text detail-unit noborder large-rmagin" type="text" v-model="temp"
                                   @change="temp"
                            ></input>
                            <div class="detail-unit">
                                <div class="detail-span strong">任务性质</div>
                            </div>
                            <input class="round-btn round-text detail-unit noborder large-rmagin" type="text" v-model="temp"
                                   @change="temp"
                            ></input>
                        </div>
                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">开始日期</div>
                            </div>
                            <input class="round-btn round-text detail-unit noborder large-rmagin" type="text" v-model="temp"
                                   @change="temp"
                            ></input>
                            <div class="detail-unit">
                                <div class="detail-span strong">结束日期</div>
                            </div>
                            <input class="round-btn round-text detail-unit noborder large-rmagin" type="text" v-model="temp"
                                   @change="temp"
                            ></input>
                        </div>

                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">周执行计划</div>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline" v-for="wd in weekdays">
                                <input type="checkbox" class="custom-control-input" :id="wd">
                                <label class="custom-control-label check-text" :for="wd">{{wd}}</label>
                            </div>
                        </div>

                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">无人机编号</div>
                            </div>
                            <div class="dropdown">
                                <button class="round-btn round-text detail-unit noborder large-rmagin justify-content-between d-flex" id="无人机编号" data-toggle="dropdown">
                                    <div>A009</div>
                                    <i class="fas fa-angle-down drop-arrow arrow-color"></i>
                                </button>
                                <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item drop-item" href="#"
                                       v-for="m in missionDropdownList"
                                       :key="m"
                                    >{{m}}</a>
                                </div>
                            </div>
                            <div class="detail-unit">
                                <div class="detail-span strong">无人机类型</div>
                            </div>
                            <div class="dropdown">
                                <button class="round-btn round-text detail-unit noborder large-rmagin justify-content-between d-flex" id="无人机类型" data-toggle="dropdown">
                                    <div>多旋翼</div>
                                    <i class="fas fa-angle-down drop-arrow arrow-color"></i>
                                </button>
                                <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item drop-item" href="#"
                                       v-for="m in missionDropdownList"
                                       :key="m"
                                    >{{m}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">型号</div>
                            </div>
                            <input class="round-btn round-text detail-unit noborder large-rmagin" type="text" v-model="temp"
                                   @change="temp"
                            ></input>
                            <div class="detail-unit">
                                <div class="detail-span strong">动力类型</div>
                            </div>
                            <div class="dropdown">
                                <button class="round-btn round-text detail-unit noborder large-rmagin justify-content-between d-flex" id="动力类型" data-toggle="dropdown">
                                    <div>电动</div>
                                    <i class="fas fa-angle-down drop-arrow arrow-color"></i>
                                </button>
                                <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item drop-item" href="#"
                                       v-for="m in missionDropdownList"
                                       :key="m"
                                    >{{m}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">联系人</div>
                            </div>
                            <div class="dropdown">
                                <button class="round-btn round-text detail-unit noborder large-rmagin justify-content-between d-flex" id="联系人" data-toggle="dropdown">
                                    <div>陈鑫</div>
                                    <i class="fas fa-angle-down drop-arrow arrow-color"></i>
                                </button>
                                <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item drop-item" href="#"
                                       v-for="m in missionDropdownList"
                                       :key="m"
                                    >{{m}}</a>
                                </div>
                            </div>
                            <div class="detail-unit">
                                <div class="detail-span strong">联系电话</div>
                            </div>
                            <input class="round-btn round-text detail-unit noborder large-rmagin" type="text" v-model="temp"
                                   @change="temp"
                            ></input>
                        </div>
                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">飞行员</div>
                            </div>
                            <div class="dropdown">
                                <button class="round-btn round-text detail-unit noborder large-rmagin justify-content-between d-flex" id="飞行员" data-toggle="dropdown">
                                    <div>黄青松</div>
                                    <i class="fas fa-angle-down drop-arrow arrow-color"></i>
                                </button>
                                <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item drop-item" href="#"
                                       v-for="m in missionDropdownList"
                                       :key="m"
                                    >{{m}}</a>
                                </div>
                            </div>
                            <div class="detail-unit">
                                <div class="detail-span strong">备注</div>
                            </div>
                            <input class="round-btn round-text detail-unit noborder large-rmagin" type="text" v-model="temp"
                                   @change="temp"
                            ></input>
                        </div>
                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">飞行航线</div>
                            </div>
                            <div class="dropdown">
                                <button class="round-btn round-text detail-unit noborder large-rmagin justify-content-between d-flex" id="飞行航线" data-toggle="dropdown">
                                    <div>恩施罗针田至熊家岩</div>
                                    <i class="fas fa-angle-down drop-arrow arrow-color"></i>
                                </button>
                                <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item drop-item" href="#"
                                       v-for="m in missionDropdownList"
                                       :key="m"
                                    >{{m}}</a>
                                </div>
                            </div>
                            <div class="detail-unit">
                                <div class="detail-span strong">飞行空域</div>
                            </div>
                            <div class="dropdown">
                                <button class="round-btn round-text detail-unit noborder large-rmagin justify-content-between d-flex" id="飞行空域" data-toggle="dropdown">
                                    <div>恩施空域计划</div>
                                    <i class="fas fa-angle-down drop-arrow arrow-color"></i>
                                </button>
                                <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item drop-item" href="#"
                                       v-for="m in missionDropdownList"
                                       :key="m"
                                    >{{m}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-unit">
                                <div class="detail-span strong">任务负责人</div>
                            </div>
                            <div class="dropdown">
                                <button class="round-btn round-text detail-unit noborder large-rmagin justify-content-between d-flex" id="任务负责人" data-toggle="dropdown">
                                    <div>陈鑫</div>
                                    <i class="fas fa-angle-down drop-arrow arrow-color"></i>
                                </button>
                                <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item drop-item" href="#"
                                       v-for="m in missionDropdownList"
                                       :key="m"
                                    >{{m}}</a>
                                </div>
                            </div>
                            <div class="detail-unit">
                                <div class="detail-span strong">联系电话</div>
                            </div>
                            <input class="round-btn round-text detail-unit noborder large-rmagin" type="text" v-model="temp"
                                   @change="temp"
                            ></input>
                        </div>
                    </div>

                    <div class="detail-row">
                        <div class="foot">
                            <button class="square-btn blue-btn btn-grp"
                                    @click="hideDetail">
                                保 存
                            </button>
                            <button class="square-btn white-btn btn-grp"
                                    @click="hideDetail">
                                返 回
                            </button>
                        </div>
                    </div>


                </div>


                <mdb-modal-body>
                </mdb-modal-body>

            </mdb-modal>
        </div>

        <div>
            <!-- trigger modal button -->
            <mdb-modal :show="creating" @close="creating = false">
                <!--Header-->
                <mdb-modal-header class="missionModal">
                </mdb-modal-header>
                <!--Body-->


                <div class="dropdown mdrop">
                    <p class="round-btn heavy-text"><span style="color:red">*</span> 作业名称</p>
                    <button class="round-btn drop-width white-btn justify-content-between d-flex mission-border"
                            id="missionName" data-toggle="dropdown">
                        <div>请选择</div>
                        <i class="fas fa-angle-down drop-arrow"></i>
                    </button>
                    <div class="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#"
                           v-for="m in missionDropdownList"
                           :key="m"
                           @click="showDetail"
                        >{{m}}</a>
                    </div>
                </div>

                <mdb-modal-body>
                </mdb-modal-body>

                <!--Footer-->
                <mdb-modal-footer center>
                    <button class="square-btn blue-btn"
                        @click="hideAll">
                        确 定
                    </button>
                    <button class="square-btn white-btn"
                            @click="hideAll">
                        取 消
                    </button>
                </mdb-modal-footer>
            </mdb-modal>
        </div>


        <div>
            <!-- trigger modal button -->
            <mdb-modal :show="warning" @close="warning = false">
                <!--Header-->
                <mdb-modal-header class="deleteAlert">
                </mdb-modal-header>
                <!--Body-->
                <mdb-modal-body>
                    <mdb-col>
                        <p>将删除 <strong class="card-text" style="font-size: 20px">{{deleteAlertText}}</strong> 及其下所有的任务（包括图片）</p>
                    </mdb-col>
                </mdb-modal-body>
                <!--Footer-->
                <mdb-modal-footer center>
                    <mdb-btn color="cyan" @click.native="deleteTask">确认删除</mdb-btn>
                    <mdb-btn outline="cyan" @click.native="warning = false">取消</mdb-btn>
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
                temp: "123",
                deleteAlertText: "",
                warning: false,
                creating: false,
                detail: false,
                alertFlag: false,
                alertMessage: "",
                rootListEmpty: false,
                uploading: false,
                tempFileCount: 0,
                missionDropdownList: [
                    '无人机管道巡检-1114恩施',
                    '无人机管道巡检-1114黄水',
                    '无人机管道巡检-1114忠县',
                    '无人机管道巡检-1104忠县',
                ],
                weekdays:['周一','周二','周三','周四','周五','周六','周日']
            }
        },
        computed:{
            ...mapState([
                'editing',
                'newTask',
                'currentSelectedTask',
                'files',
                'clearFile',
                'rootSelected'
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
            rootClicked(){
                this.$store.commit('setEditState', false);
                let root = {
                        name: "",
                        id : 1
                    };
                this.$store.commit('setCurrentSelectedTask',root);
                this.$store.commit('setRootSelected',true);
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
                this.$store.commit('setEditState',false);
                this.$store.commit('setCurrentSelectedTask',{
                    name: "",
                    id : 1
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
                let that = this;
                setTimeout(function () {
                    that.alertFlag = false;
                },1500)
            },
            showDetail(){
                this.creating = false;
                this.detail = true;
            },
            hideDetail(){
                this.creating = true;
                this.detail = false;
            },
            hideAll(){
                this.creating = false;
                this.detail = false;
            },
            createTask(){
                this.creating = true;
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
    .deleteAlert{
        background-color: #17a2b8 !important;
    }
    .missionModal{
        background-color: #31a5d8 !important;
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
    }
    .white-btn{
        background-color: white;
        color: lightgray;
    }
    .heavy-text{
        font-weight: 700;
        margin-right: 0.4rem;
    }
    .round-btn{
        font-size: 1rem;
        border-radius: 1.2rem;
        padding: 0.3rem 0.5rem 0.3rem 0.8rem;
        outline: none;
    }
    .mission-border{
        border-width: 1px;
    }
    .square-btn{
        font-size: 0.8rem;
        border-radius: 0.4rem;
        padding: 0.5rem 1.2rem 0.5rem 1.2rem;
        outline: none;
    }
    .drop-width{
        width: 10rem;
    }
    .drop-arrow{
        padding-top: 0.3rem;
        padding-right: 0.3rem;
    }
    .arrow-color{
        color: #5f5f5b;
    }
    .blue-btn{
        background-color: #40adfc;
        color: white
    }
    .mdrop{
        padding: 1.5rem 1rem 5rem 3.5rem
    }
    .detail-info{
        margin-top: 2rem;
    }
    .detail-span{
        color: #5f5f5b;
        font-weight: 700;
        font-size: 1rem;
        width: 5.5rem;
        display: flex;
        justify-content: flex-end;
    }
    .detail-title{
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.4rem;
        display: inline-block;
        padding-top: 0.5rem;
        margin-left: 0.2rem;
    }
    .slice{
        width: 0.4rem;
        height: 2rem;
        background-color: #3191ba;
        display: inline-block;
    }
    .detail-row{
        margin: 1.2rem 0 1.2rem 1rem;
        display: flex;
        justify-content: center;
    }
    .detail-unit{
        display: inline-block;
        margin-left:0.5rem;
        margin-right: 0.5rem;
    }
    .large-rmagin{
        margin-right: 2rem;
    }
    .round-text{
        background-color: #f6f8fb;
        color: black;
        font-size: 0.8rem;
        width: 11rem;
        padding-left: 1.2rem;
    }
    .noborder{
        border: none
    }
    .check-text{
        color: #5f5f5b;
    }
    .drop-item{
        padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    }
    .drop-menu{
        min-width: 10rem !important;
    }
    .btn-grp{
        margin: 0 1rem 0 1rem
    }
    .foot{
        margin: 1rem 0 0 0
    }

</style>

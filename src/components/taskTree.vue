<template>
    <div>
        <div
                @click="nodeClicked"
                :style="{'margin-left': `${depth * 20}px`}"
                class="node"
                :class="{colored: (node.id === currentSelectedTask.id)}"
        >
<!--      <span-->
<!--              v-if="hasChildren"-->
<!--              class="type"-->
<!--      >{{expanded ? '&#9660;' : '&#9658;'}}</span>-->
            <span v-if="hasChildren">
                <i class="fas fa-angle-down type"
                   v-if="expanded"
                ></i>
                <i class="fas fa-angle-right type"
                   v-else
                ></i>
            </span>
            <span v-else>
                <i class="fas fa-images type"></i>
            </span>
            <input class="input-text" type="text" v-model="node.name"
                   v-if="editing && node.id=== currentSelectedTask.id"
                   :id="node.name + node.id"
                   @change="onTaskNameChanged"
            ></input>
            <span class="noselect" v-else>{{node.name}}</span>
        </div>
        <taskTree
                v-if="expanded"
                v-for="child in node.children"
                :key="child.id"
                :node="child"
                :depth="depth + 1"
                @onClick="(node) => $emit('onClick', node)"></taskTree>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'taskTree',
        props: {
            node: Object,
            depth: {
                type: Number,
                default: 0,
            }
        },
        data() {
            return {
                expanded: true,
                numClicks: 0,
                timer: null,
                newTaskName: ""
            }
        },
        methods: {
            getTask(id){
                const fd = new FormData();
                fd.append('id',id);
                console.log('id', id);
                const instance = this.axios.create();
                let that = this;
                instance.post('http://47.99.180.225:8080/detection/get_mission_info/',fd)
                    .then(response => {
                            console.log("getTaskResponse id:",id,response.data);
                            that.$store.commit('setCurrentDisplayedTask',response.data);
                        }
                    );
            },
            nodeClicked() {
                this.numClicks++;
                if(this.numClicks === 1){
                    let that = this;
                    this.timer = setTimeout(function () {
                        let payload = {
                            name: that.node.name,
                            id: that.node.id
                        };
                        that.$store.commit('setCurrentSelectedTask',payload);
                        that.getTask(that.node.id)
                        if(that.editing){
                            setTimeout(function () {
                                let inputField = document.getElementById(that.node.name + that.node.id);
                                if(inputField!=null){
                                    inputField.focus();
                                }
                            },50);
                        }
                        that.numClicks = 0;
                    },200)
                }else{
                    clearTimeout(this.timer);
                    this.expanded = ! this.expanded
                    this.numClicks = 0;
                }
                // if (!this.hasChildren) {
                //     this.$emit('onClick', this.node);
                // }
            },
            onTaskNameChanged(e){
                this.newTaskName = e.target.value;
                console.log("taskNameChanged", this.newTaskName)
            },
        },
        computed: {
            hasChildren() {
                return this.node.children;
            },
            ...mapState([
                'currentSelectedTask',
                'editing'
            ]),
        },
        watch: {
            editing(n,o){
                console.log('edit state change!',n);
                if(n===false){
                    if(this.newTaskName==="")return;
                    console.log('updateTaskName: id=',this.node.id, ';newName=',this.newTaskName);

                    const fd = new FormData();
                    fd.append('name',this.newTaskName);
                    fd.append('id',this.node.id);
                    const instance = this.axios.create({
                        withCredentials: false
                    });
                    instance.post('http://47.99.180.225:8080/detection/rename_mission/',fd)
                        .then(response => {
                                console.log("updateNameResponse",response);
                                this.rootList = response.data;
                            }
                        );

                    this.newTaskName="";
                    return;
                }
                let that = this;
                setTimeout(function () {
                    let inputField = document.getElementById(that.node.name + that.node.id);
                    if(inputField!=null){
                        inputField.focus();
                    }
                },50);
            }
        }
    }
</script>

<style scoped>
    .node {
        text-align: left;
        font-size: 18px;
    }

    .type {
        margin-right: 10px;
    }
    .colored{
        color: Dodgerblue
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
    .input-text{
        font-size: 18px;
        color: Dodgerblue;
        border-radius: 0.4rem;
        border-width: 1px;
        border-style: dashed;
        width: 8rem;
        padding-left: 0.2rem;
    }
</style>

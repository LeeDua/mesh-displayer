<template>
    <div class="card card-style d-flex align-items-center">
        <div class="mcard">
            识别结果
        </div>
        <div class="overflow-auto scrollbar scrollbar-black bordered-black square thin">
            <div
                 v-for="(img,index) in fileList"
                 @click="onSelectProblemImg(img,index)"
                 class="item-style"
            >
                <hr style="margin: 0px 0px 0.5rem 0px;height: 1px;width: 100%">
                <div style="margin-left:0.6rem;margin-right: 0.6rem;"
                     :style="{ 'color': currentDisplayed.filename === img ? 'red' : 'black'}">
                    {{img}}
                    <i class="fas fa-exclamation-circle problem-icon img-status" aria-hidden="true"
                       v-if="isProblematic(img)"></i>
                    <i class="fas fa-check-circle normal-icon img-status" aria-hidden="true"
                       v-if="!isProblematic(img)"></i>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex'
    import {mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn, mdbCardHeader, mdbCardFooter} from 'mdbvue';

    export default {
        components: {
            mdbCard,
            mdbCardBody,
            mdbCardHeader,
            mdbCardTitle,
            mdbCardText,
            mdbBtn,
            mdbCardFooter
        },
        computed: {
            ...mapState([
                'problemList',
                'problemMap',
                'fileList',
                'currentDisplayed',
                'folder'
            ]),
        },
        name: "right-bar",
        mounted() {
            this.importAll(require.context('../assets/shigongdiansucai/', true, /\.jpg$/));
        },
        methods: {
            onSelectProblemImg(filename, index) {
                console.log(filename, index);
                this.$store.commit('setIsProblemImage', true);
                this.$store.commit('setCurrentDisplayed', filename, index);
                console.log("on click,current dis change",this.currentDisplayed)
            },
            importAll(r) {
                let l = r.keys();
                let originList = [];
                for (var i = 0; i < l.length; i++) {
                    let filename = l[i].substring(2);
                    originList.push(filename)
                }
                console.log(l)
                this.$store.commit('updateFileList', originList);
                console.log(originList)
            },
            isProblematic(img) {
                return this.problemMap.get('shigongdiansucai/' + img) !== undefined;

            }
        },
    }
</script>

<style scoped>
    .img-status {
        margin-left: 0.3rem;
    }

    .problem-icon {
        color: red;
    }

    .normal-icon {
        color: #00c853;
    }

    .scrollbar-black::-webkit-scrollbar-track {
        display: none
    }

    .scrollbar-black::-webkit-scrollbar {
        display: none
    }

    .card-style {
        padding-left: 0.4rem;
        padding-right: 0.4rem;
        padding-top: 0.4rem;
        padding-bottom: 0.6rem;
    }

    .mcard {
        font-weight: 600;
        font-size: 1.4rem;
        font-size: 1.2rem;
        padding: 0.2rem;
    }
    .item-style{
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
    }
</style>

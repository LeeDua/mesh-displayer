<template>
    <div>


        <div id="top-level" style="margin-top:2rem">
            <!--        <top-bar id="topBar"></top-bar>-->
            <div id="mid-content" class="row d-flex justify-content-center">
                <!--            v-if="problemList.length!==0">-->
                <task-panel  ></task-panel>
                <carousel></carousel>
                <right-bar id="rbar" v-if="currentDisplayedTask.imgs.length !== 0"></right-bar>
            </div>
        </div>
    </div>
</template>

<script>

    import topBar from "./components/topBar";
    import carousel from "./components/carousel";
    import rightBar from "./components/rightBar";
    import taskPanel from "./components/taskPanel";

    import {mapState} from 'vuex'

    export default {
        components: {
            topBar,
            carousel,
            rightBar,
            taskPanel
        },
        computed: {
            ...mapState([
                'files',
                'problemList',
                'currentDisplayedTask'
            ])
        },
    }

</script>

<style lang="scss">
$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';


</style>

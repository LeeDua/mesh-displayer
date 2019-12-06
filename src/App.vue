<template>
    <div>
        <top-bar id="topBar"></top-bar>
        <div id="mid-content" class="row d-flex justify-content-center">
            <right-bar id="rbar"></right-bar>
            <carousel></carousel>
        </div>
    </div>


<!--            <div alt="Max-width 100%">-->
<!--                <div class="w-auto d-inline-block" style="background-color: #eee;">-->
<!--                    <carousel></carousel>-->
<!--                </div>-->
<!--                <div class="w-25 d-inline-block" style="background-color: #eee;">-->
<!--                    <right-bar></right-bar>-->
<!--                </div>-->
<!--            </div>-->
</template>

<script>

    import topBar from "./components/topBar";
    import carousel from "./components/carousel";
    import rightBar from "./components/rightBar";
    import imgPropPanel from "./components/imgPropPanel";

    import {mapState} from 'vuex'

    export default {
        components: {
            topBar,
            carousel,
            rightBar,
            imgPropPanel
        },
        computed: {
            ...mapState([
                'files',
                'problemMap',
                'filter'
            ])
        },
        mounted() {
            this.$store.commit('updateProblemMap');
            // for(var key of this.problemMap.keys()){
            //   console.log(key)
            //   console.log(this.problemMap.get(key))
            // }
        }
    }

</script>

<style lang="scss">
$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';


</style>

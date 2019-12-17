<template>
    <div class="card card-style d-flex align-items-center">
        <div class="mcard">
            {{currentDisplayedTask.name}}
        </div>
        <div class="overflow-auto scrollbar scrollbar-black bordered-black square thin">
            <div
                 v-for="img in currentDisplayedTask.imgs"
                 @click="onSelectProblemImg(img)"
                 class="item-style"
            >
                <hr style="margin: 0px 0px 0.5rem 0px;height: 1px;width: 100%">
                <div
                        style="margin-left:0.6rem;margin-right: 0.6rem;"
                        :style="{ 'color': currentDisplayed.name === img.name ? 'DodgerBlue' : 'black'}">
                    {{img.name}}
                    <i class="fas fa-exclamation-circle problem-icon img-status" aria-hidden="true"
                       v-if="img.is_alert"></i>
                    <i class="fas fa-check-circle normal-icon img-status" aria-hidden="true"
                       v-if="!img.is_alert"></i>
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
                'currentDisplayedTask'
            ]),
        },
        name: "right-bar",
        mounted() {
        },
        methods: {
            onSelectProblemImg(img) {
                let payload = {
                    name: img.name,
                    id: img.id,
                    url: img.url
                };
                this.$store.commit('setCurrentDisplayed',payload);
            },
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

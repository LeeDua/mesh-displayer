<template>
    <!--Navbar-->
    <mdb-navbar position="top" dark color="black" scrolling>
        <mdb-navbar-toggler>
            <mdb-navbar-nav>
                <file-upload
                        post-action="/upload/post"
                        extensions="gif,jpg,jpeg,png,webp"
                        accept="image/png,image/gif,image/jpeg,image/webp"
                        :multiple="true"
                        :size="1024 * 1024 * 10"
                        v-model="files"
                        @input="inputUpdate"
                        ref="upload">
                    <mdb-btn color="elegant" style="font-size: 1rem">
                        <mdb-icon icon="plus" class="mr-2"></mdb-icon>
                        选择图片
                    </mdb-btn>
                </file-upload>
                <mdb-btn color="elegant"
                         class="start-upload"
                         :disabled="uploadDisabled"
                         style="font-size: 1rem"
                         v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true"
                >
                    <mdb-icon icon="arrow-up" class="mr-2"></mdb-icon>
                    开始上传
                </mdb-btn>
            </mdb-navbar-nav>
        </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->
</template>

<script>
    import FileUpload from 'vue-upload-component'
    import { mapState } from 'vuex'
    import { mdbIcon,mdbNavbar, mdbNavItem, mdbNavbarNav, mdbNavbarToggler, mdbBtn} from 'mdbvue';


    export default {
        components: {
            FileUpload,
            mdbBtn,
            mdbIcon,
            mdbNavbar,
            mdbNavItem,
            mdbNavbarNav,
            mdbNavbarToggler
        },
        name: 'topBar',
        computed: {
            ...mapState([
                'files',
            ]),
            uploadDisabled(){
                return !this.files.length
            }
        },
        methods: {
            inputUpdate(files) {
                this.$store.commit('updateFiles', files)
                console.log(this.files)
            },
        }
    }
</script>

<style scoped>
.start-upload {
    margin-left: 1rem;
}
</style>

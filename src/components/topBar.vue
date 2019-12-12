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
                         @click="onUpload"
                         style="font-size: 1rem"
                >
<!--                    v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true"-->
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
            onUpload(){
                const fd = new FormData();
                let file_list = [];
                for(let i=0;i<this.files.length;i++){
                    file_list.push(this.files[i].file.name)
                    fd.append(this.files[i].file.name, this.files[i].file)
                }
                console.log(file_list)
                fd.append('name','test');
                fd.append('file_list',file_list);
                const instance = this.axios.create({
                    withCredentials: false
                });
                instance.post('http://47.99.180.225:8080/upload/',fd)
                    .then(response => {
                        console.log("heyheyhey",response);
                        this.$store.commit('updateOriginalReturnList',response.data.urls);
                        }
                    );
            }
        }
    }
</script>

<style scoped>
.start-upload {
    margin-left: 1rem;
}
</style>

export default {
    updateFiles(state, files) {
        state.files = files
    },
    updateFileList(state, fileList){
        state.fileList = fileList
    },
    updateProblemMap(state) {
        var img_filter;
        for (var i=0;i<state.filter.length;i++){
            img_filter = state.filter[i];
            let file_path = img_filter.folder + '/' + img_filter.file_name;
            let boxes =[]
            for(var j=0;j<img_filter.annotations.length; j++){
                boxes.push({
                    box:img_filter.annotations[j].bbox,
                    category:img_filter.annotations[j].category_id
                })
            }
            state.problemMap.set(file_path, boxes)
            if(img_filter.folder==='shigongdiansucai'){
                state.problemList.push(file_path)
            }
        }
    },
    setIsProblemImage(state, tf_value){
        state.isProblemImage = tf_value
    },
    setCurrentDisplayed(state, filename, index){
        state.currentDisplayed = {
            filename,
            index
        };
        console.log("in set currentDis",state.currentDisplayed)
    }
}

export default {
    clearFile(state){
        state.files = []
    },
    updateFiles(state, files) {
        for(let i=0;i<files.length;i++){
            state.files.push(files.item(i))
        }
    },
    updateFileList(state, fileList){
        state.fileList = fileList
    },
    updateOriginalReturnList(state, l){
        state.originalReturnList = l;
        console.log('originalList', l);
        let problemList = [];
        let problemMap = new Map();
        for(let i=0;i<l.length;i++){
            let temp = l[i].split('/');
            let img_name = temp[temp.length -1];
            problemList.push(img_name);
            problemMap.set(img_name,{
                url:l[i],
                isProblematic: true
            })
        }
        state.problemList = problemList;
        state.problemMap = problemMap;
        console.log('problemList:', problemList);
        console.log('problemMap', problemMap);
    },
    setCurrentDisplayed(state, payload) {
        state.currentDisplayed = payload
        console.log(payload.url)
    },
    setCurrentSelectedTask(state, payload){
        state.currentSelectedTask = payload
    },
    setEditState(state, edit){
        state.editing = edit
    },
    startCreatingTask(state, parentId){
        state.newTask.isCreating = true;
        state.newTask.parentId = parentId;
    },
    resetCreatingTask(state){
        state.newTask.isCreating = false;
        state.newTask.parentId = -1;
    },
    setCurrentDisplayedTask(state, payload){
        state.currentDisplayedTask = payload;
    }


}

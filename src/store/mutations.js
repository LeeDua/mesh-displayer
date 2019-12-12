export default {
    updateFiles(state, files) {
        state.files = files
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
    setCurrentDisplayed(state, filename, index, detected){
        state.currentDisplayed = {
            filename,
            index,
            detected
        };
    }
}

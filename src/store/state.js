let json_filter = require('../assets/data.json')
export default {
    files: [],
    fileList: [],
    problemMap : new Map(),
    problemList: [],
    testInputList : [],
    filter : json_filter['images'],
    currentDisplayed: {
        filename: "",
        index: 0
    },
    folder : 'shigongdiansucai',
    isProblemImage: false
}

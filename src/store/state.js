let json_filter = require('../assets/data.json')
export default {
    files: [],
    fileList: [],
    problemMap : new Map(),
    problemList: [],
    originalReturnList: [],
    currentDisplayed: {
        filename: "",
        index: 0,
        isProblematic: false
    },
}

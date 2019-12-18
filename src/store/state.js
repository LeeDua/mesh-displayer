let json_filter = require('../assets/data.json')
export default {
    files: [],
    fileList: [],
    problemMap : new Map(),
    problemList: [],
    originalReturnList: [],
    currentDisplayed: {
        name: "",
        id: 1,
        url: ""
    },
    editing: false,
    newTask: {
        isCreating: false,
        parentId: -1,
    },
    currentSelectedTask: {
        name: "",
        id : 1
    },
    currentDisplayedTask: {
        name:"",
        id: 1,
        imgs: []
    },
    rootSelected: false
}

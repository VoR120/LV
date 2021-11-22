import { categoryConstant } from '../constant'

export const initialState = {
    categories: {
        partycell: [],
        ethnic: [],
        religion: [],
        position: [],
        term: [],
        it: [],
        flanguage: [],
        politics: [],
        flanguagelevel: [],
        grade: [],
        permission: [],
    },
    categoryNames: {
        partycell: [],
        ethnic: [],
        religion: [],
        position: [],
        term: [],
        it: [],
        flanguage: [],
        politics: [],
        flanguagelevel: [],
        grade: [],
        permission: [],
    },
    loading: false,
    error: null,
}

const CategoryReducer = (state, action) => {
    console.log(action);
    let newCategory = { ...state.categories };
    let newCName = { ...state.categoryNames };
    let result;
    switch (action.type) {
        case categoryConstant.GET_ALL_CATEGORYPM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryConstant.GET_ALL_CATEGORYPM_SUCCESS:
            Object.keys(action.payload).map(el => {
                newCategory[el] = action.payload[el]["data"]
                newCName[el] = action.payload[el]["columnName"]
            })
            return {
                ...state,
                categories: newCategory,
                categoryNames: newCName,
                loading: false
            }
        case categoryConstant.GET_ALL_CATEGORYPM_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case categoryConstant.GET_ALL_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
            newCategory[`${action.payload.key}`] = action.payload.data;
            newCName[`${action.payload.key}`] = action.payload.name;
            return {
                ...state,
                categories: newCategory,
                categoryNames: newCName,
                loading: false
            }
        case categoryConstant.GET_ALL_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case categoryConstant.ADD_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case categoryConstant.ADD_CATEGORY_SUCCESS:
            newCategory[`${action.payload.key}`] = [...newCategory[`${action.payload.key}`], action.payload.data]
            return {
                ...state,
                categories: newCategory,
                loading: false,
            }
        case categoryConstant.ADD_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case categoryConstant.UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case categoryConstant.UPDATE_CATEGORY_SUCCESS:
            const keyArray = Object.keys(action.payload.data);
            result = newCategory[`${action.payload.key}`].map(obj => {
                let newObj = { ...obj }
                if (newObj[`${keyArray[0]}`] == action.payload.data[`${keyArray[0]}`]) {
                    keyArray.forEach(k => {
                        newObj[k] = action.payload.data[k]
                    })
                }
                return newObj
            })
            newCategory[`${action.payload.key}`] = result;
            return {
                ...state,
                loading: false,
                categories: newCategory,
            }
        case categoryConstant.REMOVE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryConstant.REMOVE_CATEGORY_SUCCESS:
            result = newCategory[`${action.payload.key}`].filter(
                obj => obj[`${action.payload.keyArray[0]}`] != action.payload.id
            )
            newCategory[`${action.payload.key}`] = result;
            return {
                ...state,
                loading: false,
                categories: newCategory,
            }
        default:
            return initialState;
    }
}

export default CategoryReducer;
import { partyMemberConstant } from '../constant'

export const initialState = {
    partyMembers: [],
    loading: false,
    error: null
}

const PartyMemberReducer = (state, action) => {
    console.log("Action: ", action);
    let newPartyMember = [...state.partyMembers];
    switch (action.type) {
        case partyMemberConstant.GET_ALL_PARTYMEMBER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case partyMemberConstant.GET_ALL_PARTYMEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                partyMembers: action.payload.data
            }
        case partyMemberConstant.GET_ALL_PARTYMEMBER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case partyMemberConstant.ADD_PARTYMEMBER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case partyMemberConstant.ADD_PARTYMEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                partyMembers: [...newPartyMember, action.payload.data]
            }
        case partyMemberConstant.ADD_PARTYMEMBER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case partyMemberConstant.UPDATE_PARTYMEMBER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case partyMemberConstant.UPDATE_PARTYMEMBER_SUCCESS:
            let { data } = action.payload
            console.log("Data: ", data);
            newPartyMember.forEach((el, index) => {
                if (el.MaSoDangVien == data.MaSoDangVien)
                    newPartyMember[index] = data
            })
            console.log("Result: ", newPartyMember)
            return {
                ...state,
                loading: false,
                partyMembers: newPartyMember
            }
        case partyMemberConstant.UPDATE_PARTYMEMBER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case partyMemberConstant.REMOVE_PARTYMEMBER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case partyMemberConstant.REMOVE_PARTYMEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                partyMembers: newPartyMember.filter(el => el.MaSoDangVien != action.payload.data)
            }
        case partyMemberConstant.REMOVE_PARTYMEMBER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return initialState;
    }
}

export default PartyMemberReducer;
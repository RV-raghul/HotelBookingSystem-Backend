import { ROLE } from '../common/constants.js'


export const validateRole = (value) => {
    if (ROLE[value])
        return true
    return false
}
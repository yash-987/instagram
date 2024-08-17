import { atom, } from 'recoil'

export const AuthStore = atom({
    key: 'user',
    default:JSON.parse(localStorage.getItem('user-info')),
}
)



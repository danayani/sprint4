import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USERS = 'users'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUserLikedStationsLength,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}

window.userService = userService

function getUserLikedStationsLength(userId) {
    const user =  getById(userId).
    then(res =>  {
        console.log('res :>> ', res.data)
    })
    return user
}

function getUsers() {
    return storageService.query(STORAGE_KEY_USERS)
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY_USERS, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY_USERS, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get(STORAGE_KEY_USERS, _id)
    user.score = score
    await storageService.put(STORAGE_KEY_USERS, user)
    // const user = await httpService.put(`user/${_id}`, {_id})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USERS)
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post(STORAGE_KEY_USERS, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


    // Private funcs:
function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY_USERS)
    if (!users || !users.length) {
        users = [
            {
                id: '9RkOQpLei27I0dxRao1yttQLq',
                firstname: 'Dana',
                lastname: 'Yaniv',
                username: 'Dananiv',
                password: '1234',
                stations: [
                    '2bKRDtaf0Y86Q4hby91hqs6NX'
                ],
                likedSongs: []
            },
            {
                id: 'vBNVRcGab4y2QhreSNnIA4nrm',
                firstname: 'Shelly',
                lastname: 'Paxton Eliyahu',
                username: 'Shellyahu',
                password: '1234',
                stations: [
                    'rQP8Jnlxyk4RjyHXvrmruwTQa'
                ],
                likedSongs: []
            },
            {
                _id: 'MocCGnQtjh6yHcIYvkSkIdJKb',
                firstname: 'Shachak',
                lastname: 'Armon',
                username: 'Captain',
                password: '1234',
                likedStations: [
                    '5cksxjas29xjsa8xjsa8jxs09'
                ],
                likedSongs: []
            }
        ]
        utilService.saveToStorage(STORAGE_KEY_USERS, users)
    }
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
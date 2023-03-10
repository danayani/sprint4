
import { FastAverageColor } from "fast-average-color"


export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    shuffle,
    getAvgImgColor,
    getTimeFromSeconds,
    timeConverter,
    getSecFromTimePatern,
}

function getSecFromTimePatern(videoDuration) {


    const min = videoDuration.slice(2, videoDuration.indexOf('M'))
    let sec = videoDuration.slice(videoDuration.indexOf('M') + 1, videoDuration.indexOf('S'))
    sec = sec.padStart(2, '0')
    const duration = `${min}:${sec}`
   
    console.log(duration)
    return duration
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = `${month}, ${date} ${year}`;
    // var time = date + ' ' + month + ' ' + year ;
    return time;
}

function getTimeFromSeconds(sunSec = 0) {
    if ( isNaN(sunSec)) return sunSec
    if (!sunSec) sunSec = 0
    let time = { min: 0, sec: 0 }

    time.min = parseInt(sunSec / 59)
    time.sec = (sunSec - (time.min * 59))
    let steSec = (time.sec < 10) ? `0${time.sec}` : `${time.sec}`

    let strTime = `${time.min}:${steSec}`
    return strTime
}

function shuffle(array = [2, 11, 37, 42]) {
    console.log('1', array)
    let currentIndex = array.length
    let randomIndex = 0

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
    console.log('2', array)
    return array
}

async function getAvgImgColor(url) {
    if (!url) return
    const avgColor = new FastAverageColor()
    try {
        const color = await avgColor.getColorAsync(url)
        console.log('avg color :>> ', color);
        return color.rgba
    } catch (err) {
        console.error('Unable to get avg img color', err)
        throw err
    }
}


function makeId(length = 25) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    // console.log('data from util storage', data)
    // console.log('data from util storage', JSON.parse(data))
    return (data) ? JSON.parse(data) : undefined
}

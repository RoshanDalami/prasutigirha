import { atom } from "recoil";

const serologyAtom = atom({
    key:"Serology",
    default: 'false'
})

export {serologyAtom}
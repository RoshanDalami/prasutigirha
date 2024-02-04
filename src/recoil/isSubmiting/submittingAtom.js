import { atom } from "recoil";

const submittingAtom = atom({
    key:"submitting",
    default:false
})
export {submittingAtom}
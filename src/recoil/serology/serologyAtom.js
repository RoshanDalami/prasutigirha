import { atom } from "recoil";

const serologyAtom = atom({
  key: "Serology",
  default: 'false',
});
const serologyAtom1 = atom({ key: "Serology1", default: 'false' });
const serologyAtom2 = atom({ key: "Serology2", default: 'false' });

export { serologyAtom, serologyAtom1, serologyAtom2 };

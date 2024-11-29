import { atom } from "recoil";

interface UserDetail {
    username: string;
    email: string;
}

export const userDetail = atom<UserDetail>({
    key: "userDetail",
    default: {
        username: "",
        email: "",
    },
});

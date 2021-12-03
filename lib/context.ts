import { User } from "firebase/auth";
import { createContext } from "react";

type UserContextProps = {
	user: null | User;
	email: string;
};

export const UserContext = createContext<Partial<UserContextProps>>({
	user: null,
	email: null,
});

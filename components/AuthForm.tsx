import { doc, getDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { emailCol } from "../lib/firebase";
import { createUser, login } from "../services/userService";

/** Sign in form */
export default function AuthForm() {
    const [isSignup, setIsSignup] = useState(false);

    const toogleForm = () => {
        setIsSignup(!isSignup);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm({ mode: "onChange" });


    const loginOrSignup = async ({ email, password }) => {
        isSignup ? await createUser(email, password) : await login(email, password);
    }

    // TODO Implement check if email is already in use
    const checkMail = useCallback(
        debounce(async (username: string) => {
            if (username.length >= 3) {
                const ref = doc(emailCol, username);
                const exists = (await getDoc(ref)).exists();

            }
        }, 500),
        []
    );



    return (
        <>
            <h1>{isSignup ? "Sign Up" : "Login"}</h1>
            <form onSubmit={handleSubmit(loginOrSignup)}>
                <label htmlFor="email">Unord Email</label>
                <input name="email" type="email"
                    placeholder="unord••••••••@unord.dk"
                    {...register("email", {
                        required: "required",
                        pattern: {
                            value: /unord\w{2,4}@unord[.]dk/,
                            message: "Entered value does not match email format"
                        }
                    }
                    )} />
                {errors.email && <span role="alert">{errors.email.message}</span>}
                <hr />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    {...register("password", {
                        required: "required",
                        minLength: {
                            value: 6,
                            message: "min length is 6"
                        }
                    })}
                    type="password"
                    placeholder="••••••••"
                />
                {errors.password && <span role="alert">{errors.password.message}</span>}
                <button
                    type="submit"
                    className="btn-green"
                    disabled={!isDirty || !isValid}
                >
                    {isSignup ? "Sign up" : "Login"}
                </button>
                <button id="formToogle" onClick={toogleForm}>
                    {!isSignup ? "Sign up" : "Login"}
                </button>
            </form>
        </>
    );
}

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    const token = sessionStorage.getItem("token");
    console.log("This is your token", store.token);
    const handleClick = () => {
        actions.login(email, password);
        };

    if(store.token && store.token != "" && store.token != undefined) history("/");


	return (
		<div className="text-center mt-5">
			<h1>Create an Account</h1>
            
            <div>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Create Account</button>
            </div>

		</div>
	);
};
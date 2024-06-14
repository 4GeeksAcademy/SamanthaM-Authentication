const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
			getActions().changeColor(0, "green");
		},

		syncTokenFromSessionStore: () => {
			const token = sessionStorage.getItem("token");
			console.log("Application loaded, syncing the session storage token")
			if(token && token !="" && token != undefined) setStore({ token: token });
		},

		logout: () => {
			sessionStorage.removeItem("token");
			console.log("logging out")
			setStore({ token: null });
		},

		login: async(email, password) => {
			const opts = {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			};
	
			try{
			const resp = await fetch(process.env.BACKEND_URL+'/api/token', opts)
			if(resp.status !== 200) {
					alert("There was an error logging in", response.status);
					return false;
			}
	
			const data = await resp.json();
			console.log("access token", data)
			sessionStorage.setItem("token", data.access_token);
			setStore({ token: data.access_token })
			return true;
			}
			catch(error){
				console.error("There was an error logging in")
			}
		},
		
		getMessage: () => {
			const store = getStore();
			const opts = {
				headers: {
					Authorization: "Bearer " + store.token
				}
			};
				

				fetch("https://glorious-space-capybara-5ggjrjwrjxpj39x5-3001.app.github.dev//api/token", opts)
				.then(resp => resp.json())
				.then(data => setStore({ message: data.message }))
				.catch(error => console.log("Error loading message from backend", error));
		},

		changeColor: (index, color) => {
			const store = getStore();

			const demo = store.demo.map((elm, i) => {
				if (i === index) elm.background = color;
				return elm;
			});

			setStore({ demo: demo });
		}
	}
};
};

export default getState;
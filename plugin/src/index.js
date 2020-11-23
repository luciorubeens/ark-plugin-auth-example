import React from "react";
const { Components } = globalThis.ark;

const baseUrl = "http://localhost:4000";

export default (api) => {
	const fetch = api.http().create().withOptions({ credentials: "include" });

	const UserDetails = ({ name, onLogout }) => {
		const handleLogout = React.useCallback(async () => {
			try {
				await fetch.post(baseUrl + "/logout");
				onLogout();
			} catch (e) {
				console.error(e);
			}
		}, [fetch]);

		return (
			<div>
				<p>Name: {name}</p>
				<button
					className="mt-5 px-4 py-2 font-medium rounded shadow-sm text-white bg-theme-primary-600 hover:bg-theme-primary-700 focus:outline-none"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		);
	};

	const Login = ({ onSuccess }) => {
		const [username, setUsername] = React.useState("");
		const [password, setPassword] = React.useState("");

		const [error, setError] = React.useState();
		const [isLoading, setIsLoading] = React.useState(false);

		const handleSubmit = async (event) => {
			event.preventDefault();
			setIsLoading(true);
			try {
				await fetch.post(baseUrl + "/login", { username, password });
				onSuccess();
			} catch (e) {
				console.error(e.message);
				setError("Wrong credentials");
			}
			setIsLoading(false);
		};

		return (
			<form class="space-y-6 max-w-sm" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="username"
						className="block text-sm font-medium text-theme-secondary-text"
					>
						Username:
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="username"
							className="appearance-none block w-full px-3 py-2 border border-theme-neutral-300 rounded-md shadow-sm"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-theme-secondary-text"
					>
						Password:
					</label>
					<div className="mt-1">
						<input
							type="password"
							name="password"
							className="appearance-none block w-full px-3 py-2 border border-theme-neutral-300 rounded-md shadow-sm"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
				</div>

				{error && (
					<p className="text-theme-danger-500 py-2 font-semibold">
						{error}
					</p>
				)}

				<button
					className="w-full px-4 py-2 font-medium rounded shadow-sm text-white bg-theme-primary-600 hover:bg-theme-primary-700 focus:outline-none"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? "..." : "Login"}
				</button>
			</form>
		);
	};

	const App = () => {
		const [user, setUser] = React.useState();

		const [isChecking, setIsChecking] = React.useState(true);

		const getUser = React.useCallback(async () => {
			setIsChecking(true);
			try {
				const result = await fetch.get(baseUrl + "/session");
				setUser(result.json());
			} catch {
				setUser(undefined);
			}
			setIsChecking(false);
		}, [fetch]);

		React.useEffect(() => {
			getUser();
		}, [getUser]);

		if (isChecking) {
			return <span>Wait...</span>;
		}

		if (user) {
			return (
				<UserDetails {...user} onLogout={() => setUser(undefined)} />
			);
		}

		return <Login onSuccess={getUser} />;
	};

	const Container = ({ children }) => (
		<Components.Box className="flex-1 border-t-3 border-theme-success-500 bg-theme-neutral-200 p-10 flex items-center justify-center">
			{children}
		</Components.Box>
	);

	api.launch().render(
		<Container>
			<App />
		</Container>
	);
};

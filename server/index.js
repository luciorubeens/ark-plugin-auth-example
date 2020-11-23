const Koa = require("koa");
const session = require("koa-session");
const Router = require("koa-router");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");

const router = new Router();
const app = new Koa();

app.keys = ["secret"];

app.use(session(app));
app.use(bodyParser());
app.use(
	cors({
		credentials: true,
	})
);

router.get("/session", async (ctx) => {
	try {
		const user = ctx.session.user;
		if (user) {
			ctx.body = { id: user.id, name: user.name };
		} else {
			ctx.status = 404;
		}
	} catch {
		throw new Error(err);
	}
});

router.post("/logout", async (ctx) => {
	try {
		ctx.session = null;
		ctx.body = { message: "Ok" };
	} catch (err) {
		throw new Error(err);
	}
});

router.post("/login", async (ctx) => {
	try {
		const data = ctx.request.body;
		const { username, password } = data;

		// Check from database
		if (password === "123") {
			ctx.session.user = { username, id: "john-doe", name: "John Doe" };
			ctx.body = { message: "Ok" };
		} else {
			ctx.status = 401;
			ctx.body = { message: "Wrong password" };
		}
	} catch (err) {
		throw new Error(err);
	}
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000);
console.log("listening on port 4000");

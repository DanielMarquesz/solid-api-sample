import { app } from "./app";
import { router } from "./routes";

app.listen(3333);

app.use(router);

export { app };

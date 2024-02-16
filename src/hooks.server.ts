import { connect, disconnect } from "$database/db";
import { i18n } from "$lib/i18n"

// Connect to MongoDB before starting the server
connect().then((): void => {
    console.log("MongoDB started");
}).catch((e) => {
    console.log("MongoDB failed to start");
    console.log(e);
});

process.on('SIGINT', disconnect);
process.on('SIGTERM', disconnect);

export const handle = i18n.handle();
import config from "#config";
import server from "server";

const startServer = async () => {
    const app = await server();

    app.listen(config.port,()=>{
        console.log(`serverr is running on port: ${config.port}`)
    })
}

startServer();
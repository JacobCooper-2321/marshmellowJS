import {serve} from "https://deno.land/std@0.57.0/http/server.ts";
import request from "./request.ts";

type Tunnel = {
    path: string,
    cb: Function,
}

function marsh() {
    let _tunnels: Array<Tunnel>;


    async function start(port: number) {
        for await (const req of serve({port: port})) {
            request(req, port)
            console.log(req)
        }

    }
    return {
        start
    }
}

export default marsh;

import {serve, ServerRequest} from "https://deno.land/std@0.57.0/http/server.ts";
import {Tunnel} from "./tunnel.ts";


function marsh() {
    let _tunnels:  Array<Tunnel> = [];

    function use(path="*", handler=function(req: ServerRequest){req.respond({body:"CANNOT GET" + req.url})}) {
        _tunnels.push({path: path, handler: handler, method: "GET"})
    }

    function _use_tunnels(req: ServerRequest) {
        for (let i = 0; i < _tunnels.length; i++) {
            let current_tunnel = _tunnels[i];
            if (req.url == current_tunnel.path && req.method == current_tunnel.method) {
                current_tunnel.handler(req);
            }
        }
    }

    // @ts-ignore
    async function start(port: number) {
        for await (const req of serve({port: port})) {
            _use_tunnels(req);

        }
    }

    return {
        use,
        start,

    }
}


export default marsh;

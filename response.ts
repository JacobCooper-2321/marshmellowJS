export default function response(req) {
    let _headers: Headers;
    let res;
    function end(content: string){
            req.respond({body: content,  headers: _headers});
    }
}

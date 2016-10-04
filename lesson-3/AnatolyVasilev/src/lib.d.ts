interface InitRequest {
    method: string;
    mode: string;
    cache: string;
}

interface Request {
    method: string;
    url: string;
    context: string;
}

declare var Request: {
    prototype: Request,
    new (input: string|Request, init?: InitRequest): Request;
}


interface ResponseBody {
    blob: Blob;
    formData: FormData;
}

interface ResponseInit {
    status: string,
    statusText: string
}

interface Response {
    json: ()=> any;
    text: ()=>string;
}

declare var Response: {
    prototype: Response,
    new (input: ResponseBody, init: ResponseInit): Response;
}

declare function fetch(input: string|Request): PromiseLike<Response>

interface IPhoto {
    farm: number;
    id: string;
    isfamily: number;
    owner: string;
    secret: string;
    server: string;
    title: string;
}
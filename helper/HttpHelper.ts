import axios from 'axios';

export class HttpHelper {
    axios :any
    url :string
    body :any
    headers :any
    method :any
    params :any
    responseType: any
    validateStatus :any

    constructor () {
      this.axios = axios;
      this.validateStatus = function (status) {
        return status >= 200 && status < 500; // default success
      };
    }

    setUrl (url: string) {
      this.url = url;
      return this;
    }

    setResponseType (responseType: string) {
      this.responseType = responseType;
      return this;
    }

    setBody (body: any) {
      this.body = body;
      return this;
    }

    setHeaders (headers: any) {
      this.headers = headers;
      return this;
    }

    async get () {
      this.method = 'get';
      return await this.run();
    }

    async post () {
      this.method = 'post';
      return await this.run();
    }

    async put () {
      this.method = 'put';
      return await this.run();
    }

    config () {
      return {
        url: this.url,
        method: this.method,
        data: this.body,
        params: this.params,
        responseType: this.responseType || 'JSON',
        headers: this.headers || undefined
      };
    }

    async run () {
      return await this.axios(this.config());
    }

    static request (url: string) {
      const req = new HttpHelper();
      req.setUrl(url);
      return req;
    }
}

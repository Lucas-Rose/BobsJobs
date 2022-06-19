export class Router {
    constructor(errorHandler) { 
        this.routes = {}
        this.errorHandler = errorHandler
        window.onhashchange = () => this.route()
    }
    
    get(route, callback) {
        this.routes[route] = callback
    }

    // A simple hash path parser
    //   parse window.location.hash like "#!/observations/2" 
    //   return an object with properties `path` ("/observations") and `id` (2)
    splitHash() {

        const regex = "#!(/[^/]*)/?(.*)?";
        const match = window.location.hash.match(regex);
        if (match) {
            return {
                path: match[1],
                id: match[2]
            }
        } else {
            return { path: '/', id: '' }
        }
    }

    route() {
        const pathInfo = this.splitHash()
        if (pathInfo.path) {
            if (pathInfo.path in this.routes) { 
                this.routes[pathInfo.path](pathInfo) 
            } else { 
                this.errorHandler(pathInfo)
            }
        } else { 
            if ('' in this.routes) {
                this.routes[''](pathInfo)
            }
        }
    }
}
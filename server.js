import http from "http"

import "dotenv/config"
import { cardTemplate, indexTemplate, resources, resourceTemplate } from "./data/dataloader.js";
import fillTemplate from "./modules/fillTemplate.js";
import validator from "validator";
import chalk from 'chalk';

const PORT = process.env.PORT ?? 3000



const server = http.createServer((req, res)=> {
  const url = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);

  const pathname = url.pathname
  if(pathname != "/.well-known/appspecific/com.chrome.devtools.json") {
        console.log(chalk.yellow(`${new Date().toLocaleString()} >> Path: ${pathname}`));
  }
  

  if(pathname === "/") {
        const allCards = resources.map((item)=> fillTemplate(cardTemplate, item))
        .join("")
        const page = indexTemplate.replace(/\{\{\RESOURCE_CARDS\}\}/g, allCards)
        res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        });
        return res.end(page);
    } else if(pathname === "/api/resources") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        return res.end(JSON.stringify(resources))
    } else if(pathname === "/resource") {        
        const queryId = url.searchParams.get("id");
        if (!queryId || queryId === null) {
            res.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8",
            });
            return res.end(`<h1>Unknown id</h1>`);
        }
        const id = Number(queryId);
        const location = validator.isNumeric(queryId) ? resources[id] : undefined;
        
        if(!location) {
            res.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8",
            });
            return res.end("<h1>Location not found!</h1>");
        }

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        return res.end(fillTemplate(resourceTemplate, location));
    } else {
         res.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8",
            });
            return res.end("<h1>404 not found!</h1>");
    }
})
server.listen(PORT, ()=> {
    console.log(chalk.green(`Server running on ${PORT} // http://localhost:${PORT}/`));
    
})
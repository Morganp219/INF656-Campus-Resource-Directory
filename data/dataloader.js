import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const resources = JSON.parse(
    fs.readFileSync(path.join(__dirname, "resources.json"), "utf-8")
)


export const cardTemplate = fs.readFileSync(
    path.join(__dirname, "..", "templates", "card.html"), "utf-8"
)
export const indexTemplate = fs.readFileSync(
    path.join(__dirname, "..", "templates", "index.html"), "utf-8"
)
export const resourceTemplate = fs.readFileSync(
    path.join(__dirname, "..", "templates", "resource.html"), "utf-8"
)
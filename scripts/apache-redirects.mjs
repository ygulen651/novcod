// redirects.json listesinden statik Apache barındırması için .htaccess kuralları üretir.
import { readFileSync, writeFileSync } from "node:fs";

const redirects = JSON.parse(readFileSync("redirects.json", "utf8"));
const lines = redirects.map(({ source, destination }) => `Redirect 301 ${source} ${destination.split("#")[0]}`);
writeFileSync("deploy/apache-redirects.conf", `${lines.join("\n")}\n`);
console.log(`${lines.length} kural yazıldı: deploy/apache-redirects.conf`);

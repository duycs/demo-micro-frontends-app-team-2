// Note that this file requires node@13.2.0 or higher (or the --experimental-modules flag)
import fs from "fs";
import path from "path";
import https from "https";

const importMapFilePath = path.resolve(process.cwd(), "importmap.json");
const importMap = JSON.parse(fs.readFileSync(importMapFilePath));
const url = `https://demo-micro-frontends.s3-us-west-2.amazonaws.com/%40orgName/demo-micro-frontends-app-team-2/${process.env.TRAVIS_COMMIT}/orgName-demo-micro-frontends-app-team-2.js`;

https
  .get(url, res => {
    // HTTP redirects (301, 302, etc) not currently supported, but could be added
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (
        res.headers["content-type"] &&
        res.headers["content-type"].toLowerCase().trim() ===
          "application/javascript"
      ) {
        const moduleName = `@orgName/demo-micro-frontends-app-team-2`;
        importMap.imports[moduleName] = url;
        fs.writeFileSync(importMapFilePath, JSON.stringify(importMap, null, 2));
        console.log(
          `Updated import map for module ${moduleName}. New url is ${url}.`
        );
      } else {
        urlNotDownloadable(
          url,
          Error(`Content-Type response header must be application/javascript`)
        );
      }
    } else {
      urlNotDownloadable(
        url,
        Error(`HTTP response status was ${res.statusCode}`)
      );
    }
  })
  .on("error", err => {
    urlNotDownloadable(url, err);
  });

function urlNotDownloadable(url, err) {
  throw Error(
    `Refusing to update import map - could not download javascript file at url ${url}. Error was '${err.message}'`
  );
}

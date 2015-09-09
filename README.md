The extended config parser and loader.
=========

Currently supports inline replacement for the config properties.

Example:
```
{
  "workingDir": "./wwwroot",
  "distDir": "$(workingDir)/dist",
  "scripts": {
    "src": [ "$(workingDir)/app/**/*.ts", "$(workingDir)/typings/tsd.d.ts" ],
    "tsConfig": "$(workingDir)/tsconfig.json"
  }
}
```
translates into =>
```
{
  "workingDir": "./wwwroot",
  "distDir": "./wwwroot/dist",
  "scripts": {
    "src": [ "./wwwroot/app/**/*.ts", "./wwwroot/typings/tsd.d.ts" ],
    "tsConfig": "./wwwroot/tsconfig.json"
  }
}
```
# Auto Header Remediation 
___

## Set Up
1. clone this repo
2. run `npm i` to install dependancies
3. run `npm run build` or `parcel index.js` to create build file.
4. use included test html pages to develop.

## Deploy
To use this project on a live site:
1. download chrome extenstion tampermonkey
2. edit comments at the top of file to run on any site.
3. paste content of dist/index.js into a new script *outside* of self invoked function.
4. run `remHeaders()` in console of dev panel
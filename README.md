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

## USE
1. upon activation a UI will be appended to DOM
2. it will highlight all headers in DOM using their order of appearnce.
3. if you change the level of a header the app will remember it.
4. Once you reach the end, or press 'finished' button the Rem will be added to your clip board
5. goto DAP and paste rem into manual rem.
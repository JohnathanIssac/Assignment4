
hashutil.ts

This is a typescript compatible version of the hash utility. It calls a javascript crypto library (crypto-js). Becasue of this, there is some delicate work changing settings.

This code will require certain settings in your tsconfig.json and package.json files. Hopefully, the type setting in package.json will not conflict with other needs in yoru code base.

First, you need to install crypto-js:

npm install crypto-js

Now:
In package.json, make sure type is set to CommonJS:

 "type": "CommonJS"

In tsconfig.json, the following should be set:

Under 'Language and Environment':
    "target": "commonjs",   // You may be able to give this different
    	      	  	    // settings but this is the one I got to work.

Under 'Modules':
    "module": "commonjs",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,

Under 'Javascript support':

    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "esModuleInterop": true,

This should be all that is needed. You can use testhash.ts and verify the hashutil module works by typing:

tsc testhash.ts
node testhash.js

It should produce a hash code for all 3 users in the database.








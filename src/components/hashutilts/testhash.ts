import hashutil from './hashutil';

console.log('Test 1');
let first_name = "Harry";
let last_name = "Chung";
let pw = "abc123";
const passhash = hashutil(first_name,
			  last_name,
			  pw);

console.log ('Passhash: ' + passhash);

console.log('Test 2');

first_name = "Matt";
last_name = "Lee";
pw = "def456";
const passhash2 = hashutil(first_name,
			  last_name,
			  pw);

console.log ('Passhash2: ' + passhash2);

console.log('Test 3');

first_name = "SUE";
last_name = "Park";
pw = "rotfl1";
const passhash3 = hashutil(first_name,
			  last_name,
			  pw);

console.log ('Passhash3: ' + passhash3);



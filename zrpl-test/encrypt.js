const fs = require('fs');
const forge = require('node-forge');
//we are reading the public key from key-gen.html file &we use regex inorder to exactly read the public key 
const publicKeyPem = fs.readFileSync('./key-pairs/key-gen.html', 'utf8').match(/-----BEGIN PUBLIC KEY-----(?:\r?\n|\r)([a-zA-Z0-9+/=\r\n]+)-----END PUBLIC KEY-----/
);
//The forge.pki.publicKeyFromPem function then parses the PEM-encoded public key and returns a PublicKey object.
const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

//take commandline input from user
const input = process.argv[2];

//the publicKey.encrypt(input, 'RSA-OAEP') method encrypts the input string using the RSA-OAEP algorithm with the public key.
const encrypted = publicKey.encrypt(input, 'RSA-OAEP');

//we will write that encrypted text to result.html file with base64 encoding
fs.writeFileSync('./result.html', forge.util.encode64(encrypted));

//you can view the encrypted text in result.html file
console.log('Encrypted input saved to result.html file.');

const fs = require('fs');
const forge = require('node-forge');
//reading privaate key from key-gen.html
const privateKeyPem = fs.readFileSync('./key-pairs/key-gen.html', 'utf8');
//In this the forge.pki.privateKeyFromPem function then parses the PEM-encoded privte key and returns a Privatekey object,
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
//we willl read and store the encrypted text from result.html file
const encryptedMessage = fs.readFileSync('./result.html', 'utf8');
//we will use the forge.util.decode64() function to decode the message from base64 encoding.
const encrypted = forge.util.decode64(encryptedMessage);
//then we will decrypt the message using private and RSA-OAEP algorithm.
const decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP');
//In output you acn we view actual input text.
console.log('Decrypted message:', decrypted);

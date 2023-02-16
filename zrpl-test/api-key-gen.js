
//In the file api-key-gen.js first of all we are importing necessary packages like node-forge which contain all cryptographic utilities,
//next is file system module for reading or writing files, and atlast path module.
const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

//Next we will  generate a new RSA key pair using the Forge library, in this case it will generate a 2048-bit key.
//The private key is then extracted from the key pair and converted to PEM format using the forge.pki.privateKeyToPem() method.
//In the same way  the public key is extracted from the key pair and converted to PEM format using the forge.pki.publicKeyToPem() method
const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
//Next we will specify the directory or path where we need to store that key.
const keyGenDir = path.join(__dirname,'key-pairs');
const keyGenFile = path.join(keyGenDir, 'key-gen.html');

//checking whether directory exists, if not then create it
if (!fs.existsSync(keyGenDir)) {
  fs.mkdirSync(keyGenDir, { recursive: true });
}
//writing contents html file
fs.writeFileSync(keyGenFile, `
  <html>
    <head>
      <title>Generated Keys</title>
    </head>
    <body>
      
      <h1>Private Key</h1>
      <pre>${privateKey}</pre>
      <h1>Public Key</h1>
      <pre>${publicKey}</pre>
    </body>
  </html>
`);
//you can view the private as well as public key in key-gen.html file
console.log('Keys generated and saved to ' + keyGenFile);

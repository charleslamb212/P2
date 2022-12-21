// encryption is a two way process -- data is 'encrypted' using an algorithm and key
// you must know what they key is to decrypt or unscramble the data

// use crypto-js for encryption
const mySecret = 'I eat cookies for breakfast'

const secretKey = 'myPassword'
//a e s advanced encryption standard
const crypto = require('crypto-js')
const myEncryption = crypto.AES.encrypt(String(100), secretKey)
console.log(myEncryption.toString(), secretKey) //lets see our encrypted data

const decrypt = crypto>AES.decrypt(myEncryption.toString(), secretKey)
console.log(decrypt.toString(crypto.enc.Utf8));


//passwords in the database will be hashed
//hashing is a one way process, once data has been hashed you cannot unhash it
//hashing functions always return a hash of equal length regardless on input
// hashing functions always return the same output given the same input
constuserPassword ='12345password'
//when the user signs up we want to hash their password and save it in the db
const hashedPassword = bcrypt.hashSync(userPassword, 12)
console.log(hashedPassword);

// COMPARE a string to our hash (user login)
console.log(bcrypt.comparesync(hashedPassword, userPassword));

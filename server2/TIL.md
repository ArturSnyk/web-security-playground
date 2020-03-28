### TIL

- don't trust the client :) they can change the cookie on their side, and as a result tricking the backend.

- using `createReadStream` helps us to read file from certain path. and pipe it. Like we pipe files directly to res. we could do the same with `res.sendFile`.

const message = "This is a random string";
const encoded = btoa(message);
const decoded = atob(encoded);
console.log(message + " > " + encoded + " > " + decoded);

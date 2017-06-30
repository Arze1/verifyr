# Verifyr

### Verify data in an chain like syntax

```js
const Verify = require("verifyr");

new Verify("verifyr is the best!!!").has("verifyr").isnt("object");
```

# Chaining

Instead of making long if/else statements verifyr allows you to do complex statements with very simple chains
Example
```js
var data = new Verify("i dont use chain statements ;(")
console.log(data.has(";(").v() &&
            data.length(5,-1).v() &&
            data.is("string").v())
```

Can be turned into

```js
var data = new Verify("i use awesome chain statements");
console.log(data.has(":)").length(5,-1).is("string").v());
```

# Methods

### V/Valid

call .v() or .valid() on a Verify function to return a boolean that shows if the statement is valid

### Length
called on a verifyr object and takes two paramaters min + max length, if either of these varables are -1 it will be infinate in that direction

Example
```js
new Verify("test").length(0,4).v()
// true
new Verify("test").length(2,3).v()
// false
```

### Is
sees if type of object is same as parameter

Example
```js
new Verify("test").is("string").v()
//true
```

### Isnt
sees if type of object is diffrent than parameter

Example
```js
new Verify([a,2]).isnt("string").v()
//true
```

### Has
sees if string/array includes provided parameter

Example
```js
new Verify(Verifyr is amazing).has("verifyr").v()
//true
```

### Equals
returns if data is equal to parameter

Example
```js
new Verify("test").equals("test").v()
//true
```

### New Data
Allows you to evaluate a statement that returns a boolean on the data where x is equal to the string

Example
```js
new Verify("test").newData("new data!").has("new").v()
//true
```

# Array specific functions

### Each
Run a function for each item with the item as paramaters, function must return a bool

Example
```js
new Verify(["1","1"]).each(x => x == "1").v() //makes sure each item is "1"
//true
```

# Object specific functions

### Has Child
sees if the object has a child with a specific name

Example
```js
new Verify({x:1,y:2}).hasChild("x").v()
//true
```

### Child
goes to child + sets current data to child

Example
```js
new Verify({x:"string 1",y:"string 2"})
    .child("x")
    .is("string")
    .v()
//true
```

### Parent
goes to parent + sets current data to parent

Example
```js
new Verify({x:"string 1",y:false})
    .child("x")
    .is("string")
    .parent()
    .child("y")
    .is("boolean")
    .v()
//true
```
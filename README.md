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

# Valid Types

used with the `.is()`/`.isnt()` functions or by getting the property .type

 - `bool` any boolean (true/false)
 - `number` any number
 - `string` any string
 - `array` any array
 - `object` any JSON/Pure javascript object

 ### Types only supported using `.is()`/`.isnt()`

 - `phone` a valid phone number format (CANNOT VERIFY NUMBER IS IN USE)
 - `email` a valid email format (CANNOT VERIFY EMAIL EXISTS)

# Methods

### Save
takes one optional paramater, if this paramater is true the save will return the `.v()` response of the save
if false/left out the save will return the whole Verify class for that object that you can call more functions on

Example
```js
var save = new Verify().is("string").isnt("number").save();
//can call extra functions on this

console.log(save.test("I am a string").isnt("object").v()); 

//true

var save2 = new Verify().is("string").isnt("number").save(true); 
//cant call extra functions on this

console.log(save.test("I am a string"));
//true
```

When creating a template for `.save()` make sure to specify the [type](#types) if you would like type specific functions like `new Verify("object")`


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

view valid types [here](#types)

Example
```js
new Verify("test").is("string").v()
//true
```

### Isnt
sees if type of object is diffrent than parameter

view valid types [here](#types)

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
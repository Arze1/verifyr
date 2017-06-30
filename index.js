class Verifyr {
    constructor(data) {

        this.s = data;

        this.isValid = true;

        if(typeof(data) === "object") {
            this.p = data;
            this.path = [];
        }

        this.type = typeof(data);
    }

    equals(str) {

        if (!this.isValid) 
            return this;

        if(this.s === str) 
            return this;
        
        this.isValid = false;

        return this;
    }

    inequal(str) {

        if (!this.isValid) 
            return this;

        if(this.s !== str) 
            return this;
        
        this.isValid = false;

        return this;
    }

    is(type) {

        if (!this.isValid) 
            return this;

        if(this.type === type) 
            return this;
        
        this.isValid = false;

        return this;
    }

    isnt(type) {

        if (!this.isValid) 
            return this;

        if(this.type !== type) 
            return this;
        
        this.isValid = false;

        return this;
    }

    length(a,b) {

        if (!this.isValid) return this;

        let _len = this.s.length;

        if((a === -1 ? true : _len >= a) &&
            (b === -1 ? true : _len <= b)) {
            return this
        } else this.isValid = false;

        return this;
    }

    newData(data) {
        if (!this.isValid) 
            return this;

        return new init(data);
    }

    valid() {
        return this.isValid;
    }
    v() {
        return this.isValid;
    }
}

class _String extends Verifyr {
    has(str) {

        if (!this.isValid) 
            return this;

        if(this.s.indexOf(str) > -1) 
            return this;

        this.isValid = false;

        return this;
    }
}

class _Object extends Verifyr {

    hasChild(child) {
        if (!this.isValid) 
            return this;

        if(!this.s[data]) 
            return false;

        return this;
    }

    child(data) {
        if (!this.isValid) 
            return this;

        if(this.s[data]) {

            this.s = this.s[data];

            this.path.push(data);

            this.type = getType(this.s);

        }
        
        this.isValid = false;
        
        return this;
    }

    parent() {
        if (!this.isValid) 
            return this;

        if(this.path.length > 0) {

            this.path.splice(this.path.length,1);

            if(this.path.length === 1) 
                this.s = this.p;
            else this.s = eval(`this.p.${this.path.join(".")}`); // Potential security flaw, need to fix it

            this.type = getType(this.s);

            return this;
        } 
        
        this.isValid = false;
        
        return this;
    }
}

class _Array extends Verifyr {
    each(statement) {
        if (!this.isValid) 
            return this;

        for(var x of this.s) {
            if(!statement(x)) 
                this.isValid = false;
        }
        
        return this;
    }

    has(str) {

        if (!this.isValid) 
            return this;

        if(!this.s.indexOf(str) > -1)
            this.isValid = false;

        return this;
    }
}

function getType(data) {
    // If input is an object, check constructor to see if its an array 'object'
    if(typeof(data) === "object") {
        if(data.constructor === Array) 
            return "array";        
        return "object";
    }
    
    return "string";
}

// Determines appropriate class based on input type for initialisation
function init(input) {
    return {'array': _Array, 'object': _Object, 'string': _String}[input];
}

module.exports = init;

function getType(data) {
    if(typeof(data) === "object") {
        if(data.constructor === Array) return "array";
        else return "object";
    } else if(typeof(data) === "number") return "number";
    else {
        if(typeof(data) === "boolean") return "bool";
        else return "string";
    }
}

class Main {
    constructor(data) {

        this.s = data; // current data in object

        this.isValid = true;

        if(typeof(data) === "object") {
            this.p = data;
            this.path = [];
        }

        this.type = getType(data);
    }

    equals(str) {

        if (!this.isValid) return this;

        if(this.s === str) return this;
        else this.isValid = false;

        return this;
    }

    inequal(str) {

        if (!this.isValid) return this;

        if(this.s !== str) return this;
        else this.isValid = false;

        return this;
    }

    is(type) {

        if (!this.isValid) return this;

        if(this.type === type) return this;
        else this.isValid = false;

        return this;
    }

    isnt(type) {

        if (!this.isValid) return this;

        if(this.type !== type) return this;
        else this.isValid = false;

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
        if (!this.isValid) return this;

        return new init(data);
    }

    valid() {
        return this.isValid;
    }
    v() {
        return this.isValid;
    }
}

class _String extends Main {
    has(str) {

        if (!this.isValid) return this;

        if(this.s.indexOf(str) > -1) return this;

        else this.isValid = false;

        return this;
    }
}

class _Object extends Main {

    hasChild(child) {
        if (!this.isValid) return this;

        if(!this.s[data]) return false;

        return this;
    }

    child(data) {
        if (!this.isValid) return this;

        if(this.s[data] || this.s[data] === false) {

            console.log(this.s);
            this.s = this.s[data];
            console.log(this.s);

            this.path.push(data);

            this.type = getType(this.s);

        } else this.isValid = false;
        return this;
    }

    parent() {
        if (!this.isValid) return this;

        if(this.path.length > 0) {

            this.path.splice(this.path.length,1);

            if(this.path.length === 1) this.s = this.p;
            else {
                const path = this.path;

                let tempObj = this.p;

                for(let i = 0; i < path.length; i++) {
                    if(tempObj[path[i]]) tempObj = tempObj[path[i]];
                    else {
                        this.isValid = false;
                    }
                }


                this.s = tempObj;
            }

            this.type = getType(this.s);

            return this;
        } else this.isValid = false;
        return this;
    }
}

class _Array extends Main {
    each(statement) {
        if (!this.isValid) return this;

        for(var x of this.s) {
            if(!statement(x)) this.isValid = false;
        }
        return this;
    }

    has(str) {

        if (!this.isValid) return this;

        if(this.s.indexOf(str) > -1) return this;
        else this.isValid = false;

        return this;
    }
}

const init = function(data) {
    if(typeof(data) === "object") {
        if(data.constructor === Array) return new _Array(data);
        else return new _Object(data);
    } else return new _String(data);
};

module.exports = init;
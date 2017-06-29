class Main {
    constructor(data) {
        this.s = data;
        this.valid = true;
        if(typeof(data) === "object") {
            this.p = data;
            this.path = [];
        }
        this.type = typeof(data);
    }

    equals(str) {

        if (!this.valid) return this;

        if(this.s === str) return this;
        else this.valid = false;
        return this;
    }

    inequal(str) {

        if (!this.valid) return this;

        if(this.s !== str) return this;
        else this.valid = false;
        return this;
    }

    is(type) {

        if (!this.valid) return this;

        if(this.type === type) return this;
        else this.valid = false;
        return this;
    }

    isnt(type) {

        if (!this.valid) return this;

        if(this.type !== type) return this;
        else this.valid = false;
        return this;
    }

    length(a,b) {

        if (!this.valid) return this;

        let _len = this.s.length;

        if((a === -1 ? true : _len >= a) &&
            (b === -1 ? true : _len <= b)) {
            return this
        } else this.valid = false;
        return this;
    }

    newData(data) {
        if (!this.valid) return this;

        return new init(data);
    }

    valid() {
        return this.valid;
    }
    v() {
        return this.valid;
    }
}

class _String extends Main {
    has(str) {

        if (!this.valid) return this;

        if(this.s.indexOf(str) > -1) return this;
        else this.valid = false;
        return this;
    }
}

class _Object extends Main {

    hasChild(child) {
        if (!this.valid) return this;

        if(!this.s[data]) return false;

        return this;
    }

    child(data) {
        if (!this.valid) return this;

        if(this.s[data]) {
            this.s = this.s[data];
            this.path.push(data);
        } else this.valid = false;
        return this;
    }

    parent() {
        if (!this.valid) return this;

        if(this.path.length > 0) {
            this.path.splice(this.path.length,1);
            if(this.path.length === 1) this.s = this.p;
            else this.s = eval(`this.p.${this.path.join(".")}`);
            return this;
        } else this.valid = false;
        return this;
    }
}

class _Array extends Main {
    each(statement) {
        if (!this.valid) return this;

        for(var x of this.s) {
            if(!statement(x)) this.valid = false;
        }
        return this;
    }

    has(str) {

        if (!this.valid) return this;

        if(this.s.indexOf(str) > -1) return this;
        else this.valid = false;
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
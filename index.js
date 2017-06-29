class Main {
    constructor(data) {
        this.s = data;
        if(typeof(data) === "object") {
            this.p = data;
            this.path = [];
        }
        this.type = typeof(data);
    }

    equals(str) {

        if (!this) return false;

        if(this.s === str) return this;
        else return false;
    }

    inequal(str) {

        if (!this) return false;

        if(this.s !== str) return this;
        else return false;
    }

    is(type) {

        if (!this) return false;

        if(this.type === type) return this;
        else return false;
    }

    isnt(type) {

        if (!this) return false;

        if(this.type !== type) return this;
        else return false;
    }

    length(a,b) {

        if (!this) return false;

        let _len = this.s.length;

        if((a === -1 ? true : _len >= a) &&
            (b === -1 ? true : _len <= b)) {
            return this
        } else return false;
    }

    newData(data) {
        if (!this) return false;

        return new init(data);
    }
}

class _String extends Main {
    has(str) {

        if (!this) return false;

        if(this.s.indexOf(str) > -1) return this;
        else return false;
    }
}

class _Object extends Main {

    hasChild(child) {
        if(!this) return false;

        if(!this.s[data]) return false;

        return this;
    }

    child(data) {
        if (!this) return false;

        if(this.s[data]) {
            this.s = this.s[data];
            this.path.push(data);
        } else return false;
        return this;
    }

    parent() {
        if(!this) return false;

        if(this.path.length > 0) {
            this.path.splice(this.path.length,1);
            if(this.path.length === 1) this.s = this.p;
            else this.s = eval(`this.p.${this.path.join(".")}`);
            return this;
        } else return false;
    }
}

class _Array extends Main {
    each(statement) {
        for(var x of this.s) {
            if(!eval(statement)) return false;
        }
        return this;
    }

    has(str) {

        if (!this) return false;

        if(this.s.indexOf(str) > -1) return this;
        else return false;
    }
}

const init = function(data) {
    if(typeof(data) === "object") {
        if(Object.prototype.toString.call(data) === '[object Array]') return new _Array(data);
        else return new _Object(data);
    } else return new _String(data);
};

module.exports = init;
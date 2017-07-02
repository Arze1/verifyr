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

class Save {

	constructor() {
		this.save = {methods:[]};
		this.returnValue = false;
	}

	test(string) {

		if(!string && string !== false) return false;
		console.log(string)
		let tmp = init(string);

		for(var x of this.save.methods) {
			tmp[x[0]](x[1][0],x[1][1],x[1][2])
		}
		return (this.returnValue ? tmp.v() : tmp);
	}

	setReturn(val) {
		this.returnValue = val;
	}

	add(data) {
		this.save.methods.push(data)
	}
}

const typeRegex = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	phone: /^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/
};

class Main {
	constructor(data) {

		this.s = data; // current data in object

		this.tmpsave  = new Save();

		this.isValid = true;

		if(typeof(data) === "object") {
			this.p = data;
			this.path = [];
		}

		this.type = getType(data);
	}

	equals(str) {
		this.tmpsave.add(["equals", [str]]);
		if (!this.isValid) return this;

		if(this.s === str) return this;
		else this.isValid = false;

		return this;
	}

	inequal(str) {

		this.tmpsave.add(["inequal", [str]]);

		if (!this.isValid) return this;

		if(this.s !== str) return this;
		else this.isValid = false;

		return this;
	}

	is(type) {

		this.tmpsave.add(["is", [type]]);

		if (!this.isValid) return this;

		if(typeRegex[type]) {
			if (typeRegex[type].test(this.s)) return this;
			else {
				this.isValid = false;
				return this;
			}
		}

		if(this.type === type) return this;
		else this.isValid = false;

		return this;
	}

	isnt(type) {

		this.tmpsave.add(["isnt", [type]]);

		if (!this.isValid) return this;

		if(typeRegex[type]) {
			if (typeRegex[type].test(this.s)) {
				this.isValid = false;
				return this;
			} else return this;
		}

		if(this.type !== type) return this;
		else this.isValid = false;

		return this;
	}

	length(a,b) {

		this.tmpsave.add(["length", [a, b]]);

		if (!this.isValid) return this;

		let _len = this.s.length;

		if ((a === -1 ? true : _len >= a) &&
			(b === -1 ? true : _len <= b)) {
			return this
		} else this.isValid = false;

		return this;
	}

	save(returnV = false) {
		this.tmpsave.setReturn(returnV);
		return this.tmpsave;
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

		this.tmpsave.add(["has", [str]]);

		if (!this.isValid) return this;

		if(this.s.indexOf(str) > -1) return this;

		else this.isValid = false;

		return this;
	}
}

class _Object extends Main {

	hasChild(child) {

		this.tmpsave.add(["hasChild", [child]]);

		if (!this.isValid) return this;

		if(!this.s[child]) return false;

		return this;
	}

	child(data) {

		this.tmpsave.add(["child", [data]]);

		if (!this.isValid) return this;

		if(this.s[data] || this.s[data] === false) {

			this.s = this.s[data];

			this.path.push(data);

			this.type = getType(this.s);

		} else this.isValid = false;
		return this;
	}

	parent() {

		this.tmpsave.add(["parent", []]);

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

		this.save.add(["each", [statement]]);

		if (!this.isValid) return this;

		for(var x of this.s) {
			if(!statement(x)) this.isValid = false;
		}
		return this;
	}

	has(str) {

		this.save.add(["has", [str]]);

		if (!this.isValid) return this;

		if(this.s.indexOf(str) > -1) return this;
		else this.isValid = false;

		return this;
	}
}

const init = function(data) {
	switch(data) {
		case "object":
			return new _Object();
			break;
		case "string":
			return new _String();
			break;
		case "array":
			return new _Array();
			break;
	}
	if(!data && data !== false) return new Main();

	if(typeof(data) === "object") {
		if(data.constructor === Array) return new _Array(data);
		else return new _Object(data);
	} else return new _String(data);
};

module.exports = init;
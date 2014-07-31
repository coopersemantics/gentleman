# Gentleman

A sandbox only fit for a gentleman!

```
var Gentleman = require("gentleman");
```

### Gentleman(packages, callback)

Creates a new `Gentleman` with `packages` and `callback`. `callback(error)` is invoked with an `error` object. `["*"]` as the `packages` argument, will include all `packages`; otherwise, specified `packages` will be included.

Type: (`packages {array}`, `callback {function}`)

```js
Gentleman(["command", "decorator"], function (/*error*/) {
	// ...
});
```

### Gentleman.addPackage(packageName, callback)

Adds a new package (`packageName`) to the sandbox, presuming there is no package conflicts. `callback($$root)` will be invoked with a `$$root` object, upon invocation of `gentleman(...)`.

Type: (`packageName {string}`, `callback {function}`)

```js
Gentleman.addPackage("baz", function (/*$$root*/) {
	var that = this;

	that.baz = "baz";

	that.setBaz = function (value) {
		that.baz = value;

		console.log("foo " + that.baz);
	};
});
```

### Gentleman.getPackage(packageName)

Gets an existing package (`packageName`) from the sandbox, presuming it exists.

Type: (`packageName {string}`)

```js
Gentleman.getPackage("command");
```

### Gentleman.generatePackageNames()

Generates the collection of package names that are in existence.

```js
Gentleman.generatePackageNames();
```

### .utils.extend(destination, source)

Copies all properties from `source` to the `destination` object.

Type: (`destination {object}`, `source {object}`)

```js
Gentleman(["*"], function (/*error*/) {
	var that = this;

	that.utils.extend(that, {
		boo: "boo"
	});
});
```

### .utils.toArray(object)

Converts an array-like `object`, to an actual array.

Type: (`object {object}`)

```js
Gentleman(["*"], function (/*error*/) {
	var that = this;
	var args = that.utils.toArray(that, arguments);

	console.log(args);
});
```

## Packages

At the most fundamental level, packages are simply a collection of modules. `command`, `decorator`, `events`, `promise` are all examples of packages. See [this](https://github.com/coopersemantics/gentleman/tree/master/example/index.js) example to further demonstrate `packages`.

### .commandPackage

Utilizes the `Command Pattern`. `.commandPackage` being an object, owns `.defineManager` and `.execute` as methods.

```js
Gentleman(["command"], function (/*error*/) {
	var that = this;

	that.commandPackage.defineManager({
		getById: function (id) {
			console.log("`.getById` " + id);
		},

		sortById: function (id) {
			console.log("`.sortById` " + id);
		}
	}).execute("getById", "6747467");
});
```

#### .commandPackage.defineManager(object)

Extends `.commandPackage` with the provided `object`.

Type: (`object {object} `)

#### .commandPackage.execute(name[, arguments])

Binds together an action (`name` of property) and an object, wishing to invoke the action.

Type: (`name {string}`[,` arguments {*}`])

### .decoratorPackage

Utilizes the `Decorator Pattern`. `.decoratorPackage` being an object, owns `.wrap`.

```js
Gentleman(["decorator"], function (/*error*/) {
	var that = this;

	that.baz = {
		boo: function () {
			return "boo";
		}
	};

	that.decoratorPackage.wrap(that.baz, function (object)	 {
		var boo = object.boo();

		object.boo = function () {
			return boo + " baz";
		};

		console.log(object.boo());
	});
});
```

#### .decoratorPackage.wrap(object, callback[, arguments])

`object` is wrapped, so any changes to `object` will not mutate the original `object`. `callback(object)` is invoked with newly wrapped `object`.

Type: (`object {object}`, `callback {function}`[,` arguments {*}`])

### .eventsPackage

`.eventsPackage` is extended with `EventEmitter.prototype`. Please see [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter) for more documentation.

```js
Gentleman(["command"], function (/*error*/) {
	var that = this;

	that.eventsPackage.on("foo", function () {
		console.log("You truly are a Gentleman!");
	});

	setTimeout(function () {
		that.eventsPackage.emit("foo");
	}, 1000);
});
```

### .promisePackage

`.promisePackage` is extended with `q`. Please see [q](https://github.com/kriskowal/q) for more documentation.

```js
Gentleman(["promise"], function (/*error*/) {
	var that = this;
	var foo = function () {
		var deferred = that.promisePackage.defer();

		setTimeout(function () {
			deferred.resolve("sweet");
		}, 1000);

		return deferred.promise;
	};

	foo()
		.then(function (value) {
			return value + " peas";
		})
		.done(function (value) {
			console.log(value);
		});
});
```

## Authoring a Package

```js
gentleman.addPackage("baz", function (/*$$root*/) {
	var that = this;

	that.baz = "baz";

	that.setBaz = function (value) {
		that.baz = value;

		console.log("foo " + that.baz);
	};
});

gentleman(["baz"], function (/*error*/) {
	var that = this;

	that.bazPackage.setBaz("boo");
});
```

## Gulp Tasks

```bash
# JSHint
$ gulp lint

# Unit Tests
$ gulp test

# Watch (Default)
$ gulp watch
```

## Versioning

Releases will be numbered using the following format:

```
<major>.<minor>.<patch>
```

And constructed with the following guidelines:

- Breaking backward compatibility **bumps the major** while resetting minor and patch
- New additions without breaking backward compatibility **bumps the minor** while resetting the patch
- Bug fixes and misc. changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.

## License

[MIT License](https://github.com/coopersemantics/gentleman/blob/master/MIT-LICENSE.txt)

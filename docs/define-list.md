@module {function} can-define-list
@parent can-observables
@collection can-core
@group can-define-list.prototype prototype
@group can-define-list/events events
@alias can.DefineList
@inherits can.Construct
@templateRender true


@description Create observable lists.

@signature `new DefineList([items])`

Creates an instance of a DefineList or an extended DefineList with enumerated properties from `items`.

```js
import DefineList from "can-define-list";

const people = new DefineList( [
	{ first: "Justin", last: "Meyer" },
	{ first: "Paula", last: "Strozak" }
] );
```

  @param {Array} [items] An array of items to seed the list with.
  @return {can-define-list} An instance of `DefineList` with the values from _items_.

@body

## Mixed-in instance methods and properties

Instances of `DefineList` have all methods and properties from
[can-event-queue/map/map]:

{{#each (getChildren [can-event-queue/map/map])}}
- [{{name}}] - {{description}}{{/each}}

Example:

```js
const MyList = DefineList.extend( { "#": "string" } );

const listInstance = new MyList( [ "a", "b" ] );

listInstance.on( "length", function( event, newLength, oldLength ) { /* ... */ } );
```


## Mixed-in type methods and properties

Extended `DefineList` constructor functions have all methods and properties from
[can-event-queue/type/type]:

{{#each (getChildren [can-event-queue/type/type])}}
- [{{name}}] - {{description}}{{/each}}

Example:

```js
const MyList = DefineList.extend( { "#": "string" } );

canReflect.onInstancePatches( MyList, function( instance, patches ) {

} );
```

## Use

The `can-define-list` module exports a `DefineList` constructor function.  It can be used
with `new` to create observable lists that behave very similar to `Array`s.  For example:

```js
const list = new DefineList( [ "a", "b", "c" ] );
list[ 0 ]; //-> "a";

list.push( "x" );
list.pop(); //-> "x"
```

It can also be extended to define custom observable list types with
[can-define-list.extend].  For example, the following defines a `StringList` type
where every item is converted to a string by specifying the [can-define-list.prototype.wildcardItems items definition] `(#)`:

```js
const StringList = DefineList.extend( {
	"#": "string"
} );

const strings = new StringList( [ 1, new Date( 1475370478173 ), false ] );

strings[ 0 ]; //-> "1"
strings[ 1 ]; //-> "Sat Oct 01 2016 20:07:58 GMT-0500 (CDT)"
strings[ 2 ]; //-> "false"
```

Non-numeric properties can also be defined on custom DefineList type.  The following
defines a `completed` property that returns the completed todos:

```js
const TodoList = DefineList.extend( {
	"#": Todo,
	get completed() {
		return this.filter( { complete: true } );
	}
} );

const todos = new TodoList( [ { complete: true }, { complete: false } ] );
todos.completed.length; //-> 1
```

Finally, DefineList instances are observable, so you can use the [can-event]
methods to listen to its [can-define-list/AddEvent],
[can-define-list/LengthEvent], [can-define-list/RemoveEvent],
and [can-define-list/PropertyNameEvent] events:

```js
const people = new DefineList( [ "alice", "bob", "eve" ] );

people.on( "add", function( ev, items, index ) {
	console.log( "add", items, index );
} ).on( "remove", function( ev, items, index ) {
	console.log( "remove", items, index );
} ).on( "length", function( ev, newVal, oldVal ) {
	console.log( "length", newVal, oldVal );
} );

people.pop(); // remove ["eve"] 2
// length 2 3

people.unshift( "Xerxes" ); // add ["Xerxes"] 1
// length 3 2
```

__NOTE:__ Only changes made to indexed values using the list's `set` method will dispatch change events.
👍  `defineList.set(0, 'newValue'); // will dispatch event`
👎  `defineList[0] = 'newValue'; // will NOT dispatch event`

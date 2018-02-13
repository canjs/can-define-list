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

undefined

  @param {Array} [items] An array of items to seed the list with.
  @return {can-define-list} An instance of `DefineList` with the values from _items_.

@body

## Mixed-in instance methods and properties

Instances of `DefineList` have all methods and properties from
[can-event-queue/map/map]:

{{#each (getChildren [can-event-queue/map/map])}}
- [{{name}}] - {{description}}{{/each}}

Example:

undefined


## Mixed-in type methods and properties

Extended `DefineList` constructor functions have all methods and properties from
[can-event-queue/type/type]:

{{#each (getChildren [can-event-queue/type/type])}}
- [{{name}}] - {{description}}{{/each}}

Example:

undefined

## Use

The `can-define-list` module exports a `DefineList` constructor function.  It can be used
with `new` to create observable lists that behave very similar to `Array`s.  For example:

undefined

It can also be extended to define custom observable list types with
[can-define-list.extend].  For example, the following defines a `StringList` type
where every item is converted to a string by specifying the [can-define-list.prototype.wildcardItems items definition] `(#)`:

undefined

Non-numeric properties can also be defined on custom DefineList type.  The following
defines a `completed` property that returns the completed todos:

undefined

Finally, DefineList instances are observable, so you can use the [can-event]
methods to listen to its [can-define-list/AddEvent],
[can-define-list/LengthEvent], [can-define-list/RemoveEvent],
and [can-define-list/PropertyNameEvent] events:

undefined

__NOTE:__ Only changes made to indexed values using the list's `set` method will dispatch change events.
👍  `defineList.set(0, 'newValue'); // will dispatch event`
👎  `defineList[0] = 'newValue'; // will NOT dispatch event`

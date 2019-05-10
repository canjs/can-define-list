var QUnit = require("steal-qunit");
var DefineList = require("can-define-list");
var canSymbol = require("can-symbol");

QUnit.module("can-define-list");

QUnit.test("basics", function(assert) {
	var list = new DefineList([ "a", "b", "c" ]);

	list.on("add", function(ev, newVals, index) {
        list.off("add");
		assert.deepEqual(newVals, [ "d" ]);
        assert.equal(index, 3);
    });

    list.push("d");

    list.splice(0, 1, { a: "a" });
    assert.equal(list[0][canSymbol.for("can.isMapLike")], true, "Objects are converted to DefineMaps");
});

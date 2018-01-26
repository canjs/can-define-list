var QUnit = require("steal-qunit");
var DefineList = require("can-define-list");
var canSymbol = require("can-symbol");

QUnit.module("can-define-list");

QUnit.test("basics", function() {
	var list = new DefineList([ "a", "b", "c" ]);

	list.on("add", function(ev, newVals, index) {
        list.off("add");
		QUnit.deepEqual(newVals, [ "d" ]);
        QUnit.equal(index, 3);
    });

    list.push("d");

    list.splice(0, 1, { a: "a" });
    QUnit.equal(list[0][canSymbol.for("can.isMapLike")], true, "Objects are converted to DefineMaps");
});

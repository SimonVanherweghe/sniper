let test = require("tape");
let sandbox = require("@architect/sandbox");

test("demo", (t) => {
  t.plan(1);
  t.ok(sandbox, "sandbox loaded");
});

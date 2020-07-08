import assert from "assert";

import mathGenerator from "./math-generator";

function assertQuestions(questions) {
  questions.forEach((question) => {
    assert.strictEqual(eval(question[0]), question[1], `${question[0]} has wrong result`);
  });
}

test("math question correctness: difficulty0", () => {
  assertQuestions(mathGenerator(0));
});

test("math question correctness: difficulty1", () => {
  assertQuestions(mathGenerator(1));
});

test("math question correctness: difficulty2", () => {
  assertQuestions(mathGenerator(2));
});

test("math question correctness: difficulty3", () => {
  assertQuestions(mathGenerator(3));
});

test("math question correctness: difficulty4", () => {
  assertQuestions(mathGenerator(4));
});

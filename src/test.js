import { MAX_MASS_KG, MAX_VOLUME_CM, REJECTED, SPECIAL, STANDARD } from "./common.js";
import { sort } from "./main.js";
import { test } from 'node:test';

test("sort", async t => {
    await t.test("returns STANDARD for not bulky and not heavy package", t => {
        const testCases = [
            [0, 0, 0, 0],
            [0.0001, 0.000004, 45, 0.00000042],
            [42, 42, 42, 12],
            [
                Math.cbrt(MAX_VOLUME_CM) - 1,
                Math.cbrt(MAX_VOLUME_CM) - 1,
                Math.cbrt(MAX_VOLUME_CM) - 1,
                MAX_MASS_KG - 1
            ]
        ];

        for (const testCase of testCases) {
            const stack = sort(...testCase);
            t.assert.strictEqual(STANDARD, stack, testCase);
        }
    });

    await t.test("returns SPECIAL for bulky package", t => {
        const testCases = [
            [
                Math.cbrt(MAX_VOLUME_CM),
                Math.cbrt(MAX_VOLUME_CM),
                Math.cbrt(MAX_VOLUME_CM),
                0
            ],
            [
                Math.cbrt(MAX_VOLUME_CM) + 0.0001,
                Math.cbrt(MAX_VOLUME_CM) + 0.000004,
                Math.cbrt(MAX_VOLUME_CM)+ 45,
                MAX_MASS_KG - 0.000001
            ],
            [
                Number.MAX_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER,
                12
            ],
            [
                Math.cbrt(MAX_VOLUME_CM),
                Math.cbrt(MAX_VOLUME_CM),
                Math.cbrt(MAX_VOLUME_CM),
                MAX_MASS_KG - 1
            ]
        ];

        for (const testCase of testCases) {
            const stack = sort(...testCase);
            t.assert.strictEqual(SPECIAL, stack, testCase);
        }
    });

    await t.test("returns SPECIAL for heavy package", t => {
        const testCases = [
            [0, 0, 0, MAX_MASS_KG * 2],
            [0.0001, 0.000004, 45, MAX_MASS_KG + 0.000001],
            [42, 42, 42, Number.MAX_SAFE_INTEGER],
            [
                Math.cbrt(MAX_VOLUME_CM) - 1,
                Math.cbrt(MAX_VOLUME_CM) - 1,
                Math.cbrt(MAX_VOLUME_CM) - 1,
                MAX_MASS_KG
            ]
        ];
        
        for (const testCase of testCases) {
            const stack = sort(...testCase);
            t.assert.strictEqual(SPECIAL, stack, testCase);
        }
    });

    await t.test("returns REJECTED for bulky and heavy package", () => {
        const testCases = [
            [
                Math.cbrt(MAX_VOLUME_CM),
                Math.cbrt(MAX_VOLUME_CM),
                Math.cbrt(MAX_VOLUME_CM),
                MAX_MASS_KG * 2
            ],
            [
                Math.cbrt(MAX_VOLUME_CM) + 0.0001,
                Math.cbrt(MAX_VOLUME_CM) + 0.000004,
                Math.cbrt(MAX_VOLUME_CM)+ 45,
                MAX_MASS_KG + 0.000001
            ],
            [
                Number.MAX_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER
            ],
            [
                Math.cbrt(MAX_VOLUME_CM),
                Math.cbrt(MAX_VOLUME_CM),
                Math.cbrt(MAX_VOLUME_CM),
                MAX_MASS_KG
            ]
        ];
    
        for (const testCase of testCases) {
            const stack = sort(...testCase);
            t.assert.strictEqual(REJECTED, stack, testCase);
        }
    });

    await t.test("fails with error for not provided width", t => {
        t.assert.throws(() => sort());
    });

    await t.test("fails with error for not provided height", t => {
        t.assert.throws(() => sort(0));
    });

    await t.test("fails with error for not provided length", t => {
        t.assert.throws(() => sort(0, 0));
    });

    await t.test("fails with error for not provided mass", t => {
        t.assert.throws(() => sort(0, 0, 0));
    });

    await t.test("fails with error for negative width", t => {
        t.assert.throws(() => sort(-1, 0, 0, 0));
    });

    await t.test("fails with error for negative height", t => {
        t.assert.throws(() => sort(0, -1, 0, 0));
    });

    await t.test("fails with error for negative length", t => {
        t.assert.throws(() => sort(0, 0, -1, 0));
    });

    await t.test("fails with error for negative mass", t => {
        t.assert.throws(() => sort(0, 0, 0, -1));
    });

    // there can be validation for zero values which means "No package",
    // but in this case requirement needs clarification due to different "proper" solutions.
});
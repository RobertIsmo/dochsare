import Maybe from "../../lib/maybe.js";

const title1 = 'Maybe can resolve to a value'
test(title1, async () => {
	const maybe = Maybe(5);
	await expect(maybe.is()).resolves.toBe(5)
})

const title2 = 'Maybe can return proper value for isNothing'
test(title2, async () => {
	const maybe = Maybe(undefined);
	await expect(maybe.isNothing()).resolves.toBe(true)
})

const title3 = 'Maybe can enforce a value'
test(title3, async () => {
	const maybe1 = Maybe(5);
	const maybe2 = Maybe(undefined);
	await expect(maybe1.enforce()).resolves.toBe(5)
	await expect(maybe2.enforce()).rejects.toThrow("Value is undefined!");
})

const title4 = 'Maybe can map properly'
test(title4, async () => {
	let maybe = Maybe(3);
	maybe = await maybe.map(x => x + 1);
	await expect(maybe.enforce()).resolves.toBe(4)
})

const title5 = 'Maybe can skip undefined on map properly'
test(title5, async () => {
	let maybe = Maybe(3);
	maybe = await maybe.map(x => undefined);
	maybe = await maybe.map(x => 3);
	await expect(maybe.enforce()).rejects.toThrow("Value is undefined!");
})

const title6 = 'Maybe can properly store history and issues'
test(title6, async () => {
	let maybe = Maybe({ number: 3 });
	maybe = await maybe.map(x => ({ ...x, add: 4 }), "adding value to be summed");
	maybe = await maybe.map(x => {
		const {number, add} = x
		return { ...x, sum: number+add }
	}, "adding sum of number and add value");
	maybe = await maybe.map(x => x.unknown, "accessing undefined value");
	maybe = await maybe.map(x => x + 1, "adding to undefined value");
	maybe = await maybe.map(({ number, value }) => ({ number: value, value: number }), "swamping nonexistent values around");

	await expect(maybe.enforce()).rejects.toThrow("Value is undefined!");
	await expect(maybe.is()).resolves.toBe(undefined);
	expect(maybe.issue()).toStrictEqual({ at: 3, reason: "accessing undefined value" });
})

const title7 = 'Maybe can return undefined on no issues'
test(title7, async () => {
	let maybe = Maybe(3);
	maybe = await maybe.map(x => x + 1);
	expect(maybe.issue()).toBe(undefined)
})
const title8 = 'Maybe has proper history'
test(title8, async () => {
	let maybe = Maybe(3);
	maybe = await maybe.map(x => x + 1, "add 1");
	expect(maybe.history()).toStrictEqual(["initialization", "add 1"])
})
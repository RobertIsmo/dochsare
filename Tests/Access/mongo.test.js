import * as mongo from "../../src/Access/mongo.js";
import config from "../../src/config/config.cjs";

const { db, client } = await mongo.connect();

afterAll(async () => {
	await client.close();
})

const title1 = 'Can Connect to MongoDB'
test(title1, () => {
	const name = db.namespace;
	expect(name).toBe(config.APP_NAME);
})

const title2 = 'Can write to MongoDB'
test(title2, async () => {
	const maybeItem = await mongo.save(db, {name: "Winnie", age: 22, job: "Musician"}, "TEST");
	const { name, age, job } = await maybeItem.is();
	expect({ name, age, job }).toStrictEqual({name: "Winnie", age: 22, job: "Musician"});
})

const title3 = 'Can Read from MongoDB'
test(title3, async () => {
	const maybeItem = await mongo.readAll(db, "TEST");
	const [{ age, job, name }, ...rest] = await maybeItem.is();
	expect({ age, job, name }).toStrictEqual({name: "Winnie", age: 22, job: "Musician"});
})
const title4 = 'Can Delete all test data from MongoDB'
test(title4, async () => {
	const maybeItem = await mongo.deleteAll(db, "TEST");
	const { acknowledged } = await maybeItem.is();
	expect(acknowledged).toBe(true);
})
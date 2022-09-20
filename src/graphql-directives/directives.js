export default async (schema) => {
	let schemaWithDirectives = await schema.map(x=>x, "add empty directive");
	return schemaWithDirectives;
}
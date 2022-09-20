const Maybe = (value, history=["initialization"], issue={at: 0, reason: "initialization"}) => {
	return {
		history: () => history,
		issue: () => {
			if(value !== undefined) return undefined;
			else return issue;
		},
		map: async (f, name="") => {
			const newvalue = await value;
			let newissue = {...issue}
			if(value === undefined) {
				if(newissue.at === 0) {
					newissue.at = history.length - 1
					newissue.reason = history[history.length - 1]
				}
				return Maybe(undefined, [...history, name], newissue);
			} else {
				return Maybe(f(newvalue), [...history, name], newissue);
			}
		},
		isNothing: async () => {
			const newvalue = await value;
			return newvalue === undefined
		},
		is: async () => {
			return await value;
		},
		enforce: async () => {
			const newvalue = await value;
			if(value === undefined) {
				throw Error("Value is undefined!");
			} else {
				return newvalue;
			}
		}
	}
}

export default Maybe;
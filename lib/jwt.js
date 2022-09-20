import environment from 'dotenv';
environment.config();
import jwt from "jsonwebtoken";
import crypto from "node:crypto"

const { JWT_TOKEN_SECRET, JWT_REFRESH_SECRET } = process.env

export default {
	sign: (subject) => {
		const refreshID = crypto.randomUUID();
		return {
			access: jwt.sign({
				subject,
				date: Date.now(),
				refreshID
			}, JWT_TOKEN_SECRET, { expiresIn: '1h' }),
			refresh: jwt.sign({
				subject,
				date: Date.now(),
				refreshID
			}, JWT_REFRESH_SECRET, { expiresIn: '14d' }),
			subject
		}
	},
	verify: (token, refresh, user) => {
		try {
			const { subject } = jwt.verify(token, JWT_TOKEN_SECRET);
			if(subject !== user) return false;
			return token
		} catch(e) {
			if(e.name === 'TokenExpiredError') {
				try {
					const { subject, refreshID } = jwt.verify(refresh, JWT_REFRESH_SECRET)
					const payload = jwt.decode(token, JWT_TOKEN_SECRET);
					if(subject === payload.subject && refreshID === payload.refreshID && subject === user) {
						return jwt.sign({
							subject,
							date: Date.now(),
							refreshID
						}, JWT_TOKEN_SECRET, { expiresIn: '1h' })
					}
				} catch {
					return false
				}
				
			}
		}
	}
}
require('dotenv').config()
const response = require('../utils/response')
const createRow = require('../createRow/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		if (state === 'ok') {
			state = await createRow(JSON.parse(body))
		}
	} catch (error) {
		console.log(error.message)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"pickup_code": "RL10106","date":"Tue Mar 05 2019 00:00:00 GMT-0800 (Pacific Standard Time)","reseller": "FABIANA DE CASSIA SILVA","supplier": "Abaut","address": "Bom Retiro - Correia de Melo, 84","bags": "4","invoice": "Sim","comments": "Preencher boleto"}' -X POST https://pickup-backend.ziro.online/.netlify/functions/create-row
// curl -d '{"pickup_code": "RL10106","date":"Tue Mar 05 2019 00:00:00 GMT-0800 (Pacific Standard Time)","reseller": "FABIANA DE CASSIA SILVA","supplier": "Abaut","address": "Bom Retiro - Correia de Melo, 84","bags": "4","invoice": "Sim","comments": "Preencher boleto"}' -X POST http://localhost:9000/create-row
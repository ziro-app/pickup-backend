require('dotenv').config()
const response = require('../utils/response')
// const createRow = require('../createRow/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		// if (state === 'ok') {
		// 	state = await createRow(JSON.parse(body))
		// }
	} catch (error) {
		console.log(error.message)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"start_date": "2019-02-14T20:00:00.000Z","representative":"Alan","reseller":"ADRIANA ALVES SILVA","category":"Venda","type":"Offline","end_date":"2019-03-01T20:00:00.000Z","time": "15:00","shipping": "DIRETO DO FORNECEDOR","address": "PC MONS JOSE MARIA MONTEIRO, 28, SAO PAULO, SP","packaging": "Livre","invoice": "Sem Nota","comments": "Urgente"}' -X POST https://sales-backend.ziro.online/.netlify/functions/create-row
// curl -d '{"start_date": "2019-02-14T20:00:00.000Z","representative":"Alan","reseller":"ADRIANA ALVES SILVA","category":"Venda","type":"Offline","end_date":"2019-03-01T20:00:00.000Z"}' -X POST http://localhost:9000/create-row
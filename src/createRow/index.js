const { formatDate, now } = require('../utils/formatDate')
const addRowToSheet = require('./addRowToSheet')

const createRow = async ({ pickup_code, date, reseller, supplier, address, bags, invoice, comments }) => {
	const cadastro = now()
	const atendimento = pickup_code.substring(2,7)
	const codigo = pickup_code
	const data = formatDate(date)
	const lojista = reseller
	const endereco = address
	const conferencia = `retirar ${bags} sacola(s)${invoice === 'Sim' ? ', nota fiscal' : ''}`
	const observacao = comments
	const sheetStatus = await addRowToSheet({
		cadastro, atendimento, codigo, data, lojista, endereco, conferencia, observacao
	})
	if ('ok')
		return 'ok'
	return 'dataError'
}

module.exports = createRow
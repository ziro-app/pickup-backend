const { formatDate, now } = require('../utils/formatDate')
const addRowToSheet = require('./addRowToSheet')

const createRow = ({ pickup_code, date, reseller, supplier, address, bags, invoice, comments }) => {
	const cadastro = now()
	const atendimento = pickup_code.substring(2,7)
	const codigo = pickup_code
	const data = formatDate(date)
	const lojista = reseller
	const fornecedor = supplier
	const endereco = address
	const conferencia = `${bags} sacola(s)${invoice === 'Sim' ? ', nota fiscal' : ''}`
	const observacao = comments
	return addRowToSheet({
		cadastro, atendimento, codigo, data, lojista, fornecedor, endereco, conferencia, observacao
	})
}

module.exports = createRow
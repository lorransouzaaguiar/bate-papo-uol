console.log('ola mundo')
const URLBASE = 'https://mock-api.driven.com.br/api/v6/uol'

const repo = () => {
    const getMessages = async () => {
        const response = await axios.get(`${URLBASE}/messages`)
        return response.data
    }

    const createUser = async (name) => {
        const response = await axios.post(`${URLBASE}/participants`, {
            name
        })
        return response.data
    }

    return { getMessages, createUser }
}


const getColorByTypeValue = (type) => ({
    'status': 'var(--g1)',
    'message': 'var(--w1)',
    'private_message': 'var(--r1)',
})[type] || 'var(--w1)'



const renderMessages = async () => {
    const messageList = document.createElement('ul')
    const msgs = await repo().getMessages()

    msgs.forEach((msg) => {
        const msgEl = document.createElement('li')
        msgEl.classList.add('message')

        msgEl.innerHTML = `
            <span class="time">(${msg.time})</span>
            <p><strong>${msg.from}</strong> para <strong>${msg.to}</strong> ${msg.text}</p>
        `
        msgEl.style.backgroundColor = getColorByTypeValue(msg.type)

        messageList.appendChild(msgEl)

    })
    return messageList
}

(async function App() {
    const main = document.getElementById('main')

    const inputName = prompt('Insira seu lindo nome!')

    await repo().createUser(inputName)


    renderMessages().then(listEl => {
        main.appendChild(listEl)

        console.log(document.querySelector('ul'))
    }).catch(console.log)

})()


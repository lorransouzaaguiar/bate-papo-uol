const URLBASE = 'https://mock-api.driven.com.br/api/v6/uol'

const repo = () => {
    const getMessages = async () => {
        return axios.get(`${URLBASE}/messages`)
    }

    const createUser = async (name) => {
        return axios.post(`${URLBASE}/participants`, {
            name
        })
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
    const reponse = await repo().getMessages()
    const msgs = reponse.data

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

const showLastMessage = () => {
    const lastItem = document.querySelector('li:last-child')
    lastItem.scrollIntoView()
}

(async function App() {
    const main = document.getElementById('main')

    let isLogIn = false

    const login = (() => {
        const inputName = prompt('Insira seu lindo nome!')
        repo()
            .createUser(inputName)
            .then(res => {
                isLogIn = true
            })
            .catch(err => {
                isLogIn = false
            })
            .finally(() => {
                if (isLogIn) {
                    renderMessages()
                        .then(listEl => {
                            main.appendChild(listEl)
                            showLastMessage()
                        })
                        .catch(console.log)
                } else login()
            })
    })()



})()


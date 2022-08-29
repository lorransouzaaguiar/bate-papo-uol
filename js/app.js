console.log('ola mundo')

const getMessages = async () => {
    const response = await fetch('https://mock-api.driven.com.br/api/v6/uol/messages')
    const data = await response.json()
    return data
}


/* const createUser = async (name) => {
    const response = await fetch('https://mock-api.driven.com.br/api/v6/uol/participants', {
        method: 'post',
        body: {
            'name': name
        }
    })
    const data = await response.json()
    console.log(data)
    return data
} */

/* createUser('Lorran').then(console.log) */

const renderMessages = async () => {
    const messageList = document.createElement('ul')
    const msgs = await getMessages()
    console.log(msgs)

    msgs.forEach((msg, index) => {
        const msgEl = document.createElement('li')
        msgEl.classList.add('message')

        msgEl.innerHTML = `
            <span class="time">(${msg.time})</span>
            <p><strong>${msg.from}</strong> para <strong>${msg.to}</strong> ${msg.text}</p>
        `

        if (msg.type === 'status') {
            msgEl.style.backgroundColor = 'var(--g1)'
        }

        if (msg.type === 'message') {
            msgEl.style.backgroundColor = 'var(--w1)'

        }

        if (msg.type === 'private_message') {
            msgEl.style.backgroundColor = 'var(--r1)'

        }



        messageList.appendChild(msgEl)

    })
    console.log(messageList.childNodes.length)
    return messageList
}

const main = document.getElementById('main')

renderMessages().then(listEl => {
    main.appendChild(listEl)

    console.log(document.querySelector('ul'))
}).catch(console.log)

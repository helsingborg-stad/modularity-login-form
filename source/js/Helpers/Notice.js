/**
 * Creates Login Notice
 * @return void
 */
const createNotice = message => {
    if (!document.getElementById(message.container.child)) {
        const createMessageContainer = document.createElement('div');

        createMessageContainer.setAttribute('id', message.container.child);
        document.getElementById(message.container.parent).prepend(createMessageContainer);
    }

    const messageContainer = document.getElementById(message.container.child);
    messageContainer.innerHTML = '';
    messageContainer.removeAttribute('class');
    messageContainer.classList.add(...message.style.box);

    const createMessageContainerIcon = document.createElement('i');
    createMessageContainerIcon.setAttribute('class', 'pricon');
    messageContainer.appendChild(createMessageContainerIcon);
    messageContainer.firstChild.classList.add(message.style.icon);
    messageContainer.insertAdjacentHTML('beforeend', message.text);
};

/**
 *
 * @type {{showNotice: createNotice}}
 */
module.exports = {
    showNotice: createNotice,
};

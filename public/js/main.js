const socket = io()
let user;
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa un nombre",
    inputValidator: (value) => {
        return !value && 'Se necesita un nombre!'
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value;
    return user;
}).then(user => socket.emit('newUserLoged', { user }))


chatBox.addEventListener('keyup', evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message", { user: user, message: chatBox.value});
            chatBox.value="";
        }
    }
})

socket.on('messages', data => {
    let log = document.getElementById('messageLogs')
    let messages = "";
    data.forEach(msg => {
        messages = messages + `${msg.user} dice: ${msg.message}</br>`      
    });
    log.innerHTML = messages
})

socket.on('newUser', user => {
    Swal.fire({
        text: `${user.user} se conectó`,
        toast: true,
        position: "top-right"
    })
})
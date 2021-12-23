console.log('This is the client side javascript')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {          //fetch function is used to fetch data from a url. The puzzle url generates random sentences everytime after reloading
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')              //this function targets the keyword form and manipulates it
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                                //this method prevents the webpage from reloading
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //Rendering weather info to the client side console
    fetch('http://localhost:3000/weather?address='+location).then((response) => {         
    response.json().then((data) => {
        if(data.error) {
            //console.log(data.error)
            messageOne.textContent = data.error
        }
        else {
            // console.log(data.place)
            // console.log(data.forecast)
            messageOne.textContent = data.place
            messageTwo.textContent = data.forecast
        }
    })
})

    console.log(location)
})
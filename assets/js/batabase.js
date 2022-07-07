const name = document.querySelector('#name');
const email = document.querySelector('#email');
const project = document.querySelector('#project');
const message = document.querySelector('#message');
const submitHandler = document.querySelector('#subBtn');
const currnetTime = new Date();
let data;

fireBaseHitHandler = async() => {
    const response = await fetch("https://portfolio-6e332-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio_main.json",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
};

submitHandler.addEventListener('click', (e) => {
    e.preventDefault();
    data = {
        name: name.value,
        email: email.value,
        project: project.value,
        message: message.value,
        timeStamp: currnetTime,
    };
    fireBaseHitHandler();

    name.value = "";
    email.value = "";
    project.value = "";
    message.value = "";
});

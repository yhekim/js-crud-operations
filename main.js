const table = document.getElementById("userTable");
const nameInput = document.getElementById("first_name");
const lastaNameInput = document.getElementById("last_name");
const emailInput = document.getElementById("email");
const createUserSubmit = document.getElementById("createUserSubmit");
const refreshSubmit = document.getElementById("refresh");


//console.log(refreshSubmit, email, createUserSubmit)
// async function getUserList() {
//     const response = await fetch("https://reqres.in/api/users");
//     const data = await response.json();
//     console.log(response)


// }
window.onload = () => {


}
refreshSubmit.addEventListener("click", getUserList);
createUserSubmit.addEventListener("click", createUser);
async function getUserList() {
    table.innerHTML = "";
    const response = await axios({
        url: `https://reqres.in/api/users`,
        method: "get"
    })
    const data = response.data.data;
    //console.log(data)
    data.forEach(user => {
        table.innerHTML += `
        <tr>
                            <td>
                            <input type="text" class="form-control" id="first_name_${user.id}" value="${user.first_name}">
                            </td>
                            <td>
                            <input type="text" class="form-control" id="last_name_${user.id}" value="${user.last_name}">
                            </td>
                            <td>
                            <input type="text" class="form-control" id="email_${user.id}" value="${user.email}">
                            </td>
                            <td>
                                <a href="#"  class="btn btn-warning" id="updatePerson" onclick="updateInput(${user.id})"  value="${user.id}">Update</a>
                                <a href="#"  class="btn btn-danger" id="deletePerson" onclick="deleteInput(${user.id})"  value="${user.id}">Delete</a>
                            </td>
                        </tr>`;


    });



}

async function createUser() {

    var bodyData = {
        first_name: nameInput.value || "Deger Yok",
        last_name: lastaNameInput.value || "Deger Yok",
        email: emailInput.value || "Deger Yok"

    }
    try {
        const response = await axios({
            url: 'https://reqres.in/api/users',
            data: bodyData,
            method: 'post'
        });
        //console.log("yeni", response.data)
        const user = response.data;
        //aşağıyı gönderme işlemini gerçekte yapamadığımız için kullanıyoruz
        table.innerHTML +=
            `
        <tr>
                            <td>
                            <input type="text" class="form-control" id="first_name_${user.id}" value="${user.first_name}">
                            </td>
                            <td>
                            <input type="text" class="form-control" id="last_name_${user.id}" value="${user.last_name}">
                            </td>
                            <td>
                            <input type="text" class="form-control" id="email_${user.id}"  value="${user.email}">
                            </td>
                            <td>
                                <a href="#" class="btn btn-warning" onclick="updateInput(${user.id})"  value="${user.id}">Update</a>
                                <a href="#"  class="btn btn-danger" onclick="deleteInput(${user.id})" value="${user.id}">Delete</a>
                            </td>
                        </tr>`;



    } catch (error) {
        alert("Hata", error)

    }

    createInput();

}

const createInput = () => {
    nameInput.value = "";
    lastaNameInput.value = "";
    emailInput.value = "";
}



function updateInput(id) {

    let againUser = {

        edit_name: document.getElementById("first_name_" + id).value || "Gecersiz Deger",
        edit_name: document.getElementById("last_name_" + id).value || "Gecersiz Deger",
        edit_email: document.getElementById("email_" + id).value || "Gecersiz Deger"

    }
    userUpdated(againUser)


}
const userUpdated = async(againUser) => {
    try {
        const response = await axios({
            url: 'https://reqres.in/api/users' + againUser,
            data: againUser,
            method: 'post'
        });
        const user = response.data;
        alert("Kullanıcı Güncellendi", response.data)
    } catch (error) {
        console.log("HataMesajı : ", error)

    }



}

const deleteInput = (id) => {
    userDelete(id);


}
async function userDelete(id) {
    try {
        const response = await axios({
            url: "https://reqres.in/api/users/" + id,

            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const user = response.data;
        alert("Kullanıcı Silindi", response.data)
    } catch (error) {
        console.log("HataMesajı : ", error)

    }

}
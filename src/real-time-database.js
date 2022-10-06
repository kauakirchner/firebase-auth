const getName = document.getElementById('name');
const getEmail = document.getElementById('email');
const getPassword = document.getElementById('password');
const getBtn = document.getElementById('btn-add"');
const list = document.getElementById('list');

getBtn.addEventListener('click', () => {
  createUser(getName.value, getEmai.value, getPassword.value)
})

const createUser = (name, email, password) => {
    const data = {
        name: name,
        email: email,
        password: password
    }
    return firebase.database().ref().child('users').push(data);
}

firebase.database().ref('users').on('value', function (snapshot) {
  usersList.innerHTML = '';
  snapshot.forEach(item => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(item.val().name + ': ' + item.val().age));
      usersList.appendChild(li);
  });
});

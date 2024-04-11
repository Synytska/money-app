let EmailModel = require('./email');

let msg = new EmailModel({
  email: 'ada.lovelace@gmail.com'
});

msg
.save()
.then((doc) => {
    console.log(doc);
})
.catch((err) => {
    console.log(err)
})
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/oktupos',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('db connected'))
.catch(err => console.log(err));
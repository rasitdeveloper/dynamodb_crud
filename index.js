const express = require('express')
const app = express()

const endPoint = require('./routes/api')
const errorHandler = require('./helpers/error-handler')

app.use(express.json());
app.use('/api',endPoint);
app.use(errorHandler)

app.listen(3000,()=>{ // 3000 portunda server ı çalıştırmaya başlıyoruz
    console.log('Server is running');
})
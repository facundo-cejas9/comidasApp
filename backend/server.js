import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'


const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//Db connection
connectDb();

//endpoints 
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/images', express.static('uploads'))
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
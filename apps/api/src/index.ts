import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import  allroute  from './routes'
dotenv.config();

const app = express()
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/api/v1',allroute)
app.use((err, req, res, next) => {
  let message: any = ''
  if (err.name == 'ValidationError') {
    message = Object.values(err.errors).map((value: any) => value?.message)
  }
  if (err.name == 'CastError') {
    message = `Resouces not found . invalid ${err.path}`
  }
  if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} entered`
  }

  res.json({
    data: null,
    success: false,
    msg: message ? message : err,
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})

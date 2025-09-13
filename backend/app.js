import express from 'express'

import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import appointmentRouter from './routes/appointmentRouter.js';

const app= express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRouter)
app.use('/api/doctor',doctorRoutes)
app.use('/api/admin',adminRouter)
app.use('/api/appointment',appointmentRouter)

export default app;
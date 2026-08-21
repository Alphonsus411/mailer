// Express does not provide TypeScript declarations in this project.
// @ts-expect-error Missing declaration file for the installed Express package.
import express from 'express'
import path from 'path'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

sgMail.setApiKey(process.env.SGKEY)

app.use(express.json())

app.use(express.static('app'))

app.get('/', (req, res) => {
    res.sendFile(`${path.resolve()}/index.html`)

// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser

const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
})

app.listen(3000, () => console.log('Aplicación en funcionamiento...'))


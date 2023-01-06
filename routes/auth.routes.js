const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')


const router = new Router()

// /api/auth/register
router.post(
    '/register',
    // middlewere []
    [
        check('email', 'Uncorrect email!').isEmail(),
        check('password', 'Minimum length of password is 6 chars')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            // validacia
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Unccorect values'
                })
            }
            
            const {email, password} = req.body
            // stugum ka et emailov user db-um
            const candidate = await User.findOne({ email })

            if(candidate) {
                return res.status(400).json({message: "Email already exists!"})
            }

            // passwordy hashavorumenq vor pahenq
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            // pahumenq db um uery
            await user.save()

            res.status(201).json({message: "User created!"})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again...'})
        }
    }
)


// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Type correct email').normalizeEmail().isEmail(),
        check('password', 'Type password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Unccorect values'
                })
            }

            const {email, password} = req.body
            // stugumenq ka emailov user db-um
            const user = await User.findOne({ email })

            if(!user) {
                return res.status(400).json({message: 'User not found'})
            }
            // stugumenq paroly hamnknuma hashavorvac paroli het db-um pahvac
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({message: "Uncorrect password, try again"})
            }
            // auth tokenenq ssarqum
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again...'})
        }
    }
)

module.exports = router
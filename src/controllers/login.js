const { User } = require('../db')

// mi funcion "validate" le llega por parametros un email y una passw

const validate = async (Email,Contraseña) => {

// busco en la db si hay un correo que coincida con el me llego y si coincide guardo
// la informacion del usuario en mi variable "user"

    const user = await User.findOne({where: {Email}})

// en la informacion almacenada en user verifico si la passowrd coincide con la que me llego
// en parametros y retorno true o false dependiendo si coincide o no.

    if(user.Contraseña === Contraseña){
        return true
    } else {
        return false
    }
}


const loginHandler = async (req, res) => {

    // traigo del front email/passw

    const { Email, Contraseña } = req.body

    try {

        // con mi funcion "validate" verifico si esta registrado o no
        // pasandole por parametros el email y la passw del front

        const login = await validate(Email, Contraseña)

        if (login) {
            res.status(200).json({ access: 'Se ha ingresado' })
        } else {
            res.status(200).json({ access: 'Clave incorrecta' })
        }
    } catch (error) {
        res.status(400).json({ access: 'No registrado' })
    }
}

const registerHandler = async (req, res) => {
    try {

// traigo del front name,email y Contraseña

        const { Email, Contraseña } = req.body

        // compruebo que los campos esten llenos
        
        if( !Email || !Contraseña){
            return res.status(400).json({access: 'Datos incompletos'})
         }

// verifico si no existe otro gmail en mi db

        const verificateEmail = await User.findOne({ where: { Email } })

        if (verificateEmail) {
            return res.status(400).json({ access: 'Este correo ya existe' })
        }

        
// creo el registro en db

        await User.create({ Email, Contraseña })

        return res.status(200).json({ access: Email + ' Registro Exitoso' })

    } catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginHandler,
    registerHandler
}
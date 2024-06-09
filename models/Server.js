// importamos nustras dependencias 
import express from 'express';
import { create } from 'express-handlebars';
import expressFileUpload from 'express-fileupload';
import { fileURLToPath } from 'url'
import { dirname } from "path";
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

// Importamos las rutas
import vistaHomeRoute from '../routes/vistaHome.routes.js';
import registroRoute from '../routes/registro.routes.js';
import loginRoutes from '../routes/login.routes.js'
import adminRoutes from '../routes/admin.routes.js'

// Creamos nuestro modelo o clase de servidor
class Server {

    // Vamos a crear nuestro constructor para que ejecute 
    // Middleware
    // Rutas o Routes
    constructor(){
        
        // Cramos la app  de express
        this.app = express();
        this.port = process.env.PUERTO || 8000;

        this.Paths = {
            rootHome:'/',
            rootRegistro:'/registro',
            rootAgregar:'/skaters',
            rootLogin:'/login',
            rootLoginUsuario:'/login',
            rootDatosUsuario:'/',
            rootActualizar:'/skaters',
            rootEliminar:'/skaters',
            rootAdmin:'/admin',
        }

        // Iniciamos nuestros metodos iniciales
        this.middlewares();
        this.routes()
    }


    middlewares(){

        this.app.use( express.json() );
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use( express.static('public') );
        this.app.use('/css', express.static(`${__dirname}/../public/css`));
        this.app.use('/js', express.static( `${__dirname}/../public/js`));
        this.app.use('/uploads', express.static( `${__dirname}/../public/uploads`));
        this.app.use('/jquery', express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));        
        this.app.use('/bootstrap', express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));
        this.app.use('/axios', express.static( `${__dirname}/../node_modules/axios/dist`));
        this.app.use('/jquery',express.static(  `${__dirname}/../node_modules/jquery/dist` ));

        // habilitar el middleware de fileUpload
        this.app.use( expressFileUpload({
            limits : 5000000,
            abortOnLimit : true,
            responseOnLimit : "El peso del archivo supera los 5 Megas"
        }) )
    }


    routes(){
        // Routing al Home, registro, login
        this.app.use( this.Paths.rootHome , vistaHomeRoute );
        this.app.use( this.Paths.rootRegistro , registroRoute );
        this.app.use( this.Paths.rootAgregar , registroRoute );
        this.app.use( this.Paths.rootLogin , loginRoutes );
        this.app.use( this.Paths.rootLoginUsuario , loginRoutes );
        this.app.use( this.Paths.rootDatosUsuario , loginRoutes );
        this.app.use( this.Paths.rootActualizar , registroRoute );
        this.app.use( this.Paths.rootEliminar , registroRoute );
        this.app.use( this.Paths.rootAdmin , adminRoutes );

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        } )
    }

    initHandelbars(){

        this.hbs = create({
            partialsDir:[
                "views"
            ]
        })

        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");
        
    }


}

export default Server;

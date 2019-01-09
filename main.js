
const mongoose = require('mongoose')

const keys = require('./config/keys'); 

const PORT = process.env.PORT || 5000; 

const app = require('./app'); 

// definiendo ruta 

const api = require('./routes/index');
const users = require('./routes/users'); 


mongoose.Promise = global.Promise;

mongoose
  .connect(
      // Si no se importara el archivo keys, aquí iría todo el mongoURI 
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
          console.log('MongoDB Connected for API Azaustre')

          // Se puede colocar el método listen después de la conexión a MONGO para asegurarse que se empezará siempre y cuando
          // esté lista la base de datos 
          app.listen(PORT, () =>
            console.log(`Servidor listo en http://localhost:${PORT}`)
          );
      })
  .catch(err => {
    console.log(err);
  });

  // Se pudo haber cambiado el nombre del archivo index dentro de la carpeta rutas, pero por esta vez sólo se cambió el nombre 
  // de la variable 

app.use('/api', api)
app.use('/users', users)




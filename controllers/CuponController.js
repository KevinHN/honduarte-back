var Cupon = require('../models/cupon');


const registro_cupon_admin = async function(req, res) {
    if (req.user) {
      if (req.user.role == 'admin') { 
        let data = req.body;
        let reg = await Cupon.create(data); // No es necesario pasar {data}
        res.status(200).send({ data: reg });
      } else {
        res.status(500).send({ message: 'NoAcceso' });
      }
    } else {
      res.status(500).send({ message: 'NoAcceso' });
    }
  }

  const listar_cupones_admin = async function (req, res) {


    if (req.user) {
        if (req.user.role=='admin') {
              
            var filtro= req.params['filtro'];
            let reg= await Cupon.find({codigo: new RegExp(filtro, 'i')}).sort({createdAt:-1});
            res.status(200).send({data: reg});

        } else {
            res.status(500).send({menssage: 'NoAcceso'});
        }
} else {
res.status(500).send({menssage: 'NoAcceso'});
}

  }

  const obtener_cupon_admin =async function(req,res)
  {
      if(req.user){
          if (req.user.role == 'admin'){ 
  
              var  id=req.params['id'];
              
           
  
  
              try {
                  var reg= await Cupon.findById({_id:id});
  
                  res.status(200).send({data:reg});
  
              } catch (error) {
                  
                  res.status(200).send({data:undefined});
              }
  
  
            
          
       }else{
          res.status(500).send({menssage: 'NoAcceso'});
       }
  
  }else{
      res.status(500).send({menssage: 'NoAcceso'});
  }
  
  }

  const actualizar_cupon_admin =async function(req,res)
  {
      if(req.user){
          if (req.user.role == 'admin'){ 
  
              var data = req.body;
              var id= req.params['id'];
            
              let reg = await Cupon.findByIdAndUpdate({_id:id},{
                codigo: data.codigo,
                  tipo: data.tipo,
                  valor: data.valor,
                  limite: data.limite

              });

              res.status(200).send({data:reg});

          
       }else{
          res.status(500).send({menssage: 'NoAcceso'});
       }
  
  }else{
      res.status(500).send({menssage: 'NoAcceso'});
  }
  
  }

  const eliminar_cupon_admin = async function(req,res){
    if(req.user){
        if (req.user.role == 'admin'){ 

            var id= req.params['id'];

            let reg= await Cupon.findByIdAndDelete({_id:id});

            res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({menssage: 'NoAcceso'});
         }

}else{
    res.status(500).send({menssage: 'NoAcceso'});
}

}

const valirdar_cupon_cliente = async function(req, res) {
    if (req.user) {
        var cupon = req.params['cupon'];

        var data = await Cupon.findOne({codigo:cupon});

        if (data) {
            if (data.limite==0) {
                res.status(200).send({data:undefined});
            } else {
                res.status(200).send({data:data});
            } 
        } else {
            res.status(200).send({data:undefined});
        }

    } else {
      res.status(500).send({ message: 'NoAcceso' });
    }
  }

module.exports = {
    registro_cupon_admin,
    listar_cupones_admin,
    obtener_cupon_admin,
    actualizar_cupon_admin,
    eliminar_cupon_admin,
    valirdar_cupon_cliente

}
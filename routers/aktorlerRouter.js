const router=require('express').Router();
let data = require("../data")
const Aktor = require('../data/data-model');
const { update } = require('../data/db-config');

router.get('/',(req,res)=>{
    Aktor.findAktor()
    .then((aktorler)=>{
        res.status(200).json(aktorler)
        console.log(aktorler)
    }).catch((error)=>{
        next({statusCode:500,errorMessage:"Aktorler listeleme hata olustu",error})
    })
    //res.status(200).json(data)
})

//let next_id = 4;

router.post("/",(req,res,next)=>{
    const yeniAktor = req.body;
    if(!yeniAktor.isim){
        next({
            statusCode:400,
            errorMessage:"aktor eklemek icin isim girmelisiniz"
        })
    }
    else{
        Aktor.addAktor(yeniAktor).then((added)=>{
            res.status(201).json(added);
        })
        .catch(error=>{
            next({
                statusCode:500,
                errorMessage:"Aktor eklerken hata olustu",
                error
            })
        })
    }


    /*let yeni_aktor=req.body;
    if(!yeni_aktor.isim)
    {
        next({statusCode:400,errorMessage:"Aktor eklemek icin isim giriniz"});
    }
    else if(yeni_aktor.isim && !yeni_aktor.filmler)
    {
        next({statusCode:400,errorMessage:"Aktor eklemek icin filmleri giriniz"});
    }
    else
    {
        yeni_aktor.id=next_id;
        next_id++;
        data.push(yeni_aktor)
        res.status(201).json(yeni_aktor);
    }*/
   
})
router.delete("/:id",(req,res,next)=>{
    const sil_id=req.params.id;
    Aktor.findAktorById(id).then(silinecekAktor=>{
        Aktor.deleteAktor(id).then(deleted=>{
            if(deleted){
                res.status(204).end();
            }
            next({
                statusCode:500,
                errorMessage:"Id ait kayit bulunamadi",
                error
            })
        })
        .catch(error=>{
            next({
                statusCode:500,
                errorMessage:"Aktor silinirken hata olustu",
                error
            })
        })
    })
    .catch(error=>{
        next({
            statusCode:500,
            errorMessage:"Aktor bulunurken hata olustu",
            error
        })
    })
    
    /*const sil_aktor=data.find(aktor=>Number(sil_id)===aktor.id)
    console.log(sil_aktor)
    if(sil_aktor){
        data = data.filter(aktor=>aktor.id!==Number(sil_id))
        res.status(204).end();
    }
    else{
        res.status(404).json({error:"hata silinemedi"})
    }*/
})

router.patch('/:id',(req,res,next)=>{
    const {id} = req.params;
    const updatedAktor=req.body;

    if(!updatedAktor){
        res.status(400).next({
            statusCode:400, 
            errorMessage:"Aktor ismi bos olamaz"
        })
    }
    else{
        Aktor.updateAktor(updatedAktor,id).then(updated=>{
            res.status(200).json(updated);
    }).catch(error=>{
        next({
            statusCode:500,
            errorMessage:"Aktor duzenlerken hata",
            error
        })
    })
    }
    
})

/*router.put("/:id",(req,res)=>{
    const update_id=req.params.id;
    const update_body=req.body;
    const update_aktor=data.find(aktor=>{
        if(Number(update_id)===aktor.id){
            aktor.isim=update_body.isim;
            aktor.filmler=update_body.filmler;
           //newAktor={...aktor,update_body}
           //console.log(newAktor)
            res.status(204).end();
        }
        else{
            res.status(404).json("hata");
        }
    })
    //console.log(sil_aktor)
    if(sil_aktor){
        data = data.filter(aktor=>aktor.id!==Number(sil_id))
        res.status(204).end();
    }
    else{
        res.status(404).json({error:"hata silinemedi"})
    }
})*/
router.get('/:id',(req,res,next)=>{
    const {id}=req.params; //req.query - req.body
    Aktor.findAktorById(id).then(aktor=>{
        if(aktor){
            res.status(200).json(aktor)
        }
        else{
            next({
                statusCode:400,
                errorMessage:"Aktor bulunamadi",
                error
            })
        }
    })
    .catch(error=>{
        next({
            statusCode:500,
            errorMessage:"Aktor bulunurken hata",
            error
        })
    })
    /*console.log(req.params);
    const aktor = data.find((aktor)=>aktor.id===parseInt(id))
    if(aktor){
        res.status(200).json(aktor);
    }
    else{
        res.status(404).send("Bulunamadı");
    }*/
})

module.exports = router;
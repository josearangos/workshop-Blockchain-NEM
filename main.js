/*let nem=require('nem-sdk').default;

let endpoint=nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
*/

/*nem.com.requests.chain.lastBlock(endpoint).then(function(res){ // ver información general sobre la blockchain
    console.log(res);
    
},function(err){
    console.log(err);
    
});*/

/*nem.com.requests.chain.time(endpoint).then(function(res){ // ver el tiempo
    console.log(res);
    
},function(err){
    console.log(err);
    
});*/
/*
nem.com.requests.chain.height(endpoint).then(function(res){ // ver altura
    console.log(res);
    
},function(err){
    console.log(err);
    
});*/

//    para las transacciones 
/*
let nem=require('nem-sdk').default;

let endpoint=nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

let common = nem.model.objects.create('common')('PassWallet','PrivadeKeyWallet');

                                                                            //direccionWallet,monto,mensaje
let transferTransaction = nem.model.objects.create('transferTransaction')('direccionWallet',monto,mess);

let txEntity = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);



//let preparedTransaction=nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);


nem.com.requests.chain.time(endpoint).then(function(timeStamp){
    const ts = Math.floor(timeStamp.receiveTimeStamp / 1000);
    txEntity.timeStamp = ts;
    const due = 60;
    txEntity.deadline = ts + due * 60;
  
    console.log(txEntity);
  
    nem.model.transactions.send(common, txEntity, endpoint).then(function(res){
      console.log(res);
    },function(err){
      console.log(err);
    });
  
  }, function(err){
      console.log(err);
  });*/



  // USANDO MI MOSAICO

  let nem = require("nem-sdk").default;

  let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
  
  let common = nem.model.objects.create('common')('','68d299fb9e91a452d29e810206a00e19756eaf4c449318d4d543f379136ef56a');
  
  
  let transferTransaction = nem.model.objects.create('transferTransaction')("TDDZ2R-3VGADH-PCJGUU-EALCOW-LGSMXG-3R2MXY-5REB",1,"JoseCoint: Hello from transfer Mosaic Time ");
  
  var mosaicDefinitions = nem.model.objects.get("mosaicDefinitionMetaDataPair");
  
  var mosaicAttachment = nem.model.objects.create("mosaicAttachment")("josecoint","criolloscoin",7500);
  
  transferTransaction.mosaics.push(mosaicAttachment);
  
  nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId).then(function(res){
    var definitions = nem.utils.helpers.searchMosaicDefinitionArray(res.data,["criolloscoin"]);
    var fullName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);
  
    mosaicDefinitions[fullName] = {};
  
    mosaicDefinitions[fullName].mosaicDefinition = definitions[fullName];
  
    let txEntity = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitions, nem.model.network.data.testnet.id);
  
    //let preparedTransaction = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitions, nem.model.network.data.testnet.id);
  
    txEntity.fee = 1000000;
  
    nem.com.requests.chain.time(endpoint).then(function(timeStamp){
      const ts = Math.floor(timeStamp.receiveTimeStamp / 1000);
      txEntity.timeStamp = ts;
      const due = 60;
      txEntity.deadline = ts + due * 60;
  
      console.log(txEntity);
  
      nem.model.transactions.send(common, txEntity, endpoint).then(function(res){
        console.log(res);
      },function(err){
        console.log(err);
      });
  
    }, function(err){
        console.log(err);
    });
  
  }, function(err){
    console.log(err);
  });
  





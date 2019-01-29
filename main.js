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

let nem=require('nem-sdk').default;

let endpoint=nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

let common = nem.model.objects.create('common')('fudaxe41','68d299fb9e91a452d29e810206a00e19756eaf4c449318d4d543f379136ef56a');

                                                                            //direccionWallet,monto,mensaje
let transferTransaction = nem.model.objects.create('transferTransaction')('TDARMS-EHAU45-SW2D6X-IDJA3N-2Z7ZMH-LERT4W-HL5W',2,'pa los bolis, de jose sin el tiempo');

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
  });
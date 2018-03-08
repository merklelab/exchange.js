var abi = [{"constant":false,"inputs":[{"name":"ID","type":"uint256"}],"name":"buyerRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"sellerDatabase","outputs":[{"name":"seller","type":"address"},{"name":"buyer","type":"address"},{"name":"amount","type":"uint256"},{"name":"escrow_intervention","type":"bool"},{"name":"release_approval","type":"bool"},{"name":"refund_approval","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"inputAddress","type":"address"},{"name":"startID","type":"uint256"},{"name":"numToLoad","type":"uint256"}],"name":"buyerHistory","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"fromAddress","type":"address"}],"name":"CheckBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ID","type":"uint256"}],"name":"sellerFundRelease","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"switcher","type":"uint256"},{"name":"ID","type":"uint256"}],"name":"EscrowEscalation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"WithdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"buyerAddress","type":"address"}],"name":"newEscrow","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"inputAddress","type":"address"},{"name":"switcher","type":"uint256"},{"name":"ID","type":"uint256"}],"name":"getSpecificTransaction","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"sellerAddress","type":"address"},{"name":"nounce","type":"uint256"}],"name":"checkStatus","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"escrow_fee_percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"buyerDatabase","outputs":[{"name":"seller","type":"address"},{"name":"seller_nounce","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"inputAddress","type":"address"},{"name":"switcher","type":"uint256"}],"name":"getNumTransactions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"buyeraddress","type":"address"},{"name":"ID","type":"uint256"},{"name":"Decision","type":"uint256"}],"name":"escrowDecision","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"sellerAddress","type":"address"},{"name":"startID","type":"uint256"},{"name":"numToLoad","type":"uint256"}],"name":"sellerHistory","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Funds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];

var escrowContract = new web3.eth.Contract(abi);
escrowContract.options.address = '0xe92ED9C84f3b7a90E77F62dd0165b461F06cF31b';
var addressObj = {};
var acct1 = '0xCc1C2a5C41796282d492b67a196bD92364De060b';
var acct2 = '0x78d5C220C68AF2A55D07f1bE5A747ea853a847b1';
var acct3 = '0xB072e146235C41209430208DFCd73f6f02730b10';


function submitEscrowDetails() {
  var address=document.getElementById("address").value;
  var value = document.getElementById("value").value;
  document.getElementById("Escrow-Form").style.display = "none";
  // if (/^0x[a-fA-F0-9]{40}$/.test(address) !== 0){
  //   alert('Eth address not valid');
  // }
  // else{
    createEscrow(address, value);

  // }
}

function enableEscrowForm() {
  document.getElementById("Escrow-Form").style.display = "block";
}

function createEscrow(address, value) {
  web3.eth.getAccounts().then(function(sender){
    escrowContract.methods.newEscrow(address).send({from: sender[0], value: web3.utils.toWei(value, 'ether')}).then(function(data){
      if(data){
        document.getElementById("EscrowBtn").style.display = "none";
        document.getElementById("ReleaseBtn").style.display = "block";
        document.getElementById("RefundBtn").style.display = "block";
    }})
  })

  //(return ID of transaction)
}

function releaseEther(){

  //put 0 for time being get the data from newEscrow function
  web3.eth.getAccounts().then(function(sender){
    escrowContract.methods.sellerFundRelease(0).send({from: sender[0]}).then(function(data){
    if(data){
      document.getElementById("ReleaseBtn").style.display = "none";
      document.getElementById("RefundBtn").style.display = "none";
      document.getElementById("WithdrawBtn").style.display = "Block";
    }})
})
}

function refundEther(){
  web3.eth.getAccounts().then(function(sender){
    escrowContract.methods.buyerRefund(0).send({from: sender[0]}).then(function(data){
    if(data)
    {
      document.getElementById("ReleaseBtn").style.display = "none";
      document.getElementById("RefundBtn").style.display = "none";
      document.getElementById("WithdrawBtn").style.display = "Block";
    }})
})
}

function withdrawFunds(){
  web3.eth.getAccounts().then(function(sender){
    escrowContract.methods.WithdrawFunds().send({from: sender[0]}).then(function(result, error){
    if(!error)
        console.log(result);
    else
        console.error(error);
})
})
}

function getNumTransactions(address, switcher){
  escrowContract.methods.getNumTransactions(address, switcher).call().then(function(result, error){
  if(!error){
      console.log(result);
      return result;}
  else
      console.error(error);
})
}

function getSpecificTransactions(address, switcher, id){
  escrowContract.methods.getSpecificTransaction(address, switcher, id).call().then(function(result, error){
  if(!error)
      console.log(result);
  else
      console.error(error);
})
}

function CheckBalance(){
    escrowContract.methods.CheckBalance(acct1).call().then(function(result, error){
    if(!error)
        console.log(result);
    else
        console.error(error);
})
}

function checkStatus(){
  escrowContract.methods.checkStatus(acct2, 1).call().then(function(result, error){
  if(!error)
      console.log(result);
  else
      console.error(error);
})
}

function sellerHistory() {
  escrowContract.methods.sellerHistory(acct1, 0, 10).call().then(function(result, error){
  if(!error)
      console.log(result);
  else
      console.error(error);
})
}

function buyerHistory() {
  escrowContract.methods.buyersHistory(acct1, 0, 10).call().then(function(result, error){
  if(!error)
      console.log(result);
  else
      console.error(error);
})
}

function escrowEscalation(switcher, id){
  escrowContract.methods.escrowEscalation(switcher, id).send({from:msg.sender}).then(function(result, error){
    if(!error)
    console.log(result)
    else
    console.error(error);
  })
}

function escrowDesciosion(address, id, decision) {
  escrowContract.methods.escrowDecision(address, id, decision).send({from:msg.sender}).then(function(result, error){
    if(!error)
    console.log(result)
    else
    console.error(error);
  })
}


// function listTranasaction(addresses, switcher) {
//  var list = [];
//  var totalAddresses = addresses.length;
//  for (addressNumber = 0; addressNumber < totalAddresses; addressNumber++){
//    escrowContract.methods.getNumTransactions(addresses[addressNumber], switcher).call().then(function(data){
//      for (count = 0; count < data; count++){
//        var batch = new web3.BatchRequest();
//        batch.add(escrowContract.methods.getSpecificTransaction(addresses[0], switcher, count).call().then(function(result, error){
//        if(!error){
//          var row = document.createElement('tr');
//          for (rowCount = 0; rowCount < 4; rowCount++) {
//            var cell = document.createElement('td');
//            cell.appendChild(document.createTextNode(result[rowCount]));
//            row.appendChild(cell);
//          };
//          table.appendChild(row);
//          document.getElementById("table").style.display = "block";
//        }
//        else
//        console.error(error);
//      })
//    )
//    batch.add(escrowContract.methods.getSpecificTransaction(addresses[1], switcher, count).call().then(function(result, error){
//    if(!error){
//      var row = document.createElement('tr');
//      for (rowCount = 0; rowCount < 4; rowCount++) {
//        var cell = document.createElement('td');
//        cell.appendChild(document.createTextNode(result[rowCount]));
//        row.appendChild(cell);
//      };
//      table.appendChild(row);
//      document.getElementById("table").style.display = "block";
//    }
//    else
//    console.error(error);
//  })
// )
// batch.execute();
//
//    }
//  })
// }
// }

//---------------------------------------------
// function createAddressCountArray(addresses, addressNumber, switcher){
//   escrowContract.methods.getNumTransactions(addresses[addressNumber], switcher).call().then(function(data){
//     addressObj[addresses[addressNumber]] = data;
// }
// )}
//
// function showList(key, switcher, count, newWin){
//   escrowContract.methods.getSpecificTransaction(key, switcher, count).call().then(function(result, error){
//     if(!error){
//       var row = document.createElement('tr');
//       // var cell1 = document.createElement('td');
//       // cell1.appendChild(document.createTextNode(count));
//       // row.appendChild(cell1);
//       for (rowCount = 0; rowCount < 3; rowCount++) {
//         var cell = document.createElement('td');
//         cell.appendChild(document.createTextNode(result[rowCount]));
//         row.appendChild(cell);
//       };
//       var table = newWin.document.getElementById('table');
//       table.appendChild(row);
//       table.style.display = "block";
//     }
//     else
//     console.error(error);
//     }
//   )
//   }

function showList(result, newWin){
  var length = result[0].length;
  for (var count = 0; count < length, count++) function(count){
    var row = document.createElement('tr');
    for (rowCount = 0; rowCount < 3; rowCount++) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(result[count][rowCount]))
      row.appendChild(cell);
    }
    var table = newWin.document.getElementById('table');
    table.appendChild(row);
    table.style.display = "block";
  }(count);
}




//
//
// function listTransaction(addresses, switcher){
//   var totalAddresses = addresses.length;
//   for (var addressNumber = 0; addressNumber < totalAddresses; addressNumber++){
//     createAddressCountArray(addresses, addressNumber, switcher);
//   };
//   var newWin = window.open('other.html');
//   newWin.onload = function(){
//   for (var key in addressObj){
//     for (var count = 0; count < addressObj[key]; count++){
//       showList(key, switcher, count, newWin);
//   }
// }
// }
// }
//-------------------------------------

// function listTransaction(addresses, switcher){
//   var totalAddresses = addresses.length;
//   var newWin = window.open('other.html');
//   for (var addressNumber = 0; addressNumber < totalAddresses; addressNumber++) (function(addressNumber){
//      escrowContract.methods.getNumTransactions(addresses[addressNumber], switcher).call().then(function(data){
//       for (var count = 0; count < data; count++) (function(count){
//         showList(addresses[addressNumber], switcher, count, newWin);
//       }) (count);
//       return null;
//      })
//   }) (addressNumber);
// }


function listTransaction(addresses, switcher, startID){
  var totalAddresses = addresses.length;
  var batch = new web3.BatchRequest();
  var data;
  var newWin = window.open('other.html');
  for (var addressNumber = 0; addressNumber < totalAddresses; addressNumber++) (function(addressNumber){
    if (switcher == 0)
    {
      batch.add(escrowContract.methods.sellerhistory(adresses[addressNumber], startID, 10).call.request(function(error, result) {
        if(!error)
        showList(result);
        else
        console.error(error);
      }));
    }
    else if(switcher == 1)
    {
      batch.add(escrowContract.methods.buyerhistory(adresses[addressNumber], startID, 10).call.request(function(error, result){
        if(!error)
        showList(result);
        else
        console.error(error);
      }));
    }
}) (addressNumber);
}


// function listTransaction(addresses, switcher) {
//   var totalAddreses = addresses.length;
//   var batch = new web3.BatchRequest();
//   console.log(1);
//   batch.add(escrowContract.methods.getNumTransactions(addresses[0], switcher).call().then(function(data){
//     console.log(2);
//     addressObj[addresses[0]] = data;
//     console.log(3)
//   }))
//   batch.add(escrowContract.methods.getNumTransactions(addresses[1], switcher).call().then(function(data){
//     console.log(4);
//     addressObj[addresses[1]] = data;
//     console.log(5)
//   }))
//   console.log(6);
//   //batch.execute();
//   console.log(7);
//   console.log(addressObj);
// }

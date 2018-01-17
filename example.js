let Web3 = require('web3')

let url = 'http://localhost:8545'

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(url))
}

// send transaction 之后，若成功
// 结果会返回一个交易的地址，记住或保存在合约 event 里
let txHash = '0x44ca19caa94c1c0b352b0234d6de2574d02fc2558974152b2c5e410f29e864d2'

// 检查交易 pending 成功
let tx = web3.eth.getTransaction(txHash, (err, result) => {
  if (!err) {
    if (result != null) {
      // 交易被提交
      console.log(err, result)
    } else {
      // 没找到该交易
      console.log("this transaction not pending", result)
    }
  } else {
    // 网络链接不上，数据格式不对等错误
    console.log("system error: ", err)
  }
})

// 检查交易是否执行过，执行过
// 无法判断抛出异常、执行错误
// 异常和执行错误只能通过在合约里进行执行记录，一般记在 event 里
let receipt = web3.eth.getTransactionReceipt(txHash, (err, result) => {
  if (!err) {
    if (result != null) {
      // 交易执行过
      if (result.status === '0x1') {
        console.log("交易执行成功，未发生异常或 gas 耗尽")
      } else if (result.status === '0x0') {
        console.log("交易执行完成，但发生异常或 gas 耗尽")
      } else {
        console.log("该块中的交易还不支持status字段，可能执行可能成功也可能失败。" +
            "geth返回时不包含此字段，parity返回时此字段值可能为null")
      }
    } else {
      // 该交易未被执行，但可能已经被提交
      console.log("this transaction not mined", result)
    }
  } else {
    // 网络链接不上，数据格式不对等错误
    console.log("system error: ", err)
  }
})

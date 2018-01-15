let Web3 = require('web3')

let url = 'http://localhost:8545'

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(url))
}

// send transaction 之后，若成功
// 结果会返回一个交易的地址，记住或保存在合约 event 里
let txHash = '0xbfe47531007041c61c921589c2c8defc74ab116706f5e6b11acdc06473269ee8'

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
      console.log(err, result)
    } else {
      // 该交易未被执行，但可能已经被提交
      console.log("this transaction not mined", result)
    }
  } else {
    // 网络链接不上，数据格式不对等错误
    console.log("system error: ", err)
  }
})

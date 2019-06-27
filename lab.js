let ethers = require('ethers')
require('dotenv').config()

let SimpleBank = require('./dist/contracts/SimpleBank.json')

let simpleBankABI = SimpleBank.abiDefinition;
let simpleBankBCODE = SimpleBank.code;

// let abi = [
// 	{
// 		"constant": false,
// 		"inputs": [],
// 		"name": "deposit",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": true,
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [],
// 		"name": "enroll",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "withdrawAmount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "withdraw",
// 		"outputs": [
// 			{
// 				"name": "remainingBal",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"payable": true,
// 		"stateMutability": "payable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"name": "accountAddress",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "LogDepositMade",
// 		"type": "event"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "balance",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "depositsBalance",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]

// let bytecode = "0x60806040526729a2241af62c00003414610081576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f3320657468657220696e697469616c2066756e64696e6720726571756972656481525060200191505060405180910390fd5b33600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008060006101000a81548160ff021916908360ff16021790555061053c806100ec6000396000f3fe6080604052600436106100555760003560e01c8063138fbe711461005a5780632e1a7d4d146100855780638da5cb5b146100d4578063b69ef8a81461012b578063d0e30db014610156578063e65f2a7e14610174575b600080fd5b34801561006657600080fd5b5061006f61019f565b6040518082815260200191505060405180910390f35b34801561009157600080fd5b506100be600480360360208110156100a857600080fd5b81019080803590602001909291905050506101be565b6040518082815260200191505060405180910390f35b3480156100e057600080fd5b506100e96102e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561013757600080fd5b50610140610308565b6040518082815260200191505060405180910390f35b61015e61034f565b6040518082815260200191505060405180910390f35b34801561018057600080fd5b50610189610431565b6040518082815260200191505060405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821161029b5781600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050158015610299573d6000803e3d6000fd5b505b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b600034600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fa8126f7572bb1fdeae5b5aa9ec126438b91f658a07873f009d041ae690f3a193346040518082815260200191505060405180910390a2600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b600060036000809054906101000a900460ff1660ff1610156104cb5760008081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff16021790555050670de0b6b3a7640000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490509056fea165627a7a72305820067ed89ddd857bb5afc4dafa877e8f03876b83dd1a5a27fdb2778af93e55948a0029"

let provider = ethers.getDefaultProvider('ropsten')

let privateKey = process.env.pk
console.log(privateKey)

let wallet = new ethers.Wallet(privateKey, provider)

let factory = new ethers.ContractFactory(simpleBankABI,simpleBankBCODE, wallet)

async function factoryMachine() {
    

    contract = await factory.deploy();

    console.log("address : "+contract.address)

    // console.log(contract.deployTransaction.hash)

    await contract.deployed();
}
factoryMachine()

// const contractAddress = '0x1eb08cc9357fa1c873c4a0816621008c3f31b29a'

// let readOnlyContract = new ethers.Contract(contractAddress, abi, provider)

// console.log(readOnlyContract)

// let  depositsBalance = async () =>  {
//     console.log(Number(await readOnlyContract.depositsBalance()))
// }

// depositsBalance();
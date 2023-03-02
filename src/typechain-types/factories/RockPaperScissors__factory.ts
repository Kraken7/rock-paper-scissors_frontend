/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  RockPaperScissors,
  RockPaperScissorsInterface,
} from "../RockPaperScissors";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "hashGame",
        type: "bytes32",
      },
    ],
    name: "Commited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "hashGame",
        type: "bytes32",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "hashGame",
        type: "bytes32",
      },
    ],
    name: "Revealed",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashResult",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_hashGame",
        type: "bytes32",
      },
    ],
    name: "commitResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashGame",
        type: "bytes32",
      },
    ],
    name: "getGame",
    outputs: [
      {
        components: [
          {
            internalType: "address[2]",
            name: "players",
            type: "address[2]",
          },
          {
            internalType: "bool[2]",
            name: "commits",
            type: "bool[2]",
          },
          {
            internalType: "enum RockPaperScissors.Result[2]",
            name: "results",
            type: "uint8[2]",
          },
          {
            internalType: "address",
            name: "winner",
            type: "address",
          },
        ],
        internalType: "struct RockPaperScissors.GameView",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum RockPaperScissors.Result",
        name: "_result",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_secret",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_hashGame",
        type: "bytes32",
      },
    ],
    name: "revealResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610b4c806100206000396000f3fe6080604052600436106100405760003560e01c80637255d7291461004957806373931bbf1461005e578063c737e43414610094578063dc2af29b146100b457005b3661004757005b005b34801561005557600080fd5b506100476100d4565b34801561006a57600080fd5b5061007e610079366004610920565b6101c1565b60405161008b9190610998565b60405180910390f35b3480156100a057600080fd5b506100476100af366004610a2b565b610443565b3480156100c057600080fd5b506100476100cf366004610a64565b61069e565b60006100e03342610a86565b6000818152602081905260409020549091506001600160a01b03161561014d5760405162461bcd60e51b815260206004820152601d60248201527f67616d6520616c726561647920686173206265656e206372656174656400000060448201526064015b60405180910390fd5b6000818152602081815260409182902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000163390811790915582519081529081018390527f6f5adfd29acb7a52615e8b7438a8f979ab75df487b483139d2b3b5ce81c64fd6910160405180910390a150565b6101c96108c8565b6040805180820182526000848152602081815283822080546001600160a01b03908116855260018201548116838601908152865180880188528986528585528651831686526002840180865288872054151582528a875286865291518316865290845286852054151581850152865180880188528986528585528651909216855260039283019093529483205493949193829160ff9091169081111561027157610271610939565b600381111561028257610282610939565b8152600087815260208181526040808320888301516001600160a01b031684526003908101835292205492019160ff16908111156102c2576102c2610939565b60038111156102d3576102d3610939565b90528051909150600090819060038111156102f0576102f0610939565b1415801561031557506020820151600090600381111561031257610312610939565b14155b801561034857506020820151600381111561033257610332610939565b8251600381111561034557610345610939565b14155b15610416578151600190600381111561036357610363610939565b148015610385575060208201516003908181111561038357610383610939565b145b806103c357508151600390818111156103a0576103a0610939565b1480156103c35750602082015160029060038111156103c1576103c1610939565b145b806104025750815160029060038111156103df576103df610939565b14801561040257506020820151600190600381111561040057610400610939565b145b1561040f57508251610416565b5060208301515b604080516080810182529485526020850193909352918301526001600160a01b0316606082015292915050565b600083600381111561045757610457610939565b036104a45760405162461bcd60e51b815260206004820152601060248201527f696e636f727265637420726573756c74000000000000000000000000000000006044820152606401610144565b60008181526020818152604080832080546001600160a01b03168452600201909152902054158015906104fd575060008181526020818152604080832060018101546001600160a01b0316845260020190915290205415155b6105495760405162461bcd60e51b815260206004820152601c60248201527f77616974696e6720636f6d6d6974732066726f6d20706c6179657273000000006044820152606401610144565b6000818484336040516020016105629493929190610aad565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181528151602092830120600085815280845282812033825260020190935291205490915081146106005760405162461bcd60e51b815260206004820152600c60248201527f6572726f7220726573756c7400000000000000000000000000000000000000006044820152606401610144565b6000828152602081815260408083203384526003908101909252909120805486927fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0090911690600190849081111561065a5761065a610939565b021790555060408051338152602081018490527f8076a03e85784f979145c3bdb32a697dffe72d010a8eb7fe8c2aa7454811a535910160405180910390a150505050565b6000818152602081905260409020546001600160a01b03166107025760405162461bcd60e51b815260206004820152601e60248201527f67616d652074696c6c206e6f7420686173206265656e206372656174656400006044820152606401610144565b6000818152602081905260409020546001600160a01b031633148061076157506000818152602081905260409020546001600160a01b0316331480159061076157506000818152602081905260408120600101546001600160a01b0316145b6107ad5760405162461bcd60e51b815260206004820152601860248201527f67616d6520616c72656164792068617320706c617965727300000000000000006044820152606401610144565b600081815260208181526040808320338452600201909152902054156108155760405162461bcd60e51b815260206004820152601560248201527f726573756c7420686173206265656e20736176656400000000000000000000006044820152606401610144565b6000818152602081905260409020546001600160a01b0316331461086d57600081815260208190526040902060010180547fffffffffffffffffffffffff000000000000000000000000000000000000000016331790555b60008181526020818152604080832033808552600290910183529281902085905580519283529082018390527f37ba923fffb60278a016dc06a84ba47b0b992e77172c0b44f788606805ae10e5910160405180910390a15050565b60405180608001604052806108db610902565b81526020016108e8610902565b81526020016108f5610902565b8152600060209091015290565b60405180604001604052806002906020820280368337509192915050565b60006020828403121561093257600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b806000805b6002811015610991578251600480821061097b57634e487b7160e01b845260218152602484fd5b5085526020948501949290920191600101610954565b5050505050565b815160e08201908260005b60028110156109cb5782516001600160a01b03168252602092830192909101906001016109a3565b5050506020808401516040840160005b60028110156109fa5782511515825291830191908301906001016109db565b505050506040830151610a10608084018261094f565b50606092909201516001600160a01b031660c0919091015290565b600080600060608486031215610a4057600080fd5b833560048110610a4f57600080fd5b95602085013595506040909401359392505050565b60008060408385031215610a7757600080fd5b50508035926020909101359150565b80820180821115610aa757634e487b7160e01b600052601160045260246000fd5b92915050565b848152600060048510610ad057634e487b7160e01b600052602160045260246000fd5b5060f89390931b6020840152602183019190915260601b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016604182015260550191905056fea26469706673582212209f59bef84bfd8da4b08719709e9f602317a1339120d2e2a85f40829d28ab0b4464736f6c63430008110033";

type RockPaperScissorsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RockPaperScissorsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RockPaperScissors__factory extends ContractFactory {
  constructor(...args: RockPaperScissorsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RockPaperScissors> {
    return super.deploy(overrides || {}) as Promise<RockPaperScissors>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): RockPaperScissors {
    return super.attach(address) as RockPaperScissors;
  }
  override connect(signer: Signer): RockPaperScissors__factory {
    return super.connect(signer) as RockPaperScissors__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RockPaperScissorsInterface {
    return new utils.Interface(_abi) as RockPaperScissorsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RockPaperScissors {
    return new Contract(address, _abi, signerOrProvider) as RockPaperScissors;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace RockPaperScissors {
  export type GameViewStruct = {
    players: [PromiseOrValue<string>, PromiseOrValue<string>];
    commits: [PromiseOrValue<boolean>, PromiseOrValue<boolean>];
    results: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>];
    winner: PromiseOrValue<string>;
  };

  export type GameViewStructOutput = [
    [string, string],
    [boolean, boolean],
    [number, number],
    string
  ] & {
    players: [string, string];
    commits: [boolean, boolean];
    results: [number, number];
    winner: string;
  };
}

export interface RockPaperScissorsInterface extends utils.Interface {
  functions: {
    "commitResult(bytes32,bytes32)": FunctionFragment;
    "createGame()": FunctionFragment;
    "getGame(bytes32)": FunctionFragment;
    "revealResult(uint8,bytes32,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "commitResult"
      | "createGame"
      | "getGame"
      | "revealResult"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "commitResult",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "createGame",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGame",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "revealResult",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "commitResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "revealResult",
    data: BytesLike
  ): Result;

  events: {
    "Commited(address,bytes32)": EventFragment;
    "GameCreated(address,bytes32)": EventFragment;
    "Revealed(address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Commited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Revealed"): EventFragment;
}

export interface CommitedEventObject {
  player: string;
  hashGame: string;
}
export type CommitedEvent = TypedEvent<[string, string], CommitedEventObject>;

export type CommitedEventFilter = TypedEventFilter<CommitedEvent>;

export interface GameCreatedEventObject {
  creator: string;
  hashGame: string;
}
export type GameCreatedEvent = TypedEvent<
  [string, string],
  GameCreatedEventObject
>;

export type GameCreatedEventFilter = TypedEventFilter<GameCreatedEvent>;

export interface RevealedEventObject {
  player: string;
  hashGame: string;
}
export type RevealedEvent = TypedEvent<[string, string], RevealedEventObject>;

export type RevealedEventFilter = TypedEventFilter<RevealedEvent>;

export interface RockPaperScissors extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RockPaperScissorsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    commitResult(
      _hashResult: PromiseOrValue<BytesLike>,
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getGame(
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[RockPaperScissors.GameViewStructOutput]>;

    revealResult(
      _result: PromiseOrValue<BigNumberish>,
      _secret: PromiseOrValue<BytesLike>,
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  commitResult(
    _hashResult: PromiseOrValue<BytesLike>,
    _hashGame: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createGame(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getGame(
    _hashGame: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<RockPaperScissors.GameViewStructOutput>;

  revealResult(
    _result: PromiseOrValue<BigNumberish>,
    _secret: PromiseOrValue<BytesLike>,
    _hashGame: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    commitResult(
      _hashResult: PromiseOrValue<BytesLike>,
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    createGame(overrides?: CallOverrides): Promise<void>;

    getGame(
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<RockPaperScissors.GameViewStructOutput>;

    revealResult(
      _result: PromiseOrValue<BigNumberish>,
      _secret: PromiseOrValue<BytesLike>,
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Commited(address,bytes32)"(
      player?: null,
      hashGame?: null
    ): CommitedEventFilter;
    Commited(player?: null, hashGame?: null): CommitedEventFilter;

    "GameCreated(address,bytes32)"(
      creator?: null,
      hashGame?: null
    ): GameCreatedEventFilter;
    GameCreated(creator?: null, hashGame?: null): GameCreatedEventFilter;

    "Revealed(address,bytes32)"(
      player?: null,
      hashGame?: null
    ): RevealedEventFilter;
    Revealed(player?: null, hashGame?: null): RevealedEventFilter;
  };

  estimateGas: {
    commitResult(
      _hashResult: PromiseOrValue<BytesLike>,
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getGame(
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revealResult(
      _result: PromiseOrValue<BigNumberish>,
      _secret: PromiseOrValue<BytesLike>,
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    commitResult(
      _hashResult: PromiseOrValue<BytesLike>,
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getGame(
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revealResult(
      _result: PromiseOrValue<BigNumberish>,
      _secret: PromiseOrValue<BytesLike>,
      _hashGame: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

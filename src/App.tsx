import { useEffect, useState } from "react";
import './App.css';
import { ethers } from 'ethers';
import { RockPaperScissors, RockPaperScissors__factory } from "./typechain-types";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [chain, setChain] = useState<string>("");
  const [provider, setProvider] = useState<Provider>();
  const [signer, setSigner] = useState<Signer>();
  const [contract, setContract] = useState<RockPaperScissors>();
  const contractAddress: string = process.env.REACT_APP_CONTRACT_ADDRESS!;
  const neadChainId: string = process.env.REACT_APP_CHAIN_ID!;

  const [waitingNewGame, setWaitingNewGame] = useState<Boolean>(false);

  const [hashGame, setHashGame] = useState<string>("");
  const [numberGame, setNumberGame] = useState<string>("");
  const [gameInfo, setGameInfo] = useState<any>();
  const [playerNumber, setPlayerNumber] = useState<number>();

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    gameNumberFromLink();
    generateSecret();
    listenCommit();
    listenReveal();
  }, [walletAddress]);

  const connectWallet = async (): Promise<void> => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        await handleChain(chainId);

        if (chainId === neadChainId) {
          await initProvider(accounts[0]);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  // const disconnectWallet = async (): Promise<void> => {
  //   if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
  //     window.ethereum.on('disconnect', (): void => {});
  //     setWalletAddress("");
  //     setProvider("");
  //   } else {
  //     /* MetaMask is not installed */
  //     console.log("Please install MetaMask");
  //   }
  // };

  const getCurrentWalletConnected = async (): Promise<void> => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          await handleChain(chainId);

          if (chainId === neadChainId) {
            await initProvider(accounts[0]);
          }
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const handleChain = async (chainId: string): Promise<void> => {
    setChain(chainId);
    if (chainId !== neadChainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: neadChainId }],
        });
        getCurrentWalletConnected();
      } catch (switchError) {}
    }
  }

  const addWalletListener = async (): Promise<void> => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", async (accounts: Array<string>): Promise<void> => {
        await initProvider(accounts[0]);
      });
      window.ethereum.on('chainChanged', async (chainId: string): Promise<void> => {
        await handleChain(chainId);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  const randomString = (length: number): string => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const initProvider = async (address: string): Promise<void> => {
    setWalletAddress(address);

    let _provider = new ethers.providers.Web3Provider(window.ethereum);
    let _signer = _provider.getSigner();
    let _contract = RockPaperScissors__factory.connect(contractAddress, _signer);

    setProvider(_provider);
    setSigner(_signer);
    setContract(_contract);
  };

  const generateSecret = async (): Promise<void> => {
    if (!localStorage.getItem('secret')) {
      localStorage.setItem('secret', randomString(20));
    }
  };

  const getHashGame = (number: string): string => {
    return ethers.utils.hexZeroPad(ethers.BigNumber.from(number).toHexString(), 32);
  }

  const getNumberGame = (hash: string): string => {
    return ethers.BigNumber.from(hash).toString();
  }

  const getHashResult = (hashGame: string, result: number, secret: string, address: string): string => {
    return ethers.utils.solidityKeccak256(
        ['bytes32', 'uint8', 'bytes32', 'address'],
        [hashGame, result, ethers.utils.formatBytes32String(secret), address]
    );
  }

  const getHashSecret = (secret: string): string => {
    return ethers.utils.formatBytes32String(secret);
  }

  const copyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(window.location.toString());
  }

  const gameNumberFromLink = async (): Promise<void> => {
    if (contract) {
      let path = window.location.pathname.substring(1);
      if (path) {
        let hashGame = getHashGame(path);
        let gameInfo = await contract.getGame(hashGame);
        
        if (gameInfo.players[0] != ethers.constants.AddressZero) {
          setGameInfo(gameInfo);
          setHashGame(hashGame);
          setNumberGame(getNumberGame(hashGame));

          let _playerNumber = 1;
          if (gameInfo.players[0].toUpperCase() == walletAddress.toUpperCase()) _playerNumber = 0;
          setPlayerNumber(_playerNumber);

        } else {
          window.location.pathname = "";
        }
      }
    }
  }

  const newGame = async (): Promise<void> => {
    if (contract) {
      await contract.createGame();
      setWaitingNewGame(true);

      contract.on('GameCreated', async (_creator, _hashGame, event) => {
        if (_creator.toUpperCase() === walletAddress.toUpperCase()) {
          setHashGame(_hashGame);
          let _number = getNumberGame(_hashGame);
          setNumberGame(_number);
          window.location.pathname = _number;
          let gameInfo = await contract.getGame(_hashGame);
          setGameInfo(gameInfo);
          setPlayerNumber(0);
          setWaitingNewGame(false);
        }
      });
    }
  };

  const commit = async (result: number): Promise<void> => {
    let secret = localStorage.getItem('secret');
    if (secret && contract) {
      localStorage.setItem(hashGame, result.toString());
      const hashResult = getHashResult(hashGame, result, secret, walletAddress);
      await contract.commitResult(hashResult, hashGame);
      listenCommit();
    }
  };

  const reveal = async (): Promise<void> => {
    let secret = localStorage.getItem('secret');
    let result = localStorage.getItem(hashGame);
    if (secret && result && contract) {
      await contract.revealResult(parseInt(result), getHashSecret(secret), hashGame);
      listenReveal();
    }
  };

  const listenCommit = async (): Promise<void> => {
    if (contract) {
      contract.on('Commited', async (_player, _hashGame, event) => {
        if (hashGame === _hashGame) {
          setGameInfo(await contract.getGame(_hashGame));
        }
      });
    }
  };

  const listenReveal = async (): Promise<void> => {
    if (contract) {
      contract.on('Revealed', async (_player, _hashGame, event) => {
        if (hashGame === _hashGame) {
          setGameInfo(await contract.getGame(_hashGame));
        }
      });
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="title">камень ножницы бумага</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              {walletAddress && walletAddress.length > 0
                ? <button className="button is-white connect-wallet">
                    <span className="is-link has-text-weight-bold">Аккаунт: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}</span>
                  </button>
                : <button className="button is-white connect-wallet" onClick={connectWallet}>
                    <span className="is-link has-text-weight-bold">Подключить кошелек</span>
                  </button>}
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <div className="box address-box">
              {provider && contract 
              ? <div>
                  <div className="columns">
                    {numberGame
                      ? <div className="column is-full">
                          <div className="field is-grouped is-grouped-multiline block-game-number">
                          <div className="control">
                            <div className="tags has-addons">
                              <span className="tag is-dark">номер игры</span>
                              <span className="tag is-info">{numberGame.substring(0, 8)}...{numberGame.substring(40)}</span>
                              <span className="tag is-link button" onClick={copyLink}><span className="copy"></span></span>
                            </div>
                          </div>
                        </div>
                      </div> : ""}
                    <div className="column is-full">
                    {!waitingNewGame
                      ? <button onClick={newGame} className="button is-link is-medium is-fullwidth">
                        Новая игра
                      </button>
                      : <div className="clock-loader"></div>}
                    </div>
                  </div>
                  {gameInfo && playerNumber != undefined
                  ? <article className="panel is-grey-darker">

                    {!gameInfo.commits[playerNumber]
                    ? <div>
                      <p className="panel-heading">твой ход</p>
                      <div className="panel-block game-items">
                        <button onClick={() => commit(1)} className="button btn-rock"></button>
                        <button onClick={() => commit(2)} className="button btn-paper"></button>
                        <button onClick={() => commit(3)} className="button btn-scissors"></button>
                      </div>
                    </div> : ""}

                    {gameInfo.commits[playerNumber] && !gameInfo.commits[playerNumber == 1 ? 0 : 1]
                    ? <div>
                      <p className="panel-heading">ожидание игрока</p>
                      <div className="panel-block game-items">
                        <div className="btn-waiting"><div className="clock-loader"></div></div>
                        {localStorage.getItem(hashGame) == "1" ? <div className="btn-rock"></div> : ""}
                        {localStorage.getItem(hashGame) == "2" ? <div className="btn-paper"></div> : ""}
                        {localStorage.getItem(hashGame) == "3" ? <div className="btn-scissors"></div> : ""}
                      </div>
                    </div> : ""}

                    {gameInfo.commits[0] && gameInfo.commits[1] && !(gameInfo.results[0] && gameInfo.results[1])
                    ? <div>
                      <p className="panel-heading">подтверждение</p>
                      <div className="panel-block game-items">
                        <div className="btn-commit">?</div>
                        {localStorage.getItem(hashGame) == "1" ? <div className="btn-rock"></div> : ""}
                        {localStorage.getItem(hashGame) == "2" ? <div className="btn-paper"></div> : ""}
                        {localStorage.getItem(hashGame) == "3" ? <div className="btn-scissors"></div> : ""}
                      </div>
                      {!gameInfo.results[playerNumber]
                      ? <button onClick={reveal} className="button is-success is-medium is-fullwidth">
                          Подтвердить
                      </button>
                      : <div className="button is-warning is-medium is-fullwidth">
                          ожидание игрока
                      </div> }
                    </div> : ""}

                    {gameInfo.results[0] && gameInfo.results[1]
                    ? <div>
                      <p className="panel-heading">результат</p>
                      <div className="panel-block game-items">
                        {gameInfo.results[playerNumber == 1 ? 0 : 1] == 1 ? <div className="btn-rock"></div> : ""}
                        {gameInfo.results[playerNumber == 1 ? 0 : 1] == 2 ? <div className="btn-paper"></div> : ""}
                        {gameInfo.results[playerNumber == 1 ? 0 : 1] == 3 ? <div className="btn-scissors"></div> : ""}
                        {gameInfo.results[playerNumber] == 1 ? <div className="btn-rock"></div> : ""}
                        {gameInfo.results[playerNumber] == 2 ? <div className="btn-paper"></div> : ""}
                        {gameInfo.results[playerNumber] == 3 ? <div className="btn-scissors"></div> : ""}
                      </div>
                      <div className="panel-block panel-block__res">
                        {gameInfo.winner != ethers.constants.AddressZero
                        ? <span className="tag is-info is-light">Игрок {gameInfo.winner.substring(0, 6)}...{gameInfo.winner.substring(38)} выиграл</span>
                        : <span className="tag is-info is-light">ничья</span>}
                      </div>
                    </div> : ""}
                  </article>
                  : ""}
                </div>
              : <button className="button is-black connect-wallet" onClick={connectWallet}>
                  <span className="is-link has-text-weight-bold">Подключить кошелек</span>
                </button>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

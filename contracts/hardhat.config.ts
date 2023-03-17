import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';

const config: HardhatUserConfig = {
    solidity: '0.8.18',
    // networks: {
    //     hardhat: {},
    // },
    typechain: {
        outDir: 'typechain',
        target: 'ethers-v5',
    },
};

export default config;

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
    solidity: '0.8.18',
    networks: {
        hardhat: {},
        polygonMumbai: {
            url: 'https://matic-mumbai.chainstacklabs.com',
            accounts: [process.env.MUMBAI_PRIVATE_KEY as string],
        },
    },
    typechain: {
        outDir: 'typechain',
        target: 'ethers-v5',
    },
};

export default config;

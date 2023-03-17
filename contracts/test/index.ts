import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { Storage, Article, Article__factory } from '../typechain';

const provider = new ethers.providers.Web3Provider(network.provider as any);

describe('Storage contract', function () {
    let storage: Storage;

    beforeEach(async function () {
        const Storage = await ethers.getContractFactory('Storage');
        storage = await Storage.deploy();
        await storage.deployed();
    });

    it("should create a new article and add it to the owner's articles", async function () {
        const ipfsHash = 'QmXZLjBZ9YWC6UHAbGxhj6Ufik6o5hgc5U6udbU6vZAM2Q';
        const privateKey = ethers.utils.randomBytes(32);
        const owner = await provider.getSigner(0).getAddress();
        // expect the owner to be defined
        const isPublic = false;

        // get address of the article
        const { wait } = await storage.createArticle(ipfsHash, privateKey, owner, isPublic);
        const receipt = await wait();

        const article = (await storage.getArticles(owner))[0];
        expect(article).to.equal(receipt.logs[0].address);
    });

    it('should not allow creating an article with empty ipfsHash', async function () {
        const privateKey = ethers.utils.randomBytes(32);
        const owner = await provider.getSigner(0).getAddress();
        const isPublic = false;

        await expect(storage.createArticle('', privateKey, owner, isPublic)).to.be.revertedWith(
            'ipfsHash should not be empty'
        );
    });
});

describe('Article contract', function () {
    let article: Article;
    let Article: Article__factory;

    beforeEach(async function () {
        Article = await ethers.getContractFactory('Article');
    });

    it('should not allow creating an article with empty ipfsHash', async function () {
        const privateKey = ethers.utils.randomBytes(32);
        const owner = await provider.getSigner(0).getAddress();
        const isPublic = false;

        await expect(Article.deploy('', privateKey, owner, isPublic)).to.be.revertedWith(
            'ipfsHash should not be empty'
        );
    });

    it('should not allow creating an article with empty privateKey', async function () {
        const ipfsHash = 'QmXZLjBZ9YWC6UHAbGxhj6Ufik6o5hgc5U6udbU6vZAM2Q';
        const owner = await provider.getSigner(0).getAddress();
        const isPublic = false;

        await expect(
            Article.deploy(ipfsHash, ethers.constants.HashZero, owner, isPublic)
        ).to.be.revertedWith('privateKey should not be empty');
    });

    it('should not allow creating an article with empty owner', async function () {
        const ipfsHash = 'QmXZLjBZ9YWC6UHAbGxhj6Ufik6o5hgc5U6udbU6vZAM2Q';
        const privateKey = ethers.utils.randomBytes(32);
        const isPublic = false;

        await expect(
            Article.deploy(ipfsHash, privateKey, ethers.constants.AddressZero, isPublic)
        ).to.be.revertedWith('owner should not be empty');
    });

    // it('should allow adding an address to the whitelist', async function () {
    //     const addressToAdd = await ethers.provider.getSigner(1).getAddress();

    //     await article.addToWhitelist(addressToAdd);
    //     const isWhitelisted = await article.whitelist(addressToAdd);

    //     expect(isWhitelisted).to.equal(true);
    // });
});

# Ask Vitalik

## Prepare the data

Please refer to [data/README.md](data/README.md) for details.

## Run the program

### 1. Create .env file

First, you need to apply an app & bot at [Pando Developers' Console](https://developers.pando.im/console/botastic/) of botastic, then fill in your application information:

```
VITE_APP_ID='<your app id>'
VITE_BOT_ID='<your bot id>'
VITE_BOT_API_BASE='https://botastic-api.pando.im/api'
VITE_MIXIN_API_BASE='https://mixin-api.zeromesh.net' // optional, required when login with mixin messenger
```

### 2. Develop

```
yarn // install dependencies
yarn dev // start develop
```

**Remark:** This project use [@foxone/uikit](https://github.com/fox-one/uikit-next) as UI library, and [@foxone/mixin-passport](https://www.npmjs.com/package/@foxone/mixin-passport) to login with wallets.

## Limitations

I use [Vitalik's blog](https://vitalik.ca/) to build ChatGPT's knowledge, but it may not be sufficient to answer all questions accurately.

## Examples

You can try following questions:

- How do you think of DAO?  [👉Try it](https://ask-vitalik.xingchi.dev/?q=How%20do%20you%20think%20of%20DAO%3F)
- Does the ETH network have resistance to censorship? [👉Try it](https://ask-vitalik.xingchi.dev/?q=Does%20the%20ETH%20network%20have%20resistance%20to%20censorship%3F)
- How do you think of RAI? [👉Try it](https://ask-vitalik.xingchi.dev/?q=How%20do%20you%20think%20of%20RAI%3F)
- What's Rollups? [👉Try it](https://ask-vitalik.xingchi.dev/?q=What's%20Rollups%3F)
- Who firstly describe the vision for network states? [👉Try it](https://ask-vitalik.xingchi.dev/?q=Who%20firstly%20describe%20the%20vision%20for%20network%20states%3F)
- What does cryptocurrency have to do with network states? [👉Try it](https://ask-vitalik.xingchi.dev/?q=What%20does%20cryptocurrency%20have%20to%20do%20with%20network%20states%3F)
- When did you go to Argentina? [👉Try it](https://ask-vitalik.xingchi.dev/?q=When%20did%20you%20go%20to%20Argentina%3F)
- What were you doing at Argentina? [👉Try it](https://ask-vitalik.xingchi.dev/?q=What%20were%20you%20doing%20at%20Argentina%3F%20)
- How do you think of Money? [👉Try it](https://ask-vitalik.xingchi.dev/?q=How%20do%20you%20think%20of%20Money%3F)
- Which do you want? Javascript or Python? [👉Try it](https://ask-vitalik.xingchi.dev/?q=Which%20do%20you%20want%3F%20Javascript%20or%20Python%3F)

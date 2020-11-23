# Authentication Example - ARK Desktop Plugin v3

Basic example showing how to connect a plugin to a cookie-based authentication.

## Warning

The ARK Desktop Wallet v3 is under development. The Plugin's API is not yet stabilized and there may be breaking changes.

## Installation

Compile the plugin and start the server:

```bash
yarn && yarn start
```

## Usage

1. Clone the [ArkEcosystem/desktop-wallet](https://github.com/ArkEcosystem/desktop-wallet) repository and see the installation instructions.

2. Checkout into the current plugins branch:

```bash
git checkout feat/plugin-core && yarn
```

3. Run the development mode with a environment variable to the folder that you cloned this repo.

```bash
REACT_APP_PLUGINS_DIR=/Users/lucio/code/ark-plugin-auth-example/plugin yarn dev
```

4. Start setting up your profile. Then go to the Plugins tab > My Plugins.

5. You should see "Auth Example" in the plugins list, then enable it on the 3-dot button.

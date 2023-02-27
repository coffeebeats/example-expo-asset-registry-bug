# example-expo-asset-registry-bug

A repository demonstrating an issue trying to load fonts in react native tests.

## Reproduction steps

### Steps to build this example repository

> NOTE: You can skip these steps if you've clone this repository. These are included for documentation purposes.

The following steps have already been taken care of in this example repository. However, this documents
the steps taken to get there.

1. Run the following command to generate the initial project,selecting `Blank (TypeScript)` as the template type:

    ```sh
    npx create-expo-app --template
    ```

2. Install the application dependencies required to reproduce the issue:

    ```sh
    npm i \
        expo-font \
        expo-splash-screen
    ```

3. Install the dependencies needed for testing:

    ```sh
    npm i -D \
        @testing-library/react-native@11.5.2 \
        jest \
        jest-expo
    ```

4. Add the following `overrides` property to `package.json`:

    > NOTE: Since `expo@48.0.4` depends on `expo-file-system@15.2.2` and we'll be switching between `expo-asset@8.7.0` and `expo-asset@8.8.0`, which both use earlier versions of `expo-file-system`, we need to pin a common version of `expo-file-system` that all `expo` components will use. There don't seem to be issues with `expo-file-system@15.2.2`, so we'll use that.

    ```js
    "overrides": {
        "expo-asset": "8.7.0",
        "expo-file-system": "15.2.2"
    }
    ```

5. Configure `jest` by adding the following property to `package.json`:

    > NOTE: This configuration is taken from [Expo documentation](https://docs.expo.dev/guides/testing-with-jest/#configuration).

    ```js
    "jest": {
        "preset": "jest-expo",
        "transformIgnorePatterns": [
            "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
        ]
    }
    ```

6. Update source files `App.tsx` and `__tests__/App.test.tsx`. Note that this repo uses the example
code from [expo-font documentation](https://docs.expo.dev/versions/latest/sdk/font/#usage) almost as-is, but makes a few changes which help troubleshoot.

### Steps to reproduce the issue

1. Install dependencies:

    ```sh
    npm i
    ```

2. Run the test case, observing the reported error:

    ```sh
    npm test
    ```

3. Switch the `expo-asset` version down to `8.7.0` and re-run the test case, observing that it passes.

    > NOTE: There seems to be issues if you don't start from a fresh install, so I recommend
    > fully deleting `node_modules` to isolate the issue at hand.

    ```sh
    rm -rf node_modules && rm package-lock.json && npm i && npm test
    ```

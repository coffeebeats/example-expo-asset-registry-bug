# example-expo-asset-registry-bug

A repository demonstrating an issue trying to load fonts in react native tests.

## Reproduction steps

1. Run the following command to generate the initial project,selecting `Blank (TypeScript)` as the template type:

    ```sh
    npx create-expo-app --template
    ```

2. Install the application dependencies required to reproduce the issue:

    ```sh
    npm i expo-font expo-splash-screen
    ```

3. Install the dependencies needed for testing:

    ```sh
    npm i -D jest jest-expo @testing-library/react-native
    ```

4. Try to run the tests, observing the reported error:

    ```sh
    npm test
    ```

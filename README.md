# example-expo-asset-registry-bug

A repository demonstrating an issue trying to load fonts in react native tests.

## Issue description

After upgrading from `expo-asset@8.7.0` to `expo-asset@8.8.0`, when trying to load a font via `expo-font` in a `react-native` unit test, the font asset module is found to be missing from the asset registry. The error is provided below, with the path to the repository replaced with `<rootDir>`:

```txt
Error: Module "1" is missing from the asset registry
        at Function.fromModule (<rootDir>/node_modules/expo-asset/src/Asset.ts:148:13)
        at fromModule (<rootDir>/node_modules/expo-font/src/FontLoader.ts:29:18)
        at <rootDir>/node_modules/expo-font/src/Font.ts:130:34
        at Generator.next (<anonymous>)
        at asyncGeneratorStep (<rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
        at _next (<rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:9)
        at <rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:27:7
        at new Promise (<anonymous>)
        at <rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:19:12
        at apply (<rootDir>/node_modules/expo-font/src/Font.ts:141:2)
        at apply (<rootDir>/node_modules/expo-font/src/Font.ts:106:40)
        at loadFontInNamespaceAsync (<rootDir>/node_modules/expo-font/src/Font.ts:99:43)
        at Array.map (<anonymous>)
        at map (<rootDir>/node_modules/expo-font/src/Font.ts:99:29)
        at Generator.next (<anonymous>)
        at asyncGeneratorStep (<rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
        at _next (<rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:9)
        at <rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:27:7
        at new Promise (<anonymous>)
        at <rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:19:12
        at apply (<rootDir>/node_modules/expo-font/src/Font.ts:104:2)
        at apply (<rootDir>/node_modules/expo-font/src/Font.ts:86:32)
        at <rootDir>/node_modules/expo-font/src/FontHooks.ts:29:14
        at commitHookEffectListMount (<rootDir>/node_modules/react-test-renderer/cjs/react-test-renderer.development.js:12999:26)
        at commitPassiveMountOnFiber (<rootDir>/node_modules/react-test-renderer/cjs/react-test-renderer.development.js:14422:11)
        at commitPassiveMountEffects_complete (<rootDir>/node_modules/react-test-renderer/cjs/react-test-renderer.development.js:14382:9)
        at commitPassiveMountEffects_begin (<rootDir>/node_modules/react-test-renderer/cjs/react-test-renderer.development.js:14369:7)
        at commitPassiveMountEffects (<rootDir>/node_modules/react-test-renderer/cjs/react-test-renderer.development.js:14357:3)
        at flushPassiveEffectsImpl (<rootDir>/node_modules/react-test-renderer/cjs/react-test-renderer.development.js:16248:3)
        at flushPassiveEffects (<rootDir>/node_modules/react-test-renderer/cjs/react-test-renderer.development.js:16197:14)
        at <rootDir>/node_modules/react-test-renderer/cjs/react-test-renderer.development.js:16012:9
        at flushActQueue (<rootDir>/node_modules/react/cjs/react.development.js:2667:24)
        at act (<rootDir>/node_modules/react/cjs/react.development.js:2521:11)
        at actImplementation (<rootDir>/node_modules/@testing-library/react-native/src/act.ts:30:25)
        at renderWithAct (<rootDir>/node_modules/@testing-library/react-native/src/render.tsx:122:6)
        at renderWithAct (<rootDir>/node_modules/@testing-library/react-native/src/render.tsx:51:20)
        at Object.<anonymous> (<rootDir>/__tests__/App.test.tsx:8:11)
        at Generator.next (<anonymous>)
        at asyncGeneratorStep (<rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
        at _next (<rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:9)
        at <rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:27:7
        at new Promise (<anonymous>)
        at Object.<anonymous> (<rootDir>/node_modules/@babel/runtime/helpers/asyncToGenerator.js:19:12)
        at Promise.then.completed (<rootDir>/node_modules/jest-circus/build/utils.js:293:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (<rootDir>/node_modules/jest-circus/build/utils.js:226:10)
        at _callCircusTest (<rootDir>/node_modules/jest-circus/build/run.js:248:40)
        at _runTest (<rootDir>/node_modules/jest-circus/build/run.js:184:3)
        at _runTestsForDescribeBlock (<rootDir>/node_modules/jest-circus/build/run.js:86:9)
        at _runTestsForDescribeBlock (<rootDir>/node_modules/jest-circus/build/run.js:81:9)
        at run (<rootDir>/node_modules/jest-circus/build/run.js:26:3)
        at runAndTransformResultsToJestFormat (<rootDir>/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:120:21)
        at jestAdapter (<rootDir>/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
        at runTestInternal (<rootDir>/node_modules/jest-runner/build/runTest.js:367:16)
        at runTest (<rootDir>/node_modules/jest-runner/build/runTest.js:444:34)
```

This issue reproduces in both `expo@48` *and* `expo@47`, provided you downgrade the relevant packages (e.g. downgrade `expo-font` to `11.0.1`).

## Reproduction steps

### Steps to build this example repository

> NOTE: You can skip these steps if you've clone this repository. These are included for documentation purposes.

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
        @babel/core@7.21.0 \
        @testing-library/react-native@11.5.2 \
        jest \
        jest-expo
    ```

4. Add the following `overrides` property to `package.json`:

    > NOTE: Since `expo@48.0.4` depends on `expo-file-system@15.2.2` and we'll be switching between `expo-asset@8.7.0` and `expo-asset@8.8.0`, which both use earlier versions of `expo-file-system`, we need to pin a common version of `expo-file-system` that all `expo` components will use. There don't seem to be issues with `expo-file-system@15.2.2`, so we'll use that.

    ```js
    "overrides": {
        "expo-asset": "8.8.0",
        "expo-file-system": "15.2.2"
    }
    ```

5. Configure `jest` by adding the following property to `package.json` and a `test` script:

    > NOTE: This configuration is taken from [Expo documentation](https://docs.expo.dev/guides/testing-with-jest/#configuration).

    ```js
    "scripts": {
        // ...
        "test": "jest"
    },

    // ...

    "jest": {
        "preset": "jest-expo",
        "transformIgnorePatterns": [
            "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
        ]
    }
    ```

6. Update source files `App.tsx` and `__tests__/App.test.tsx`. Note that this repo uses the example
code from [expo-font documentation](https://docs.expo.dev/versions/latest/sdk/font/#usage) almost as-is, but makes a few changes which help troubleshoot.

7. Add a font file to `./assets/fonts`. This example uses `Inter-Black.ttf`, downloaded from [Google fonts](https://fonts.google.com/specimen/Inter). Note that this still reproduces even with `otf` fonts.

8. Optional. This example repository also (1) pinned all dependencies to their current patch-specific versions, (2) removed unnecessary dependencies like `expo-status-bar`, and (3) configure `tsconfig.json` for `react` usage.

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

    > NOTE: There is an unrelated error that occurs if you don't ignore the `package-lock.json` file. I recommend using the `--no-package-lock` flag when re-installing in order to isolate the issue at hand.

    ```sh
    npm i --no-package-lock && npm test
    ```

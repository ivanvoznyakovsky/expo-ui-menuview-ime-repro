# Expo UI `MenuView` Android IME reproduction

Minimal reproduction for an Android `@expo/ui` `MenuView` popup that becomes
invisible after dismissing the keyboard inside an Expo UI bottom sheet.

## Environment

- Expo SDK 57 (`expo` 57.0.25)
- `@expo/ui` 57.0.20
- React Native 0.86.3
- Reproduced on Xiaomi MI 6, Android 9

## Run

```sh
pnpm install
pnpm expo run:android --device
```

## Reproduce

1. Tap **Open sheet**.
2. Tap **Open menu**. Both actions render normally.
3. Tap the description input to show the keyboard.
4. Tap a blank area in the sheet to dismiss the keyboard.
5. Tap **Open menu** again.

Expected: both actions are visible.

Actual on the affected device: the popup scrim appears and `onOpenMenu` fires,
but neither action is visible.

The app deliberately has no app-specific selector, navigation, data fetching,
or custom native code. Its only interaction outside Expo UI is the React Native
`TextInput` used to trigger the IME.

# 42 Header Generator for VS Code

This is a **fork** of the [vscode-42header](https://github.com/kube/vscode-42header) extension originally created by **kube**.
It generates standardized headers for your projects, helping your version control.

## Features

- Automatically generate the header with your username, email, and timestamps.
- Customize the header with your own information.
- Works on any type of file in VS Code.

## Installation

1. Open VS Code.
2. Go to the Extensions Marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X` on Mac).
3. Search for `42 Header`.
4. Click **Install**.

Alternatively, you can install it via the `.vsix` file:

1. Download the `.vsix` file from the releases section of this repository.
2. Open VS Code and run `Extensions: Install from VSIX...` from the Command Palette (`Ctrl+Shift+P`).
3. Select the `.vsix` file you downloaded.

## Configuration

To configure the extension, go to your **User Settings** in VS Code and add your username and email:

```json
{
  "42header.username": "YourUsername",
  "42header.email": "YourEmail@example.com"
}
```

## Usage

### Insert a header
 - **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>H</kbd>
 - **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>H</kbd>.

Header is automatically updated on save.

## Issues

In case of a bug, or missing feature, please create a [Github Issue](https://github.com/gde-alme/vscode-header/issues).

## License

MIT
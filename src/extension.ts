/* *********************************************** */
/*                                                 */
/*                                                 */
/*   extension.ts                                  */
/*                                                 */
/*   By: GLopes <glopes@mader.pt>                  */
/*                                                 */
/*   Created: 2024/09/27 13:28:05 by GLopes        */
/*   Updated: 2024/09/27 13:28:11 by GLopes        */
/*                                                 */
/* *********************************************** */

import { basename } from 'path'
import vscode = require('vscode')
import moment = require('moment')

import {
  ExtensionContext, TextEdit, TextEditorEdit, TextDocument, Position, Range
} from 'vscode'

import {
  extractHeader, getHeaderInfo, renderHeader,
  supportsLanguage, HeaderInfo
} from './header'

/**
 * Return current user from config or ENV by default
 */
const getCurrentUser = () =>
  vscode.workspace.getConfiguration()
    .get('42header.username') || process.env['USER'] || 'marvin'

/**
 * Return current user mail from config or default value
 */
const getCurrentUserMail = () =>
  vscode.workspace.getConfiguration()
    .get('42header.email') || `${getCurrentUser()}@student.42.fr`

/**
 * Update HeaderInfo with last update author and date, and update filename
 * Returns a fresh new HeaderInfo if none was passed
 */
const newHeaderInfo = (document: TextDocument, headerInfo?: HeaderInfo) => {
  const user = getCurrentUser()
  const mail = getCurrentUserMail()

  return Object.assign({},
    // This will be overwritten if headerInfo is not null
    {
      createdAt: moment(),
      createdBy: user
    },
    headerInfo,
    {
      filename: basename(document.fileName),
      author: `${user} <${mail}>`,
      updatedBy: user,
      updatedAt: moment()
    }
  )
}

/**
 * `insertHeader` Command Handler
 */
const insertHeaderHandler = () => {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (!activeTextEditor) {
    return;
  }

  const { document } = activeTextEditor;

  if (supportsLanguage(document.languageId))
    activeTextEditor.edit(editor => {
      const { header, line } = extractHeader(document.getText())

      if (header && line !== null)
        editor.replace(
          new Range(line - 1, 0, line + 11, 0),
          renderHeader(
            document.languageId,
            newHeaderInfo(document, getHeaderInfo(header))
          )
        )
      else {
        // TODO: Apply this to all languages
        let initPos = 0;
        if (document.languageId === 'php') initPos = ((needle: string) => {
          const lines = document.getText().split(/\r\n|\n/);
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(needle)) return i + 1;
          }
          return -1;
        })('<?php');
        initPos >= 0 || (initPos = 0) && editor.insert(new Position(0, 0), '<?php\n');
        editor.insert(
          new Position(initPos, 0),
          renderHeader(
            document.languageId,
            newHeaderInfo(document)
          )
        )
      }
    })
  else
    vscode.window.showInformationMessage(
      `No header support for language ${document.languageId}`
    )
}

/**
 * Start watcher for document save to update current header
 */
const startUpdateOnSaveWatcher = (subscriptions: vscode.Disposable[]) =>
  vscode.workspace.onWillSaveTextDocument(event => {
    const document = event.document
    const { header, line } = extractHeader(document.getText())

    event.waitUntil(
      Promise.resolve(
        supportsLanguage(document.languageId) && header && line !== null ?
          [
            TextEdit.replace(
              new Range(line - 1, 0, line + 11, 0),
              renderHeader(
                document.languageId,
                newHeaderInfo(document, getHeaderInfo(header))
              )
            )
          ]
          : []
      )
    )
  },
    null, subscriptions
  )


export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands
    .registerTextEditorCommand('42header.insertHeader', insertHeaderHandler)

  context.subscriptions.push(disposable)
  startUpdateOnSaveWatcher(context.subscriptions)
}

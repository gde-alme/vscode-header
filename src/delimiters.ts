/* *********************************************** */
/*                                                 */
/*                                                 */
/*   delimiters.ts                                 */
/*                                                 */
/*   By: GLopes <glopes@mader.pt>                  */
/*                                                 */
/*   Created: 2024/09/27 13:27:42 by GLopes        */
/*   Updated: 2024/09/27 13:28:02 by GLopes        */
/*                                                 */
/* *********************************************** */

const hashes = ['# ', ' #']
const slashes = ['/* ', ' */']
const semicolons = [';; ', ' ;;']
const parens = ['(* ', ' *)']
const dashes = ['-- ', ' --']
const percents = ['%% ', ' %%']

export const languageDemiliters: { [lang: string]: string[] | undefined } = {
  'c': slashes,
  'coffeescript': hashes,
  'cpp': slashes,
  'css': slashes,
  'dockerfile': hashes,
  'fsharp': parens,
  'go': slashes,
  'groovy': slashes,
  'haskell': dashes,
  'ini': semicolons,
  'jade': slashes,
  'java': slashes,
  'javascript': slashes,
  'javascriptreact': slashes,
  'latex': percents,
  'less': slashes,
  'lua': dashes,
  'makefile': hashes,
  'objective-c': slashes,
  'ocaml': parens,
  'perl': hashes,
  'perl6': hashes,
  'php': slashes,
  'plaintext': hashes,
  'powershell': hashes,
  'python': hashes,
  'r': hashes,
  'ruby': hashes,
  'rust': slashes,
  'scss': slashes,
  'shellscript': hashes,
  'sql': hashes,
  'swift': slashes,
  'typescript': slashes,
  'typescriptreact': slashes,
  'xsl': slashes,
  'yaml': hashes
}

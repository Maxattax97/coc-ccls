# coc-ccls

This is the coc.nvim extension for [ccls](https://github.com/MaskRay/ccls).

_This extension is still in pre-release development and is not ready for use._
Track progress in this [issue thread](https://github.com/Maxattax97/coc-ccls/issues/1).

For the meantime, the following configuration for coc.nvim works very nicely for
CCLS (copied from the coc.nvim [wiki](https://github.com/neoclide/coc.nvim/wiki/Language-servers#ccobjective-c)):

```
  "languageserver": {
    "ccls": {
      "command": "ccls",
      "filetypes": ["c", "cpp", "objc", "objcpp"],
      "rootPatterns": [".ccls", "compile_commands.json", ".vim/", ".git/", ".hg/"],
      "initializationOptions": {
         "cache": {
           "directory": "/tmp/ccls"
         }
       }
    }
  }
```

The original `vscode-ccls` project is fairly limited and offers few benefits
over the above configuration at the time of writing.

Goals for this project include:
 - bundling binaries for CCLS to automate installation

See:

* [Home](https://github.com/MaskRay/ccls/wiki/Home)
* [coc.nvim](https://github.com/neoclide/coc.nvim)

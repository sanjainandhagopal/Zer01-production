export const languageOptions = [
    {
        "language": "python",
        "version": "3.10.0",
        "aliases": [
          "py",
          "py3",
          "python3",
          "python3.10"
        ]
    },
    {
        "language": "java",
        "version": "15.0.2",
        "aliases": []
    },
    {
        "language": "c",
        "version": "10.2.0",
        "aliases": [
          "gcc"
        ],
        "runtime": "gcc"
    },
    {
        "language": "c++",
        "version": "10.2.0",
        "aliases": [
          "cpp",
          "g++"
        ],
        "runtime": "gcc"
    },
    {
        "language": "csharp",
        "version": "6.12.0",
        "aliases": [
          "mono",
          "mono-csharp",
          "mono-c#",
          "mono-cs",
          "c#",
          "cs"
        ],
        "runtime": "mono"
    },
    {
        "language": "javascript",
        "version": "18.15.0",
        "aliases": [
          "node-javascript",
          "node-js",
          "javascript",
          "js"
        ],
        "runtime": "node"
    },
    {
        "language": "typescript",
        "version": "5.0.3",
        "aliases": [
          "ts",
          "node-ts",
          "tsc",
          "typescript5",
          "ts5"
        ]
    },
    {
        "language": "php",
        "version": "8.2.3",
        "aliases": []
    },
    {
        "language": "go",
        "version": "1.16.2",
        "aliases": [
          "go",
          "golang"
        ]
    },
    {
        "language": "rust",
        "version": "1.68.2",
        "aliases": [
          "rs"
        ]
    },
    {
        "language": "ruby",
        "version": "3.0.1",
        "aliases": [
          "ruby3",
          "rb"
        ]
    },
]

export const codeSnippets = {

    "python": "print('Hello, World!')",

    "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
    
    "c": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",

    "c++": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}",

    "csharp": "using System;\n\nclass Program {\n    static void Main(string[] args) {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}",

    "javascript": "console.log('Hello, World!');",

    "typescript": "console.log('Hello, World!');",

    "php": "<?php\n    echo 'Hello, World!';\n?>",

    "go": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",

    "rust": "fn main() {\n    println!(\"Hello, World!\");\n}",

    "ruby": "puts 'Hello, World!'"
    
}

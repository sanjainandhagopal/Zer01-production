import React, { useEffect, useRef, useState } from "react";
import { ModeToggleBtn } from "./mod-toggle-btn";
import SelectLanguages from "./SelectLanguages";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { CircleAlert, CircleCheck, CircleX, Loader, Play } from "lucide-react";
import { Button } from "./ui/button";
import { codeSnippets, languageOptions } from "@/app/config/config";
import { compileCode } from "@/app/actions/compile";

export default function EditorComponent({ TestCases }) {
  const { theme } = useTheme();
  const [sourceCode, setSourceCode] = useState(codeSnippets["python"]);
  const [languageOption, setLanguageOption] = useState(languageOptions[0]);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const [output, setOutput] = useState([]);
  const [err, setError] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [showTestCaseResults, setShowTestCaseResults] = useState(false); // Default to showing the run output screen

  // Initialize the test cases from the TestCases prop
  useEffect(() => {
    if (TestCases && TestCases.length > 0) {
      setTestCases(
        TestCases.map((testCase) => ({
          input: testCase.Input,
          expected: testCase.ExpectedOutput,
          actual: "",
          result: "",
        }))
      );
    }
  }, [TestCases]);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleOnChange(value) {
    if (value) {
      setSourceCode(value);
    }
  }

  function onSelect(value) {
    setLanguageOption(value);
    setSourceCode(codeSnippets[value.language]);
  }

  // Submit the code and evaluate test cases
  async function submitCode() {
    setLoading(true);
    const testCaseResults = [...testCases];

    try {
      for (let i = 0; i < testCaseResults.length; i++) {
        const testCase = testCaseResults[i];

        const requestData = {
          language: languageOption.language,
          version: languageOption.version,
          files: [
            {
              content: sourceCode,
            },
          ],
          stdin: testCase.input,
        };

        const result = await compileCode(requestData);
        const actualOutput = result.run.output.trim();
        const isOutputCorrect = actualOutput === testCase.expected;

        testCaseResults[i] = {
          ...testCase,
          actual: actualOutput,
          result: isOutputCorrect ? "Passed" : "Failed",
        };
      }

      setTestCases(testCaseResults);
      setLoading(false);
      setShowTestCaseResults(true); // Show test case results after submitting code
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error);
    }
  }

  // Execute code without test cases (for custom user input)
  async function executeCode() {
    setLoading(true);
    const requestData = {
      language: languageOption.language,
      version: languageOption.version,
      files: [
        {
          content: sourceCode,
        },
      ],
      stdin: userInput,
    };

    try {
      const result = await compileCode(requestData);
      setOutput(result.run.output.split("\n"));
      setLoading(false);
      setShowTestCaseResults(false); // Hide test case results during execution
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 rounded-2xl shadow-2xl py-6 px-8">
  {/* Header */}
  <div className="flex items-center justify-between pb-4 border-b border-gray-300 dark:border-slate-700">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">Zer01</h2>
    <div className="flex items-center space-x-4">
      <ModeToggleBtn />
      <div className="w-[230px]">
        <SelectLanguages onSelect={onSelect} selectedLanguageOption={languageOption} />
      </div>
    </div>
  </div>

  {/* Editor and Output Sections */}
  <div className="bg-gray-50 dark:bg-slate-800 p-4 mt-4 rounded-2xl shadow-inner">
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border border-gray-300 dark:border-slate-700"
    >
      {/* Editor Panel */}
      <ResizablePanel defaultSize={50} minSize={35} maxSize={75}>
        <Editor
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          height="100vh"
          defaultLanguage={languageOption.language}
          defaultValue={sourceCode}
          onMount={handleEditorDidMount}
          value={sourceCode}
          onChange={handleOnChange}
          language={languageOption.language}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Input and Output Panel */}
      <ResizablePanel defaultSize={50} minSize={35} maxSize={75}>
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-lg shadow-lg">
          {/* Input Header */}
          <div className="flex items-center justify-between bg-gray-200 dark:bg-slate-800 px-6 py-3 rounded-t-lg">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Input</h2>
            <div className="space-x-2">
              {loading ? (
                <Button disabled size={"sm"} className="bg-purple-600 text-white">
                  <Loader className="w-4 h-4 mr-1 animate-spin" />
                  <span>Submitting...</span>
                </Button>
              ) : (
                <Button
                  onClick={submitCode}
                  size={"sm"}
                  className="bg-purple-600 text-white hover:bg-purple-700"
                >
                  <CircleCheck className="w-4 h-4 mr-1" />
                  <span>Submit Code</span>
                </Button>
              )}
              {loading ? (
                <Button disabled size={"sm"} className="bg-purple-600 text-white">
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  <span>Please wait...</span>
                </Button>
              ) : (
                <Button
                  onClick={executeCode}
                  size={"sm"}
                  className="bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  <span>Run</span>
                </Button>
              )}
            </div>
          </div>

          {/* Resizable Input and Output Sections */}
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Input Section */}
            <ResizablePanel defaultSize={50} minSize={35}>
              <textarea
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="h-full w-full p-4 text-sm bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white border border-gray-300 dark:border-slate-700 rounded-b-lg"
                placeholder="Enter your input here..."
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Output Section */}
            {showTestCaseResults ? (
              <ResizablePanel defaultSize={25}>
                <div className="p-4 space-y-3">
                  {testCases.length ? (
                    testCases.map((testCase, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 dark:bg-slate-800 p-3 rounded-lg shadow-md"
                      >
                        <p className="font-medium">
                          <strong>TestCase {index + 1}:</strong>
                        </p>
                        <span
                          className={`flex items-center space-x-1 ${
                            testCase.result === "Passed" ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {testCase.result}
                          {testCase.result === "Passed" ? <CircleCheck /> : <CircleX />}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No test cases available.</p>
                  )}
                </div>
              </ResizablePanel>
            ) : (
              <ResizablePanel defaultSize={25}>
                <div className="p-4 space-y-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                  {err ? (
                    <p className="text-red-500">An error occurred while executing the code.</p>
                  ) : (
                    output.map((item, index) => (
                      <p key={index} className="text-gray-800 dark:text-white">
                        {item}
                      </p>
                    ))
                  )}
                </div>
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</div>

  );
}

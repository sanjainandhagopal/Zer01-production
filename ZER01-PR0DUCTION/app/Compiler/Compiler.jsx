import EditorComponent from './components/EditorComponent'

export default function Compiler({TestCases}) {
  return (
    <div>
      <EditorComponent TestCases={TestCases} />
    </div>
  )
}

import { Component, createSignal } from "solid-js";

import styles from "./App.module.css";

const Box = ({children}) => <div class={styles.box}>{...children}</div>
const BoxHeader = ({children}) => <div class={styles.boxHeader}>{...children}</div>
const Row = ({children}) => <div class={styles.row}>{...children}</div>

interface InputBoxProps {
  type: string;
  row: IRow;
  value: string;
  index: number;
  updateRow: Function; 
  placeholder: string;
}

const InputBox = ({type, row, value, index, updateRow, placeholder}: InputBoxProps) => {
  const handleChange = (e) => {
    if (type === 'key') {
      updateRow({ key: e.currentTarget.value, value: row.value }, index )
    } else {
      updateRow({ key: row.key, value: e.currentTarget.value }, index )
    }
  }
  return (
    <input class={styles.inputBox} type='text' placeholder={placeholder} value={value} onChange={handleChange} />
  )};

interface IRow {
  key: string;
  value: string;
}

const initialRows: IRow[] = [
  { key: '', value: '' },
  { key: '', value: '' }
];

const convertToJSON = (input: IRow[]) => {
  const result: { [key: string]: string } = {};
  input.forEach(row => {
    result[row.key] = row.value;
  });
  return result;
}

const [rows, setRows] = createSignal(initialRows);

const App: Component = () => {
  const handleSave = () => alert(JSON.stringify(convertToJSON(rows())));
  const addRow = () => setRows((prev) => [...prev, { key: '', value: '' }]);
  const updateRow = (row: IRow, index: number) => setRows(prev => [...prev.slice(0, index), row, ...prev.slice(index + 1)]);
  const removeRow = (index: number) => setRows(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Box>
          <BoxHeader>
            <h1>Tags</h1>
            <button onClick={handleSave}>Save</button>
          </BoxHeader>
          {rows().map((row, i) => (
            <Row>
              <InputBox type='key' value={row.key} placeholder='Enter key' updateRow={updateRow} row={row} index={i} />
              <InputBox type='value' value={row.value} placeholder='Enter value' updateRow={updateRow} row={row} index={i} />
              <button onClick={() => removeRow(i)}>Remove</button>
            </Row>
          ))}
          <button onClick={addRow}>Add Row</button>
        </Box> 
      </header>
    </div>
  );
};

export default App;

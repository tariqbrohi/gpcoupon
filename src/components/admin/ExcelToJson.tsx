import React from 'react';
import * as XLSX from 'xlsx';

const ExcelToJson = () => {
  const readUploadFile = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        // console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  return (
    <>
      <h3>Import excel file</h3>
      <input
        type={'file'}
        name="upload"
        id="input_dom_element"
        onChange={readUploadFile}
      />
    </>
  );
};

export default ExcelToJson;
